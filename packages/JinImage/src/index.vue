<template>
	<div
		class="image-item"
		:style="{
			width: `${isNumber(width) ? `${width}px` : width}`,
			height: `${isNumber(height) ? `${height}px` : height}`,
		}"
	>
		<el-image
			:preview-src-list="previewSrcListN"
			:src="nowUrlN"
			:style="{ width: `${width}px`, height: `${height}px` }"
		/>
	</div>
</template>

<script>
import { isNumber, appendUrlParams } from '../../js';

export default {
	name: 'JinImage',
	props: {
		width: {
			type: [Number, String],
			default: '100%',
		},
		height: {
			type: [Number, String],
			default: '100%',
		},
		previewSrcList: {
			type: Array,
			default: () => [],
		},
		src: {
			type: [String, Object],
			default: '',
		},
		selKey: {
			type: String,
			default: 'fileUrl',
		},
	},

	data() {
		return {
			isNumber,
		};
	},
	computed: {
		previewSrcListN() {
			if (this.previewSrcList && this.previewSrcList.length > 0) {
				const list = this.previewSrcList.map((item) => {
					if (typeof item === 'object') {
						const it = this.resetItem(
							item[this.selKey] ? item[this.selKey] : item
						);
						return it;
					} else {
						const it = this.resetItem(item);
						return it;
					}
				});
				return list;
			} else return [];
		},
		nowUrlN() {
			if (typeof this.src === 'object') {
				return this.resetItem(
					this.src[this.selKey] ? this.src[this.selKey] : this.src
				);
			} else {
				if (this.src && this.src !== '') {
					return this.resetItem(this.src);
				} else return '';
			}
		},
	},
	created() {},
	mounted() {},
	methods: {
		resetItem(it) {
			return appendUrlParams(it);
		},
	},
};
</script>

<style lang="scss" scoped>
.image-item {
	.el-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
