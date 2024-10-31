/**
 * 获取可访问路由树
 * @param tree
 */
export function loopRouter(tree, asyncRouter) {
	for (let i = 0, len = tree.length; i < len; i++) {
		let item = tree[i];
		if (asyncRouter.includes(item?.name) && item.meta?.showMenu) {
			if (item.children) {
				item.children = loopRouter(item?.children, asyncRouter);
			}
		} else {
			tree.splice(i, 1);
			len = tree.length; // 刷新循环长度
			if (i < tree.length) {
				// 删除后,数组长度-1,数组的下一位前进了一位,所以一旦splice掉不存在的权限,便需要i--,否则会跳过下一位
				i--;
			}
		}
	}
	return tree;
}

/**
 * 合并查询参数到 URL 的函数
 * 将给定的查询对象 Query 合并到指定的 URL 中
 *
 * @param {Object} query - 要合并到 URL 中的查询对象
 * @param {string} url - 作为基础的 URL，默认为当前页面的 URL
 * @returns {string} 生成的合并查询参数后的新 URL
 */
export function getUrlMergeQuery(query = {}, url) {
	url = url || window.location.href;
	const _orgQuery = getQueryObject(url);
	const _query = { ..._orgQuery, ...query };
	let _arr = [];
	for (let key in _query) {
		const value = _query[key];
		if (value) _arr.push(`${key}=${encodeURIComponent(_query[key])}`);
	}
	return `${url.split('?')[0]}${_arr.length > 0 ? `?${_arr.join('&')}` : ''}`;
}

/**
 * 从 URL 中提取查询参数对象
 *
 * @param {string} [url=window.location.href] - 要解析的 URL 字符串。如果未提供，则使用当前页面的 URL
 * @returns {Object} - 包含提取的查询参数的对象
 */
export function getQueryObject(url = window.location.href) {
	const search = url.substring(url.lastIndexOf('?') + 1);
	const obj = {};
	const reg = /([^?&=]+)=([^?&=]*)/g;
	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1);
		let val = decodeURIComponent($2);
		val = String(val);
		obj[name] = val;
		return rs;
	});
	return obj;
}
