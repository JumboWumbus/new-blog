import type { FunctionalComponent, ComponentChildren } from "preact";

const CollapseList: FunctionalComponent<{
	open?: boolean;
	summary: string;
	children: ComponentChildren;
}> = ({ open = false, summary, children }) => {
	return (
		<>
			<details open={open}>
				{
					<>
						<summary>{summary}</summary>

						{children}
					</>
				}
			</details>
		</>
	);
};

export default CollapseList;
