import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import { PostMeta } from "src/types";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "articles");

interface Post {
	content: string;
	meta: PostMeta;
}

export const getSlugs = ():string[] => {
	const paths = fs.readdirSync(ARTICLES_DIRECTORY);

	return paths.map((path) => {
		const slug = path.replace(/\.mdx$/, "");
		return slug;
	});
};

export const getAllPosts = () => {
	const posts = getSlugs()
		.map((slug) => getPostFromSlug(slug))
		.sort((a, b) => {
			if (a.meta.date > b.meta.date) return 1;
			if (a.meta.date < b.meta.date) return -1;
			return 0;
		})
		.reverse();
	return posts;
};

export const getPostFromSlug = (slug: string): Post => {
	const postPath = path.join(ARTICLES_DIRECTORY, `${slug}.mdx`);
	const source = fs.readFileSync(postPath);

	const { content, data } = matter(source);

	const postStats = readingTime(content);
	const minutes = Math.round(postStats.minutes / 5) * 5;

	return {
		content,
		meta: {
			slug,
			excerpt: data.excerpt ?? "",
			summary: data.summary ?? "",
			title: data.title ?? slug,
			author: data.author ?? "Ben Hammond",
			tags: (data.tags ?? []).sort(),
			category: data.category ?? "needs category",
			date: (data.date ?? new Date()).toString(),
			imageURL: data.imageURL ?? "ArticleImages/default.webp",
			readingTime: `${minutes} min read`,
		},
	};
};
