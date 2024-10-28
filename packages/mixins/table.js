import { omit, cloneDeep, debounce } from 'lodash';
import * as api from 'axios';
// console.log('🚀🚀🚀----api:', api);
// import { successCode } from '@/config';
// import { getUserConfig, updateUserConfig } from '@/api/user';
// import * as api from '@/api/bean';
const successCode = [0];

export default {
	data() {
		return {
			model: {},

			loading: false,
			list: [], // 列表数据
			pager: {
				// 分页
				size: 10,
				page: 1,
				total: 0,
			},
			configKey: '',
			isFirst: true,
			configFields: [],
			configData: null,
			showFields: [],
			dialog: {
				visible: false,
				row: null,
			},
			header: {
				visible: false,
			},
			customSearchDialog: {
				visible: false,
			},
			multipleSelection: [],
		};
	},
	async mounted() {
		const query = this.$route.query;
		if (this.model?.size) {
			this.pager.size = this.model.size;
		} else {
			this.pager.size = +(query.size || 10);
		}
		this.pager.page = +(query.page || 1);

		//有的页面读取地址栏的参数传给接口会有问题出现，默认读取<不写isGetUrlParams>
		if (this.model && !this.model.isGetUrlParams) {
			const params = omit(query, ['size', 'page']);
			this.filters = { ...this.filters, ...params };
		} else {
			this.filters = { ...this.filters };
		}

		if (typeof this.init === 'function') {
			await this.init();
		}

		await this.initShowFields();

		//只需要上面的字段显示，不需要列表的情况不加这个会报警告
		if (JSON.stringify(this.model) == '{}') {
			return;
		}
		//有的并不需要一进来就call getList(),这里加一层断层，避免无用call Get API。【默认不写“isBreak”兼容之前的写法】
		if (this.model && this.model.isBreak) return;
		await this.getList();
	},
	methods: {
		async initShowFields() {
			let res;
			if (this.configKey) {
				res = await getUserConfig(this.configKey);
			} else {
				res = { errorCode: 0, data: {} };
			}
			if (res && successCode.includes(res.errorCode)) {
				this.configData = res.data;
				let th = [];
				if (res.data) {
					let data = null;
					if (Object.prototype.toString.call(res.data) === '[object String]') {
						data = JSON.parse(res.data);
					} else {
						data = res.data;
					}

					if (this.model.anotherPageSize) {
						th = data.th;
						this.pager.size = this.model.anotherPageSize;
					} else {
						if (data) {
							th = data.th;
							if (data.pageSize && this.isFirst) {
								this.pager.size = data.pageSize;
							}
						}
					}
				} else {
					if (this.model.anotherPageSize) {
						this.pager.size = this.model.anotherPageSize;
					}
				}
				this.refreshFields(th);
			}
		},
		refreshFields(th = []) {
			this.configFields = th;
			let allFields = cloneDeep(this.allFields);
			allFields = allFields.map((item) => {
				if (this.formatterMap && this.formatterMap[item.prop]) {
					item.formatter = this.formatterMap[item.prop];
				}
				return item;
			});

			const array = [];
			if (th.length) {
				th.forEach((item) => {
					const aItem = allFields.find((aItem) => item === aItem.prop);
					if (aItem) {
						array.push(aItem);
					}
				});
				this.showFields = array;
			} else {
				this.showFields = allFields;
			}
		},
		//自定义查询--开始
		showCustomSearchDialog() {
			this.customSearchDialog.visible = true;
		},
		cancelCustomSearchDialog() {
			this.customSearchDialog.visible = false;
		},
		//自定义查询--结束
		showHeaderCfg() {
			this.header.visible = true;
		},
		cancelHeaderCfg() {
			this.header.visible = false;
		},
		headerCfgSuccess(list = []) {
			this.header.visible = false;
			this.refreshFields(list);
		},
		showDialog(row = null) {
			this.dialog.row = row;
			this.dialog.visible = true;
		},
		cancelDialog() {
			this.dialog.row = null;
			this.dialog.visible = false;
		},
		submitSuccess() {
			this.dialog.visible = false;
			this.getList();
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		/**
		 * 批量删除(url/ids)
		 * @returns
		 */
		async batchRemove() {
			if (!this.multipleSelection.length) {
				this.$notify({
					title: '警告',
					type: 'warning',
					message: '请选择需要删除的记录！',
				});
				return;
			}
			const ids = this.multipleSelection.map((item) => {
				return item.id;
			});
			try {
				const confirm = await this.$confirm(
					`确认删除选中${this.model.name}？`,
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						dangerouslyUseHTMLString: true,
					}
				);

				if (confirm) {
					const res = await api.batchDeleteBean(
						this.model.delUri ? this.model.delUri : this.model?.uri,
						ids.join(',')
					);
					if (res && successCode.includes(res.errorCode)) {
						this.$notify.success({
							title: '成功',
							message: '删除成功！',
						});
						this.getList();
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 批量删除(url?ids=xxx)
		 * @returns
		 */
		async batchRemoveParams() {
			if (!this.multipleSelection.length) {
				this.$notify({
					title: '警告',
					type: 'warning',
					message: '请选择需要删除的记录！',
				});
				return;
			}
			const ids = this.multipleSelection.map((item) => {
				return item.id;
			});
			try {
				const confirm = await this.$confirm(
					`确认删除选中${this.model.name}？`,
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						dangerouslyUseHTMLString: true,
					}
				);

				if (confirm) {
					const res = await api.delBean(
						this.model.delUri ? this.model.delUri : this.model?.uri,
						{ ids: ids.join(',') }
					);
					if (res && successCode.includes(res.errorCode)) {
						this.$notify.success({
							title: '成功',
							message: '删除成功！',
						});
						this.getList();
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 每页显示条数变化
		 * @param size
		 */
		async handleSizeChange(size) {
			this.pager.page = 1;
			this.pager.size = size;
			let data = {};
			if (
				Object.prototype.toString.call(this.configData) === '[object String]'
			) {
				data = JSON.parse(this.configData);
			} else {
				data = this.configData || {};
			}
			data.pageSize = size;
			this.getList();
			if (!this.configKey) return;
			const params = {
				configKey: this.configKey,
				configValue: JSON.stringify(data),
			};
			/* const res = await updateUserConfig(params);
			if (res && successCode.includes(res.errorCode)) {
				this.initShowFields();
            } */
			this.initShowFields();
		},
		/**
		 * 页码变化
		 * @param page
		 */
		handleCurrentChange(page) {
			this.pager.page = page;
			this.getList();
		},
		getSearchParams(filters) {
			const params = {};
			const obj = cloneDeep(filters);
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					let value = obj[key];

					// 字符串剔除前后空格
					if (typeof value === 'string') {
						value = value.replace(/(^\s*)|(\s*$)/g, '');
					}
					if (value !== '' && value !== null) {
						if (Array.isArray(value)) {
							if (value.length > 0) {
								params[key] = value.join(',');
							}
						} else {
							params[key] = value;
						}
					}
				}
			}
			console.log('🚀🚀🚀----params:', params);
			return params;
		},
		replaceRouter(pager, filters) {
			this.$router.replace({
				path: this.$route.path,
				query: {
					...omit(pager, ['total']),
					...filters,
				},
			});
		},
		async getFilters() {
			let filters = {};
			if (typeof this.hanldeFilters === 'function') {
				filters = await this.hanldeFilters();
			} else {
				filters = cloneDeep(this.filters);
			}

			if (
				this.model &&
				typeof this.model.isClearEmpty !== 'undefined' &&
				!this.model.isClearEmpty
			) {
				return filters;
			}
			console.log('🚀🚀🚀----filters:', filters);
			return this.getSearchParams(filters);
		},
		async getList() {
			try {
				const params = await this.getFilters();
				const args = { ...params, ...this.pager };
				delete args.total;
				this.isFirst = false;
				if (
					this.model &&
					typeof this.model.isReplaceRouter !== 'undefined' &&
					!this.model.isReplaceRouter
				) {
					this.replaceRouter(this.pager, params);
				}

				this.loading = true;
				// 回调函数，加载同步处理
				if (this.model && this.model.beforeLoadFun) {
					try {
						this.model.beforeLoadFun(args);
					} catch (err) {
						console.log(err);
					}
				}

				if (api.sourceMap[this.model?.uri]) {
					api.sourceMap[this.model?.uri].cancel('精确取消');
				}

				let res = null;
				if (this.model && this.model.requestType == 'Post') {
					if (this.model.contentType == 'Json') {
						res = await api.addBeanJson(this.model.uri, args);
					} else {
						res = await api.addBean(this.model.uri, args);
					}
				} else {
					//默认get请求
					res = await api.getBeanList(this.model.uri, args);
				}

				if (res && successCode.includes(res.errorCode)) {
					this.multipleSelection = [];
					if (this.model.isData) {
						if (typeof this.formatListFn === 'function') {
							this.list = this.formatListFn(res.data);
						} else {
							this.list = res.data;
						}
						this.pager.total = this.list.length;
					} else {
						// 默认
						if (typeof this.formatListFn === 'function') {
							this.list = this.formatListFn(res.data.list);
						} else {
							this.list = res.data.list;
						}
						this.pager.total = res.data.total;
					}

					// 回调函数，加载同步处理
					if (this.model.afterLoadFun) {
						try {
							this.model.afterLoadFun();
						} catch (err) {
							console.log(err);
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.loading = false;
			}
		},
		normalSearch: debounce(
			async function () {
				this.pager.page = 1;
				this.getList();
			},
			500,
			{
				leading: false,
				trailing: true,
			}
		),
	},
};
