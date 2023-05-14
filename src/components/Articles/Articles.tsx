// import G from "glob";
import Link from "next/link";
import React from "react";
import { PostMeta } from "src/types";
import ArticleItem from "../ArticleItem/ArticleItem";
import s from "./Articles.module.scss";

export default function Articles({
	posts,
	postCount,
	title,
	titleCaption,
	headingLink,
}: {
	posts: PostMeta[];
	postCount?: number;
	title?: string;
	titleCaption?: string;
	headingLink?: string;
}) {
	return (
		<div className={s.articles}>
			<div className={s.headingSection}>
				{title ? (
					<>
						{typeof headingLink !== "undefined" ? (
							<Link
								className={s.link}
								href={headingLink}>
								<h1 className={s.title}>{title}</h1>
							</Link>
						) : (
							<h1 className={s.title}>{title}</h1>
						)}
					</>
				) : null}

				{postCount || titleCaption ? (
					<h4 className={s.articleCount}>
						{postCount ? (
							<>
								{postCount === 1
									? `${postCount} Article`
									: `${postCount} Articles`}
							</>
						) : (
							<>{titleCaption}</>
						)}
					</h4>
				) : null}

        
			</div>
			<ul className={s.articleList}>
				{posts.map((post) => (
					<li
						className={s.articleItem}
						key={post.slug}>
						<ArticleItem post={post} />
					</li>
				))}
			</ul>
		</div>
	);
}
