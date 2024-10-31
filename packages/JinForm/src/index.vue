<template>
	<el-form ref="formRefC" v-bind="options.form" :model="value">
		<el-row :gutter="0" v-bind="options.row" class="w-full">
			<template v-for="(item, index) in columns">
				<el-col
					:key="item.field"
					v-if="!isHide(item.hide)"
					v-show="colVShow(index)"
					:span="item.span || 12"
					v-bind="item.col || item.span ? item.col : options.col"
				>
					<el-form-item
						v-bind="item"
						:align="item.align || 'left'"
						:label="item.label"
						:prop="item.field"
						:rules="item.rules"
						:disabled="isDisabled(item.disabled)"
					>
						<slot
							v-if="!['group-title'].includes(item.type)"
							:name="item.field"
							v-bind="{ disabled: isDisabled(item.disabled) }"
						>
							<component
								:is="getComponentBindProps(item).comName"
								v-bind="getComponentBindProps(item)"
								:value="value[item.field]"
								@updata:value="valueChange($event, item.field)"
								@change="valueChange($event, item.field)"
								@input="valueChange($event, item.field)"
								:disabled="isDisabled(item.disabled)"
								:on-change="
									(file, fileList) =>
										upLoadChange(file, fileList, item.field, item)
								"
							></component>
						</slot>
						<slot v-else name="group-title">
							<el-alert v-bind="item.props">{{ item.label }}</el-alert>
						</slot>
					</el-form-item>
				</el-col>
			</template>
			<el-col
				v-if="!options.btns.hide"
				:span="options.btns.span ? options.btns.span : 12"
				v-bind="options.btns.col ? options.btns.col : {}"
			>
				<!-- :push="options.btns.push ? options.btns.push : 20" -->
				<!-- type="flex" -->
				<!-- :justify="options.btns.justify ? options.btns.justify : 'end'" -->
				<template>
					<el-button
						type="primary"
						@click="handleSubmit"
						:size="options.form.size ? options.form.size : 'small'"
					>
						<!-- $emit('search') -->
						{{
							options.btns && options.btns.searchBtnText
								? options.btns.searchBtnText
								: '搜索'
						}}
					</el-button>
					<el-button
						:size="options.form.size ? options.form.size : 'small'"
						@click="reset"
						>重置</el-button
					>
					<el-button
						v-if="options.fold && options.fold.enable"
						type="text"
						:size="options.form.size ? options.form.size : 'small'"
						@click="collapsed = !collapsed"
					>
						<template v-slot:icon>
							<icon-up v-if="!collapsed" />
							<icon-down v-else />
						</template>
						{{ collapsed ? '展开' : '收起' }}
					</el-button>
				</template>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
	name: 'JinForm',
	props: {
		value: {
			type: Object,
			required: true,
		},
		options: {
			type: Object,
			required: true,
		},
		columns: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			collapsed: this.options.fold?.defaultCollapsed ?? false,
			dicData: {},
			hasCascaderColumns: [],
			initForm: {},
		};
	},
	computed: {
		/* cloneForm() {
			return cloneDeep(this.value);
		}, */
	},
	watch: {
		value(newVal, oldVal) {
			this.hasCascaderColumns.forEach((item) => {
				if (newVal[item.field] !== oldVal[item.field]) {
					const arr = this.columns.filter((a) =>
						item?.cascader?.includes(a.field)
					);
					arr.forEach((i) => {
						if (i.request && Boolean(newVal[item.field])) {
							i.request(this.value).then((res) => {
								this.$set(
									this.dicData,
									i.field,
									i.resultFormat ? i.resultFormat(res) : res.data
								);
								if (
									!this.dicData[i.field]
										.map((i) => i.value)
										.includes(this.value[i.field])
								) {
									const res = { ...this.value, [i.field]: undefined };
									this.$emit('input', res);
								}
							});
						} else if (i.request && !newVal[item.field]) {
							this.$set(this.dicData, i.field, []);
							const res = { ...this.value, [i.field]: undefined };
							this.$emit('input', res);
						}
					});
				}
			});
		},
	},
	methods: {
		emit(event, value) {
			this.$emit(event, value);
		},
		colVShow(index) {
			return (
				index <= (this.options.fold?.index || 0) ||
				(index >= (this.options.fold?.index || 0) && !this.collapsed)
			);
		},
		getComponentBindProps(item) {
			const obj = {};
			obj.comName = `el-${item.type}`;
			if (item.type === 'input') {
				obj.comName = 'el-input';
				obj.allowClear = true;
				obj.placeholder = `请输入${item.label}`;
				obj.maxLength = 20;
			} else if (item.type === 'textarea') {
				obj.comName = 'el-input';
				obj.type = 'textarea';
				obj.allowClear = true;
				obj.placeholder = `请输入${item.label}`;
				obj.maxLength = 200;
			} else if (item.type === 'select') {
				obj.comName = 'JinSelect';
				obj.allowClear = true;
				obj.placeholder = `请输入${item.label}`;
				obj.options = this.dicData[item.field] || item.options;
			} else if (item.type === 'cascader') {
				obj.comName = 'el-cascader';
				obj.allowClear = true;
				obj.placeholder = `请输入${item.label}`;
				obj.options = this.dicData[item.field] || item.options;
			} else if (item.type === 'tree-select') {
				obj.comName = 'el-tree';
				obj.allowClear = true;
				obj.placeholder = `请输入${item.label}`;
				obj.data = this.dicData[item.field] || item.data;
			} else if (item.type === 'radio-group') {
				obj.comName = 'JinRadio';
				obj.options = this.dicData[item.field] || item.options;
			} else if (item.type === 'checkbox-group') {
				obj.comName = 'JinCheckbox';
				obj.options = this.dicData[item.field] || item.options;
			} else if (item.type === 'date-picker') {
				obj.comName = 'el-date-picker';
				obj.placeholder = '请选择日期';
			} else if (item.type === 'time-picker') {
				obj.comName = 'el-time-picker';
				obj.allowClear = true;
				obj.placeholder = '请选择时间';
			} else if (item.type === 'input-number') {
				obj.comName = 'el-input-number';
				obj.allowClear = true;
			} else if (item.type === 'upload') {
				obj['file-list'] = this.value[item.field] || [];
			}
			return { ...obj, ...item.props };
		},
		valueChange(value, field) {
			this.$emit('input', { ...this.value, [field]: value });
		},
		upLoadChange(file, fileList, field, item) {
			if (item.resultFormat) {
				fileList = item.resultFormat(fileList);
			}
			this.$emit('input', { ...this.value, [field]: fileList });
		},
		isHide(hide) {
			if (hide === undefined) return false;
			if (typeof hide === 'boolean') return hide;
			if (typeof hide === 'function') return hide(this.value);
		},
		isDisabled(disabled) {
			if (disabled === undefined) return false;
			if (typeof disabled === 'boolean') return disabled;
			if (typeof disabled === 'function') return disabled(this.value);
		},
		reset() {
			this.$refs.formRefC.resetFields();
			this.$emit('input', this.initForm);
		},
		async handleSubmit() {
			try {
				const res = await this.$refs.formRefC.validate();
				if (res) {
					this.$emit('search');
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.columns.forEach((item) => {
			if (item.request && typeof item.request === 'function' && item?.init) {
				item.request(this.value).then((res) => {
					this.$set(
						this.dicData,
						item.field,
						item.resultFormat ? item.resultFormat(res) : res.data
					);
				});
			}
		});

		this.columns.forEach((item) => {
			const arr = this.hasCascaderColumns.map((i) => i.field);
			if (item.cascader?.length && !arr.includes(item.field)) {
				this.hasCascaderColumns.push(item);
			}
		});

		this.initForm = cloneDeep(this.value);
	},
};
</script>

<style lang="scss" scoped>
/* 这里可以添加你的样式 */
::v-deep .el-form-item__content {
	.el-select,
	.el-input,
	.el-cascader {
		width: 100%;
	}
}
</style>
