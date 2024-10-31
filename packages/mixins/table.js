import { omit, cloneDeep, debounce } from 'lodash';
const successCode = [0];

export default {
	data() {
		return {
			model: {
				isReplaceRouter: true,
			},

			loading: false,
			list: [], // 列表数据
			pager: {
				// 分页
				size: 10,
				page: 1,
				total: 0,
			},
			isFirst: true,
			showFields: [],

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
			for (const key in this.filters) {
				if (
					this.filters[key] &&
					typeof this.filters[key] === 'string' &&
					this.filters[key].includes(',')
				) {
					this.filters[key] = this.filters[key].split(',');
				}
			}
		} else {
			this.filters = { ...this.filters };
			//检测是否能split(,)，如果能split(,)，则转换为数组
			for (const key in this.filters) {
				if (
					this.filters[key] &&
					typeof this.filters[key] === 'string' &&
					this.filters[key].includes(',')
				) {
					this.filters[key] = this.filters[key].split(',');
				}
			}
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
		searchReset() {
			this.filters = {};
			this.getList();
		},
		async initShowFields(th = []) {
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

		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		/**
		 * 每页显示条数变化
		 * @param size
		 */
		async handleSizeChange(size) {
			this.pager.page = 1;
			this.pager.size = size;
			this.getList();
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
					this.model.isReplaceRouter
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

				let res = null;
				if (
					this.model &&
					this.model.requestFun &&
					typeof this.model.requestFun === 'function'
				) {
					res = await this.model.requestFun(args);
				} else {
					this.$message.error('缺少表单请求方法');
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
