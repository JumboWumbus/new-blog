import G from "glob";
import Link from "next/link";
import React from "react";
import { PostMeta } from "src/types";
import ArticleItem from "../ArticleItem/ArticleItem";
import s from "./Articles.module.scss";

export default function Articles({
	posts,
	title,
	headingLink,
}: {
	posts: PostMeta[];
	title?: string;
	headingLink?: string;
}) {
	return (
		<div className={s.articles}>
			{title? <div className={s.headingSection}>
				{typeof headingLink !== "undefined" ? (
					<Link
						className={s.link}
						href={headingLink}
					>
						<h1 className={s.title}>{title}</h1>
					</Link>
				) : (
					<h1 className={s.title}>{title}</h1>
				)}

				<h4 className={s.articleCount}>
					{posts.length == 1
						? `${posts.length} Article`
						: `${posts.length} Articles`}
				</h4>
			</div> : <></>}

			<ul className={s.articleList}>
				{posts.map((post) => (
					<li
						className={s.articleItem}
						key={post.slug}
					>
						<ArticleItem post={post} />
					</li>
				))}
			</ul>
		</div>
	);
}
