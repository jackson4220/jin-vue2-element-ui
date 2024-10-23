<template>
	<div>
		<!-- {{ internalValue }} -->
		<el-select
			v-bind="$attrs"
			v-model="internalValue"
			:multiple="isMultiple"
			:filterable="filterable"
			:collapse-tags="isMultiple"
			:reserve-keyword="true"
			:value-key="valueKey"
			:class="className"
			:no-match-text="noMatchText"
			:no-data-text="noDataText"
			:placeholder="placeholder"
			:remote-method="remoteMethod"
			:remote="!useLocalData"
			@clear="handlerClear"
			@change="selectChange"
			@focus="handleFocus"
		>
			<template>
				<div v-if="!useLocalData">
					<el-option
						v-for="item in optionsInner"
						:key="item[valueKey] | valueFilter"
						:label="item[labelKey] | valueFilter"
						:value="item[valueKey] | valueFilter"
					/>
				</div>
				<div v-else>
					<template v-if="optionsInner.length > 0">
						<el-option
							v-for="item in optionsInner"
							:key="item[valueKey] | valueFilter"
							:label="item[labelKey] | valueFilter"
							:value="item[valueKey] | valueFilter"
						/>
					</template>
					<template v-else>
						<div>暂无数据</div>
					</template>
				</div>
			</template>
		</el-select>
	</div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { isNumber } from '../../js';

export default {
	name: 'JinSelect',
	filters: {
		valueFilter(val) {
			const flag = val === 'true' || val === 'false';
			const res = isNumber(val)
				? Number(val)
				: flag
				? val === 'true' || false
				: val;
			return res;
		},
	},
	props: {
		value: {
			type: [String, Number, Array],
			default: null,
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		url: {
			type: String,
			default: '',
		},
		filterable: {
			type: Boolean,
			default: false,
		},
		options: {
			type: [Array, Object],
			default: () => ({}),
		},
		valueKey: {
			type: String,
			default: 'value',
		},
		anotherSetVal: {
			type: Array,
			default: () => [],
		},
		labelKey: {
			type: String,
			default: 'label',
		},
		className: {
			type: String,
			default: '',
		},
		noMatchText: {
			type: String,
			default: '没有数据',
		},
		noDataText: {
			type: String,
			default: '没有数据',
		},
		placeholder: {
			type: String,
			default: '请选择',
		},
		initStart: {
			type: Boolean,
			default: true,
		},
		searchKey: {
			type: String,
			default: 'keys',
		},
		param: {
			type: Object,
			default: () => ({}),
		},
		// 是否关联param重新请求
		isRelateParam: {
			type: Boolean,
			default: false,
		},
		// 回显-第一次初始化时，且是回显时，才请求数据-其它的默认走的remoteMethod(组件自带)
		isEcho: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			PAGE_SIZE: 10,
			internalValue: '',
			optionsInner: [],
			query: '',
			firstInit: true,
			originData: [],
		};
	},
	computed: {
		isMultiple() {
			return this.multiple;
		},
		useLocalData() {
			if (Array.isArray(this.options)) {
				return this.options.length > 0;
			}
			if (typeof this.options === 'object') {
				return Object.keys(this.options).length > 0;
			}
			return false;
		},
	},
	watch: {
		value: {
			deep: true,
			immediate: true,
			handler(newValue) {
				this.internalValue = isNumber(newValue) ? Number(newValue) : newValue;

				// 回显-第一次初始化时，且是回显时，才请求数据-其它的默认走的remoteMethod(组件自带)
				if (newValue && this.firstInit && this.isEcho) {
					this.fetchOptions();
					this.firstInit = false;
				}
			},
		},
		internalValue(newValue) {
			this.$emit('input', newValue);
		},
		param: {
			handler() {
				if (this.isRelateParam) {
					this.fetchOptions();
				}
			},
			deep: true,
		},
		options: {
			handler(val) {
				if (val && Object.keys(val).length > 0) {
					this.fetchOptions();
				} else {
					this.optionsInner = [];
				}
			},
			deep: true,
		},
	},
	mounted() {
		if (this.useLocalData) {
			this.fetchOptions();
		}
	},
	methods: {
		remoteMethod(query) {
			if (this.useLocalData && !this.url) return;
			this.query = query;
			this.fetchOptions();
		},
		// fetchOptions: debounce(async function () {
		async fetchOptions() {
			try {
				this.optionsInner = [];
				if (this.useLocalData) {
					this.optionsInner = this.mapToArray(this.options);
				} else {
					/* if (!this.url) {
						console.error('url is required');
						this.optionsInner = [];
						return;
					} */
					/* let response = await API.get(this.url, {
						...{ size: PAGE_SIZE, page: 1 },
						[this.searchKey]: this.query || '',
						...this.param,
					}); */
					let response = await this.options({
						...{ size: this.PAGE_SIZE, page: 1 },
						[this.searchKey]: this.query || '',
						...this.param,
					});

					const flag = Array.isArray(response.data);
					const flagL = response.data.list && Array.isArray(response.data.list);
					response = flag
						? response.data
						: flagL
						? response.data.list
						: response.data.data;
					this.originData = cloneDeep(response);
					const groupedOptions = this.groupOptionsArray(response);
					this.optionsInner = groupedOptions;
				}
			} catch (error) {
				console.error('Error fetching optionsInner:', error);
			}
			// }),
		},
		groupOptionsArray(list) {
			const listN = list.map((item) => {
				return {
					[this.valueKey]: item[this.valueKey],
					label: item[this.labelKey],
				};
			});
			return listN;
		},
		mapToArray(obj) {
			if (Array.isArray(obj)) {
				return obj.map((o) => {
					return {
						[this.labelKey]: o[this.labelKey],
						[this.valueKey]: o[this.valueKey],
					};
				});
			}
			let res = [];
			for (let key in obj) {
				const flag = key === 'true' || key === 'false';
				const value = isNumber(key)
					? Number(key)
					: flag
					? key === 'true' || false
					: key;
				res.push({ label: obj[key], id: value });
			}
			return res;
		},
		selectChange(val) {
			console.log('🚀🚀🚀----val:', val);
			if (this.anotherSetVal.length > 0) {
				this.anotherSetVal.forEach((item) => {
					const findItem = this.originData.find(
						(option) => option[this.valueKey] === val
					);
					console.log('🚀🚀🚀----findItem:', findItem);
					const isObj = typeof item === 'object';
					if (isObj) {
						const emitKey = Object.keys(item)[0];
						const choseeVKey = item[emitKey];
						console.log('🚀🚀🚀----emitKey:', emitKey);
						console.log('🚀🚀🚀----choseeVKey:', choseeVKey);
						console.log(
							'🚀🚀🚀----findItem[choseeVKey]:',
							findItem[choseeVKey]
						);
						this.$emit(`update:${emitKey}`, findItem[choseeVKey]);
					} else {
						this.$emit(`update:${item}`, findItem[item]);
					}
				});
			}
		},
		handleFocus() {
			if (this.optionsInner.length === 0) {
				this.fetchOptions();
			}
		},
		handlerClear() {
			this.optionsInner = [];
			this.query = '';
		},
	},
};
</script>
