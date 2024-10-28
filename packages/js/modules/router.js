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
