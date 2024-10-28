<template>
	<el-table
		ref="table"
		v-bind="$attrs"
		v-horizontal-scroll="'always'"
		v-on="$listeners"
		@expand-change="handleExpand"
	>
		<template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
			<slot :name="slot" v-bind="scope" />
		</template>
	</el-table>
</template>

<script>
// import { Table as ElTable } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

const wait = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export default {
	name: 'JinStickyTable',
	components: {
		// ElTable,
	},
	inheritAttrs: true,
	props: {
		sticky: {
			default: false,
			type: Boolean,
		},
		stickyOffsetTop: {
			default: 0,
			type: Number,
		},
	},

	data() {
		return {
			oldScrollableParentNodes: [],
			tableEl: undefined,
			tableHeader: undefined,
			tableHeaderFixed: undefined,
			tableHeaderFixedRight: undefined,
			requestId: null,
			isResetTop: false,
		};
	},
	computed: {
		scrollableParentNodes() {
			const nodes = [document];
			try {
				let parentNode = this.tableEl ? this.tableEl.parentElement : null;
				while (parentNode !== null) {
					if (
						['auto', 'scroll', 'visible'].includes(
							getComputedStyle(parentNode).overflowY
						)
					) {
						nodes.push(parentNode);
					}
					parentNode = parentNode.parentElement;
				}
			} catch (error) {
				console.log(error);
			}
			return nodes;
		},
	},
	watch: {
		scrollableParentNodes: {
			immediate: true,
			handler() {
				this.oldScrollableParentNodes.forEach((node) => {
					node.removeEventListener('scroll', this.adjust);
					node.removeEventListener('wheel', this.adjust);
				});
				this.scrollableParentNodes.forEach((node) => {
					node.addEventListener('scroll', this.adjust);
					node.addEventListener('wheel', this.adjust);
				});
				this.oldScrollableParentNodes = [...this.scrollableParentNodes];
			},
		},
		tableEl() {
			const elTable = this.tableEl;

			const tableHeader = [...elTable.children].find((el) =>
				el.classList.contains('el-table__header-wrapper')
			);
			if (tableHeader !== undefined) {
				this.tableHeader = tableHeader;
			}

			const elTableFixed = [...elTable.children].find((el) =>
				el.classList.contains('el-table__fixed')
			);
			if (elTableFixed !== undefined) {
				this.tableHeaderFixed = [...elTableFixed.children].find((el) =>
					el.classList.contains('el-table__fixed-header-wrapper')
				);
			}

			const elTableFixedRight = [...elTable.children].find((el) =>
				el.classList.contains('el-table__fixed-right')
			);
			if (elTableFixedRight !== undefined) {
				this.tableHeaderFixedRight = [...elTableFixedRight.children].find(
					(el) => el.classList.contains('el-table__fixed-header-wrapper')
				);
			}
		},
		tableHeader() {
			if (this.tableHeader === undefined) return;

			this.tableHeader.style.position = 'relative';
			// default table zIndex = 1
			this.tableHeader.style.zIndex = '2';
		},
		tableHeaderFixed() {
			if (this.tableHeaderFixed === undefined) return;

			this.tableHeaderFixed.style.position = 'relative';
			// fixed table zIndex = 3
			this.tableHeaderFixed.style.zIndex = '4';
		},
		tableHeaderFixedRight() {
			if (this.tableHeaderFixedRight === undefined) return;

			this.tableHeaderFixedRight.style.position = 'relative';
			// fixed table zIndex = 3
			this.tableHeaderFixedRight.style.zIndex = '4';
		},
		data: {
			immediate: true,
			handler() {
				this.adjust();
			},
		},
	},
	async mounted() {
		console.log(this.$attrs);
		if (this.sticky === false) return;

		// wait for nested element rendering
		await this.$nextTick();

		this.tableEl = this.$refs.table.$el;

		window.addEventListener('resize', this.adjust);
		window.addEventListener('sticky-table:expand', this.adjust);
	},
	beforeDestroy() {
		this.scrollableParentNodes.forEach((node) => {
			node.removeEventListener('scroll', this.adjust);
			node.removeEventListener('wheel', this.adjust);
		});
		window.removeEventListener('resize', this.adjust);
		window.removeEventListener('sticky-table:expand', this.adjust);
	},
	methods: {
		resetSticky() {
			this.isResetTop = true;
			this.adjust();
		},
		handleExpand() {
			window.dispatchEvent(new Event('sticky-table:expand'));
		},
		adjust() {
			cancelAnimationFrame(this.requestId);
			this.requestId = requestAnimationFrame(async () => {
				if (!this.$refs.table && !this.$refs.table.$el) return;
				const top =
					this.$refs.table.$el.getBoundingClientRect().top -
					this.stickyOffsetTop;
				const finalTop = top >= 0 ? '0' : Math.abs(top) + 'px';

				[this.tableHeader, this.tableHeaderFixed, this.tableHeaderFixedRight]
					.filter((el) => el !== undefined)
					.forEach((el) => {
						el.style.top = this.isResetTop ? '0px' : finalTop;
					});

				this.isResetTop = false;

				// TODO: figure out the problem
				// try to fix wrong offset is calculated on first render
				await wait(166);
				if (this.tableHeaderFixedRight === undefined) return;
				const parentWidth = getComputedStyle(
					this.tableHeaderFixedRight.parentElement
				).width;
				const childWidth = getComputedStyle(
					[...this.tableHeaderFixedRight.children].find((el) =>
						el.classList.contains('el-table__header')
					)
				).width;
				this.tableHeaderFixedRight.style.left = `calc(-${childWidth} + ${parentWidth})`;
			});
		},
	},
};
</script>
