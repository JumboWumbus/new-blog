import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Articles from "src/components/Articles/Articles";
import CategorySidebar from "src/components/CategorySidebar/CategorySidebar";
import Navbar from "src/components/Navbar/Navbar";
import { SEOBlogPost } from "src/components/SEO/BlogPost_SEO";
import { SEO } from "src/components/SEO/SEO";
import { getAllPosts } from "src/lib/lib";
import { PostMeta } from "src/types";
import titleCaseString, {
	getOnlyUniqueValuesFromArray,
} from "src/utils";
import { mainUrl } from "src/utils/constants";
import { objToUrlParams } from "src/utils/url";

import s from "styles/CategoryIndex.module.scss";

export default function Blog({ posts }: { posts: PostMeta[] }) {
	const categories = posts.map((post) => post.category).flat();
	const uniqueCategories = getOnlyUniqueValuesFromArray(categories);

	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
			header: `Blog ⟶ Categories`,
			title: `Posts about a multitude of topics. None of which I'm an expert in`,
			subtitle: `I have ${posts.length} posts and counting!`,
		})}`,
		description: `Personal website of Ben Hammond`,
	};


  //TODO Add a list of buttons for the user to quicly
	return (
		<>
			<SEO
				title={"Categories of cool content"}
				description={
					"Every post on BensDen sorted by category. Look upon his works with great envy."
				}
				slug={`/blog/category`}
				previewImage={previewImage}
			/>
			<Navbar posts={posts} />

			<div className={s.wrapper}>
				<div className={s.content}>
					
					<div className={s.list}>
						{uniqueCategories.map((singleCategory: string) => {
							let postBundle = posts.filter((post) =>
								post.category.includes(singleCategory),
							);
							return (
								<div className={s.categorySection}>
									<Articles
										posts={postBundle.slice(0, 5)}
                    postCount={postBundle.length}
										title={singleCategory}
									/>
									<Link
										className={s.seeMore}
										href={`/blog/category/${singleCategory}`}>
										{`See all posts in category ${singleCategory}` }
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

//const posts = getAllPosts().filter(post => post.meta.category.includes(slug));
//posts.map(post => post.meta)

export async function getStaticProps() {
	const posts = getAllPosts().map((post) => post.meta);
	return { props: { posts } };
}
