# JinForm 组件

## 介绍

`JinForm` 是一个基于 Element UI 的表单组件，提供了简单易用的接口。

## 使用示例

<details>
<summary>点击查看代码示例</summary>

```vue
<template>
	<JinForm :model="formModel" :rules="formRules">
		<el-form-item label="姓名" prop="name">
			<el-input v-model="formModel.name"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm">提交</el-button>
		</el-form-item>
	</JinForm>
</template>

<script>
export default {
	data() {
		return {
			formModel: {
				name: '',
			},
			formRules: {
				name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
			},
		};
	},
	methods: {
		submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					alert('提交成功');
				} else {
					console.log('表单验证失败');
					return false;
				}
			});
		},
	},
};
</script>
```

</details>
