import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getAllPostMetadata, getAllPosts, getPostFromSlug, getSlugs } from "src/lib/lib";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from 'next-seo';
import { BreadCrumb, PostMeta } from "src/types";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSectionHeadings from "rehype-section-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { useEffect } from "react";
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
	slugify,
} from "src/utils";
import Link from "next/link";

import WordPopup from "src/components/WordPopup/WordPopup";
import ImageCaption from "src/components/ImageCaption/ImageCaption";
import Video from "src/components/Video/VideoEmbed";
import * as fs from "fs";
import { canonicalBlogPostUrl, objToUrlParams } from "src/utils/url";
import { mainUrl, oGImageHeight, oGImageWidth } from "src/utils/constants";
import OGImageGeneration from "src/pages/api/og";
import { SEO } from "src/components/SEO/SEO";
import { SEOBlogPost } from "src/components/SEO/BlogPost_SEO";
import Navbar from "src/components/Navbar/Navbar";

import ShareCurrentPage from "src/components/ShareCurrentPost/ShareCurrentPost";


//JSON.stringify;

interface MDXPost {
	source: MDXRemoteSerializeResult;
	meta: PostMeta;
	headings: Heading[];
	posts: PostMeta[];
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
	theme: "rose-pine-dawn",
  keepBackground: false,

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

  const crumbArray: BreadCrumb[] = [
    {displayName: `Blog`, url:`/blog`},
    {displayName: post.meta.category, url:`/blog/category/${post.meta.category}`},
    {displayName: post.meta.title, url: `/blog/post/${post.meta.slug}`},
  ]

	useEffect(() => {
		if (!getItem(`page:[${post.meta.title}]`)) {
			fetch(`/api/views/${post.meta.slug}`, { method: "POST" });
			setItem(`page:[${post.meta.title}]`, "visited");
		}
	}, [post.meta.slug]);



	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
			header: `Blog ⟶ ${post.meta.category}`,
			title: post.meta.title,
			subtitle: `${convertTime(post.meta.date)} | ${post.meta.readingTime}`
		})}`,
		description: `Personal website of Ben Hammond`
	}

	return (
		<>
			

			<SEO
					title={post.meta.title} description={post.meta.excerpt} slug={`/blog/${post.meta.slug}`} previewImage={previewImage}
				/>
				<SEOBlogPost authorName={post.meta.author} readingTime={post.meta.readingTime} date={post.meta.date} slug={post.meta.slug} title={post.meta.title} description={post.meta.excerpt} previewImage={previewImage} />

				<Navbar posts={post.posts}/>
			<div>
				<div className={s.headingContainer}>
					<div className={s.postHeading}>
						<Breadcrumbs breadcrumbArray={crumbArray}  />
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
				<div className={s.contentContainer}>
					<div className={s.wrapper}>
						<div className={s.blogContainer}>
              
							<MDXRemote
								{...post.source}
								//@ts-ignore
								components={{ Video, WordPopup, ImageCaption }}
							/>
						</div>
            
            <div className={s.tableOfContentsContainer}>
						<TableOfContents headings={post.headings} headingDepth ={post.meta.headingDepth}/>

            <ShareCurrentPage currentPageURL={`${mainUrl}/blog/post/${post.meta.slug}`} supportingText={`best man\n`}/>
            </div>
					</div>

          {/* <TestComment/> */}
				</div>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug);


	const posts = getAllPostMetadata();


	// let headings = Array.from(
	// 	content.matchAll(/(?<flag>#{1,6})\s+(?<content>.+)/g)
	// ).map(({ groups: { flag, content } }) => ({
	// 	depth: flag.length,
	// 	text: content
	// 		.replace(/\s+/g, "-")
	// 		.replace(/[^a-zA-Z0-9-]/g, "")
	// 		.toLowerCase(),
	// }));


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



  let headings = Array.from(
    (function* () {
      const regex = /(#{1,6})\s+(.+)/g;
      const headingCounts = new Map(); // Map to store the count of each heading
      let match;
      while ((match = regex.exec(content))) {
        const depth = match[1].length;
        const text = match[2]
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toLowerCase();
        let dataID = text;
        let count = headingCounts.get(dataID) || 0; // Get the current count for the heading
        if (count > 0) {
          dataID = `${text}-${count}`; // Append count to make heading unique
        }
        headingCounts.set(text, count + 1); // Update the count for the heading
        yield {
          depth: depth,
          text: text,
          dataId: dataID,
        };
      }
    })()
  );
  



	return { props: { post: { source: mdxSource, meta, headings, posts } } };
};


export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs().map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
