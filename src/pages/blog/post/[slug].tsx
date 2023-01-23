import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getPostFromSlug, getSlugs } from "src/lib/lib";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from 'next-seo';
import { PostMeta } from "src/types";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSectionHeadings from "rehype-section-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { use, useEffect } from "react";
import PageViews from "src/components/PageViews/PageViews";

import s from "styles/Post.module.scss";
import useStorage from "src/utils/useStorage";
import TableOfContents, {
	Heading,
} from "src/components/TableOfContents/TableOfContents";
import Breadcrumbs from "src/components/Breadcrumbs/Breadcrumbs";
import {
	convertTime,
	getOnlyUniqueValuesFromArray,
	useWebMentions,
} from "src/utils";
import Link from "next/link";
import YouTube from "src/components/Youtube/Youtube";

import * as fs from "fs";
import { canonicalBlogPostUrl, OgImageUrl, relativeOgImageUrl } from "src/utils/url";
import { oGImageHeight, oGImageWidth } from "src/utils/constants";

//JSON.stringify;

interface MDXPost {
	source: MDXRemoteSerializeResult;
	meta: PostMeta;

	headings: Heading[];
}

// TODO Add theme to codeblock

// TODO Image placeholder and Image optimization: https://nextjs.org/docs/api-reference/next/image

/* https://vscodethemes.com/e/stepanvanzuriak.mono/mono-white?language=javascript 

https://vscodethemes.com/e/arthurwhite.white/white?language=javascript

https://vscodethemes.com/e/u29dc.set/set-light?language=javascript

https://vscodethemes.com/e/saahilclaypool.blind-themes/light-blind?language=javascript

https://vscodethemes.com/e/mufanzaa.e-ink-theme-2/e-ink-2?language=javascript

*/

const options = {
	theme: "one-dark-pro",

	onVisitLine(node: any) {
		// Prevent lines from collapsing in `display: grid` mode, and
		// allow empty lines to be copy/pasted
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},

	// Feel free to add classNames that suit your docs
	onVisitHighlightedLine(node: any) {
		node.properties.className.push("highlighted");
	},
	onVisitHighlightedWord(node: any) {
		node.properties.className = ["word"];
	},
};

export default function Post({ post }: { post: MDXPost }) {
	const { setItem, getItem } = useStorage();

	useEffect(() => {
		if (!getItem(`page:[${post.meta.title}]`)) {
			fetch(`/api/views/${post.meta.slug}`, { method: "POST" });
			setItem(`page:[${post.meta.title}]`, "visited");
		}
	}, [post.meta.slug]);

	console.log(relativeOgImageUrl.toString());

	return (
		<>
			<Head>
				<title>{post.meta.title}</title>
			</Head>

			<NextSeo
				title={post.meta.title}
				description={post.meta.excerpt}
				canonical={canonicalBlogPostUrl(post.meta.slug)}
				openGraph={{
					type: 'article',
					images: [
						{
							height: oGImageHeight,
							width: oGImageWidth,
							url: OgImageUrl({
								date: post.meta.date,
								excerpt: post.meta.excerpt,
								readingTime: post.meta.readingTime,
								title: post.meta.title

							})

						}
					]
				}}

			/>

			<div>
				<div className={s.headingContainer}>
					<div className={s.postHeading}>
						<Breadcrumbs currentCategory={post.meta.category} />
						<h1 className={s.postTitle}>{post.meta.title}</h1>
						<p className={s.postSummary}>{post.meta.summary}</p>
						<ul className={s.tags}>
							{" "}
							{getOnlyUniqueValuesFromArray(post.meta.tags).map(
								(tag) => (
									<li>
										<Link
											className={s.tagItem}
											key={`${post} ${tag}`}
											href={`/blog/tag/${tag}`}
										>
											{tag}
										</Link>
									</li>
								)
							)}
						</ul>
						<PageViews slug={post.meta.slug} />
					</div>
				</div>
				<div>
					<div className={s.wrapper}>
						<div className={s.blogContainer}>
							<MDXRemote
								{...post.source}
								//@ts-ignore
								components={{ YouTube }}
							/>
						</div>

						<TableOfContents headings={post.headings} />
					</div>
				</div>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug);

	// let headings = Array.from(
	// 	content.matchAll(/(?<flag>#{1,6})\s+(?<content>.+)/g)
	// ).map(({ groups: { flag, content } }) => ({
	// 	depth: flag.length,
	// 	text: content
	// 		.replace(/\s+/g, "-")
	// 		.replace(/[^a-zA-Z0-9-]/g, "")
	// 		.toLowerCase(),
	// }));

	let headings = Array.from(
		(function* () {
			const regex = /(#{1,6})\s+(.+)/g;
			let match;
			while ((match = regex.exec(content))) {
				yield {
					depth: match[1].length,
					text: match[2]
						.replace(/\s+/g, "-")
						.replace(/[^a-zA-Z0-9-]/g, "")
						.toLowerCase(),
				};
			}
		})()
	);

	let tabWidth = "  ";

	let codeTabs = content.replace(/\t/g, " ");

	const mdxSource = await serialize(codeTabs, {
		mdxOptions: {
			rehypePlugins: [
				//@ts-ignore
				rehypeSlug,
				//@ts-ignore
				[rehypeAutolinkHeadings, { behavior: "append" }],
				//@ts-ignore
				[rehypeSectionHeadings, { sectionDataAttribute: "data-id" }],
				//@ts-ignore
				[rehypeExternalLinks, { target: "_blank" }],

				[rehypePrettyCode, options],
			],
		},
	});



	return { props: { post: { source: mdxSource, meta, headings } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs().map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
