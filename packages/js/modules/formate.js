const baseURL = '//';

// 拼接对象参数到 URL
// 注意: 屈臣氏是`${baseURL.substring(0, baseURL.length - 1)}${url}`
// 注意: 审批是`${API_ROOT}${url}`
export function appendUrlParams(url, obj = {}) {
	// 如果 url 不是以 http 开头，拼接 '/plantform/' 字符串
	const fullUrl =
		url.startsWith('http') || url.startsWith('data:image')
			? url
			: `${baseURL.substring(0, baseURL.length - 1)}${url}`;

	//obj 为空，直接返回
	if (Object.keys(obj).length === 0) {
		return fullUrl;
	}

	// 确保 obj 中的键是字符串或数字
	const validParams = {};
	for (const key in obj) {
		if (typeof key === 'string' || typeof key === 'number') {
			validParams[key] = obj[key];
		}
	}

	// 解析 URL
	const [basePath, queryString = ''] = fullUrl.split('?');
	const params = new URLSearchParams(queryString);

	// 添加或更新参数
	Object.entries(validParams).forEach(([key, value]) => {
		params.set(key, value);
	});

	// 拼接参数到 URL
	const newUrl = `${basePath}?${params.toString()}`;

	return newUrl; // 返回新的 URL
}
