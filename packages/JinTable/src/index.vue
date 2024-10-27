<template>
	<div class="clearfix">
		<StickyTable
			v-if="rendered"
			ref="stable"
			v-loading="loading"
			border
			class="standard-table"
			:data="list"
			header-row-class-name="standard-table-th"
			:max-height="maxHeight ? maxHeight : null"
			:row-key="rowKey"
			:show-summary="showSummary"
			:sticky="sticky"
			:sticky-offset-top="stickyOffsetTop"
			style="width: 100%"
			:summary-method="summaryMethod"
			@expand-change="expandChange"
			@selection-change="handleSelectionChange"
			@sort-change="sortChange"
		>
			<slot v-if="showSelection" name="selection">
				<el-table-column
					align="center"
					:reserve-selection="isReserveSelection"
					type="selection"
					width="45"
				/>
			</slot>
			<slot name="image"></slot>
			<slot name="extend"></slot>

			<el-table-column
				v-if="showIndex"
				align="center"
				fixed="left"
				label="序号"
				width="50"
			>
				<template slot-scope="scope">
					<span>{{ scope.$index + pager.size * (pager.page - 1) + 1 }}</span>
				</template>
			</el-table-column>
			<!-- 配置列 -->
			<el-table-column
				v-for="(field, ids) in showFields"
				:key="ids"
				:align="field.align || 'left'"
				:class-name="field.className || ''"
				:fixed="field.fixed"
				:formatter="field.formatter || null"
				:label="field.label"
				:min-width="field.minWidth"
				:prop="field.prop"
				:resizable="true"
				:show-overflow-tooltip="
					field.showOverflowTooltip !== undefined
						? field.showOverflowTooltip
						: true
				"
				:sortable="field.sortable"
				:width="field.width"
			>
				<template v-if="field.sortFlag" slot="header">
					{{ field.label }}
					<span
						class="caret-wrapper"
						:class="{
							ascending: sortFlagProp === field.prop && sortFlagType === 'asc',
							descending:
								sortFlagProp === field.prop && sortFlagType === 'desc',
						}"
						@click="changeSort(field.prop)"
					>
						<i class="sort-caret ascending"></i>
						<i class="sort-caret descending"></i>
					</span>
				</template>
				<template slot-scope="scope">
					<slot :index="scope.$index" :name="field.prop" :row="scope.row">
						<i
							v-if="field.isExtend"
							class="el-icon-caret-right i-right"
							@click="handleExtend(scope.row)"
						/>
						<div v-if="field.isDefault" class="inline" style="display: flex">
							<span style="margin-right: 5px">{{ scope.row[field.prop] }}</span>
							<el-tag v-if="scope.row.isDefault" type="danger">默认</el-tag>
							<el-tag v-if="scope.row.fixed" type="danger">系统</el-tag>
							<el-tag
								v-if="scope.row.projectActionStatus === 'Cancel'"
								size="mini"
								type="danger"
							>
								已取消
							</el-tag>
							<el-tag
								v-if="scope.row.projectActionStatus === 'Stop'"
								size="mini"
								type="warning"
							>
								已暂停
							</el-tag>
						</div>
						<div v-else-if="field.isProgress">
							<el-progress
								:percentage="
									handleProgress(
										scope.row.allCount,
										scope.row.doneCount,
										scope.row.canceledNum
									)
								"
								style="margin-top: 0px"
							/>
						</div>
						<div v-else-if="field.isNewProgress">
							<el-progress
								:format="formatProgress"
								:percentage="scope.row[field.prop]"
								:show-text="true"
								style="margin-top: 0px"
							/>
							<span class="processLabel">{{ scope.row[field.prop_] }}</span>
						</div>
						<div v-else-if="field.fns" class="inline">
							<el-link
								v-for="(link, index) in getLinks(scope.row, field)"
								:key="'link-' + index"
								style="margin-right: 10px"
								type="primary"
								@click="tapProp(field.prop, scope.row, link)"
							>
								{{ link.name || link.id }}{{ link.isLast ? '' : ',' }}
							</el-link>
							<span v-if="!getLinks(scope.row, field).length">--</span>
						</div>
						<div v-else-if="field.isJson" class="inline">
							<el-link
								v-for="(link, index) in getJson(scope.row, field)"
								:key="'link-' + index"
								style="margin-right: 10px"
								type="primary"
								@click="tapProp(field.prop, scope.row, link)"
							>
								{{ link.name || link.id }}{{ link.isLast ? '' : ',' }}
							</el-link>
						</div>
						<div v-else-if="field.fn" class="inline">
							<el-link type="primary" @click="tapProp(field.prop, scope.row)">
								<span v-if="field.dateFmt">
									{{
										field.formatter
											? field.formatter(scope.row)
											: formatDate(scope.row[field.prop], field.dateFmt)
									}}
								</span>
								<span v-else>
									{{
										field.formatter
											? field.formatter(scope.row)
											: scope.row[field.prop] || '--'
									}}
								</span>
							</el-link>
						</div>
						<span v-else-if="field.formatter">
							{{ field.formatter(scope.row, $store) }}
						</span>
						<div v-else-if="field.isImage">
							<el-image
								fit="contain"
								:preview-src-list="[imgUrl(scope.row[field.prop])]"
								:src="imgUrl(scope.row[field.prop])"
								:style="`width: ${field.imgWidth || 50}px; height: ${
									field.imgHeight || 50
								}px`"
							/>
						</div>
						<div
							v-else-if="field.isUiImage"
							:class="field.class || 'ui-image-box'"
						>
							<div
								v-for="(it, ind) in queryUiImageList(
									scope.row[field.prop],
									field
								)"
								:key="ind"
							>
								<UiImage
									:height="field.height || 100"
									:preview-src-list="
										queryUiImageList(scope.row[field.prop], field)
									"
									:src="it"
									:width="field.width || 100"
								/>
							</div>
						</div>
						<div
							v-else-if="field.map"
							:class="field.class || ''"
							:style="field.style || ''"
						>
							{{ field.map[scope.row[field.prop]] || '--' }}
						</div>
						<template v-else>
							<template v-if="field.dateFmt">
								<span v-if="scope.row[field.prop]">
									{{ formatDate(scope.row[field.prop], field.dateFmt) }}
								</span>
								<span v-else>--</span>
							</template>
							<template v-else-if="typeof scope.row[field.prop] === 'number'">
								{{ scope.row[field.prop] }}
							</template>
							<template v-else>{{ scope.row[field.prop] || '--' }}</template>
						</template>
					</slot>
				</template>
			</el-table-column>
			<!-- /配置列 -->

			<slot name="fn"></slot>
		</StickyTable>
		<div v-if="showPagination" class="pagination">
			<el-pagination
				:current-page="pager.page"
				layout="total, sizes, prev, pager, next, jumper"
				:page-size="pager.size"
				:page-sizes="pageSizes"
				:total="pager.total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			/>
		</div>
	</div>
</template>

<script>
// import { baseURL } from '@/config';
// import { mapGetters } from 'vuex';
// import { marked } from 'marked';
import { appendUrlParams } from '~/js';

import StickyTable from '~/JinStickyTable/src/index.vue';
import UiImage from '~/JinImage/src/index.vue';

export default {
	name: 'JinTable',
	components: {
		StickyTable,
		UiImage,
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			},
		},
		pageSizes: {
			type: Array,
			default: () => {
				return [5, 10, 20, 50, 100];
			},
		},
		pager: {
			type: Object,
			default: () => {
				return {
					size: 10,
					page: 1,
					total: 0,
				};
			},
		},
		showFields: {
			type: Array,
			default: () => {
				return [];
			},
		},
		loading: {
			type: Boolean,
			default: false,
		},
		showIndex: {
			type: Boolean,
			default: false,
		},
		isReserveSelection: {
			type: Boolean,
			default: false,
		},
		showSelection: {
			type: Boolean,
			default: true,
		},
		showPagination: {
			type: Boolean,
			default: true,
		},
		sortFlagMap: {
			type: Object,
			default: () => {
				return {};
			},
		},
		offHeight: {
			type: Number,
			default: 0,
		},
		showSummary: {
			type: Boolean,
			default: false,
		},
		summaryMethod: {
			type: Function,
			default: () => {
				return '';
			},
		},
		sticky: {
			type: Boolean,
			default: false,
		},
		stickyOffsetTop: {
			type: Number,
			default: 0,
		},
		rowKey: {
			type: Function,
			default: (row) => {
				return row?.id;
			},
		},
	},
	data() {
		return {
			rendered: false,
			sortFlagProp: '',
			sortFlagType: '',
		};
	},
	computed: {
		imgUrl() {
			return (data) => {
				if (!data) return '';
				return appendUrlParams(data);
			};
		},
		getLinks() {
			return (row, field) => {
				let data = row[field.prop];
				if (field.formatter) {
					data = field.formatter(row);
				}
				let items = [];
				if (data) {
					if (data.includes('[{')) {
						items = JSON.parse(data);
						items = items.map((m, n) => {
							m.isLast = n === items.length - 1;
							return m;
						});
						return items;
					}
					const idNames = data.toString().split(',');
					idNames.forEach((item, index) => {
						//不知道下面写的为什么要用‘-’切割，但是文件这样不行
						if (field.type && field.type == 'file') {
							items.push({
								id: index,
								name: item,
								isLast: index === idNames.length - 1,
							});
						} else {
							const idName = item.split('-');
							items.push({
								id: idName[0],
								name: idName[1],
								isLast: index === idNames.length - 1,
							});
						}
					});
				}
				return items;
			};
		},
		getJson() {
			return (row, field) => {
				let data = row[field.prop];
				if (field.formatter) {
					data = field.formatter(row);
				}
				return data;
			};
		},
		approveJson() {
			return (dataJson) => {
				let formConent = '';
				if (dataJson) {
					let myFormList = [];
					const formList = JSON.parse(dataJson);
					if (Array.isArray(formList)) {
						formList.forEach((item) => {
							if (item.children && item.children.length) {
								item.children.forEach((children) => {
									myFormList.push(children);
								});
							} else {
								myFormList.push(item);
							}
						});
						myFormList.forEach((formItem) => {
							if (
								![
									'Image',
									'Attachment',
									'SpecialIdentification',
									'Table',
									'MaterialTable',
								].includes(formItem.component)
							) {
								let value = '';
								if (
									(Array.isArray(formItem.value) && formItem.value.length) ||
									formItem.value
								) {
									if (Array.isArray(formItem.value) && formItem.value) {
										if (formItem.component == 'AssetsTable') {
											value = formItem.value.map(
												(res) =>
													'【' +
													(res.assetsName || '--') +
													'---' +
													(res.specs || '--') +
													'---' +
													(res.companyName || '--') +
													'】'
											);
										} else {
											value = formItem.value.join(',');
										}
									} else {
										value = formItem.value;
									}
									formConent += `${formItem.title || formItem.name}
                        ：${value}\n`;
								}
							}
						});
					} else if (formList.data) {
						formConent = formList.data + 'marked';
					}
				}
				return formConent;
			};
		},
		isMarked() {
			return (data) => {
				if (data && data.includes('marked')) {
					return true;
				} else {
					return false;
				}
			};
		},
		/* isRenderHtmlLabel() {
			// 显示在表格中的列
			return (data) => {
				data = data.replace('marked', '');
				data = data.replaceAll('</br>', '');
				data = data.replaceAll('#999', '#333');
				// 表格里面的摘要不显示图片
				data = data.replaceAll('<img  src=', '<font>');
				data = data.replaceAll('width="100%"/>', '</font>');
				data = data.replaceAll('table', 'span');
				data = data.replaceAll('tr', 'span');
				data = data.replaceAll('td', 'span');
				return marked.parse(data);
			};
		}, */
		/* isRenderHtml() {
			// 鼠标移过去显示
			return (data) => {
				data = data.replace('marked', '');
				return marked.parse(data);
			};
		}, */
		maxHeight() {
			const height = document.body.clientHeight;
			if (this.offHeight) {
				return height - this.offHeight;
			}
			return 0;
		},
	},
	watch: {
		showFields: {
			handler() {
				this.rendered = false;
				this.$nextTick(() => {
					this.rendered = true;
				});
			},
			immediate: true,
			deep: true,
		},
		sortFlagMap: {
			handler(val) {
				if (val && val.key) {
					this.sortFlagProp = val.key;
				}

				if (val && val.type) {
					this.sortFlagType = val.type;
				}

				this.rendered = false;
				this.$nextTick(() => {
					this.rendered = true;
				});
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		//是否需要JSON.parse
		queryUiImageList(str, field) {
			if (!str) return [];
			const strN = str.split(`${field.split || '#'}`);
			return strN;
		},
		resetSticky() {
			this.$refs.stable.resetSticky();
		},
		getKey(row) {
			return row.id;
		},
		sortChange(params) {
			this.$emit('sortChange', params);
		},
		changeSort(prop) {
			let type = 'desc';
			if (
				this.sortFlagMap &&
				this.sortFlagMap.key === prop &&
				this.sortFlagMap.type === 'desc'
			) {
				type = 'asc';
			}
			this.$emit('changeSort', prop, type);
		},
		formatProgress() {
			return '';
		},
		handleExtend(row) {
			this.$refs.stable.$refs.table.toggleRowExpansion(row);
		},
		handleProgress(allCount, doneCount, canceledNum) {
			if (allCount == 0 && canceledNum > 0) {
				return 100;
			}
			if (allCount || doneCount) {
				if (allCount !== 0) {
					return Math.round((doneCount / allCount) * 100);
				} else {
					return 0;
				}
			}
		},
		tapProp(type, item, link) {
			this.$emit('tapProp', type, item, link);
		},
		handleSelectionChange(val) {
			this.$emit('handleSelectionChange', val);
		},
		handleSizeChange(size) {
			this.$emit('handleSizeChange', size);
		},
		handleCurrentChange(page) {
			this.$emit('handleCurrentChange', page);
		},
		expandChange(row, expandedRows) {
			this.$emit('expandChange', row, expandedRows);
		},
	},
};
</script>
<style lang="scss" scoped>
.pagination {
	float: right;
}
.processLabel {
	position: absolute;
	right: 26px;
	bottom: 6px;
}
::v-deep {
	.el-link {
		font-size: 12px;
	}
}
</style>

<style lang="scss" scoped>
.markdown {
	//因为markdown用了v-html渲染会产生p标签，p标准自带margin在表格中所在行会与其他行高度不统一，故清空margin
	p {
		margin: 0 !important;
	}
}
.ui-image-box {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
