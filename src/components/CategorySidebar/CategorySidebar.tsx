import Link from "next/link";
import { PostMeta } from "src/types";
import { getOnlyUniqueValuesFromArray } from "src/utils";

import s from "./CategorySidebar.module.scss";

export default function CategorySidebar({
	posts,
}: {
	posts: PostMeta[];
}) {
	let categories = new Array();
	posts.forEach((post) => {
		categories.push(post.category);
	});
	let uniqueCategories = getOnlyUniqueValuesFromArray(categories);

	return (
		<>
			<div>
				<ul className={s.tags}>
					{uniqueCategories.map((tag) => (
						<li>
							<Link
								className={s.tagItem}
								key={tag}
								href={`blog/category/${tag}`}>
								{tag}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
