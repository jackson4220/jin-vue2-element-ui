<template>
	<div>
		<el-radio-group
			v-bind="$attrs"
			v-model="internalValue"
			:class="className"
			@change="handleChange"
		>
			<el-radio
				v-for="val in optionsInner"
				:label="val[valueKey] | valueFilter"
				:key="val[valueKey] | valueFilter"
				>{{ val[labelKey] }}</el-radio
			>
		</el-radio-group>
	</div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { isNumber } from '../../js';

export default {
	name: 'JinRadio',
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
			type: [String, Number, Boolean],
			default: '',
		},
		options: {
			type: [Array, Object],
			default: () => ({}),
		},
		valueKey: {
			type: String,
			default: 'value',
		},
		labelKey: {
			type: String,
			default: 'label',
		},
		className: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			PAGE_SIZE: 10,
			internalValue: this.value,
			optionsInner: [],
		};
	},
	computed: {
		useLocalData() {
			if (Array.isArray(this.options)) {
				// return this.options.length > 0;
				return true;
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
				this.internalValue = newValue;
			},
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
		this.fetchOptions();
	},
	methods: {
		async fetchOptions() {
			try {
				this.optionsInner = [];
				if (this.useLocalData) {
					this.optionsInner = this.mapToArray(this.options);
				} else {
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
		handleChange(val) {
			this.$emit('input', val);
		},
	},
};
</script>
