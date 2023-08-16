import Head from "next/head";
import Articles from "src/components/Articles/Articles";
import CategorySidebar from "src/components/CategorySidebar/CategorySidebar";
import Navbar from "src/components/Navbar/Navbar";
import { SEO } from "src/components/SEO/SEO";
import { getAllPostMetadata, getAllPosts } from "src/lib/lib";
import { PostMeta } from "src/types";
import { mainUrl } from "src/utils/constants";
import { objToUrlParams } from "src/utils/url";

import s from "styles/Blog.module.scss";

export default function Projects({ posts }: { posts: PostMeta[] }) {
	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
			header: `BensDen ⟶ Projects`,
			title: `The projects I've done and information on them.`,
			subtitle: `Come take a look and be impressed.`,
		})}`,
		description: `Personal website of Ben Hammond`,
	};

	return (
		<>
			<SEO
				title={`BensDen | Projects`}
				description={`The projects I've done and information on them.`}
				slug={`/projects`}
				previewImage={previewImage}
			/>
			<Navbar posts={posts} />

			{/*TODO Add most popular section */}
			<div className={s.content}>
				<div>
					<Articles
						posts={posts
              .filter((post) => post.section.includes("project"))}
						postCount={posts
              .filter((post) => post.section.includes("project")).length}
						title={"Projects"}
					/>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const posts = getAllPostMetadata();
	return { props: { posts } };
}
