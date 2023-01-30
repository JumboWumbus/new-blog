import { Unkempt } from '@next/font/google';
import { GetStaticPaths, GetStaticProps } from 'next';
import Articles from 'src/components/Articles/Articles';
import CategorySidebar from 'src/components/CategorySidebar/CategorySidebar';
import { SEOBlogPost } from 'src/components/SEO/BlogPost_SEO';
import { SEO } from 'src/components/SEO/SEO';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import titleCaseString, { getOnlyUniqueValuesFromArray } from 'src/utils';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';

import s from 'styles/Blog.module.scss';

export default function Blog({ posts }: { posts: PostMeta[] }) {
	const categories = posts.map(post => post.category).flat();
	const uniqueCategories = getOnlyUniqueValuesFromArray(categories);

	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
			header: `Blog ⟶ Categories`,
			title: `Posts about a multitude of topics. None of which I'm an expert in`,
			subtitle: `I have ${posts.length} posts and counting!`
		})}`,
		description: `Personal website of Ben Hammond`
	}

	return (
		<>

			<SEO
				title={'Categories of cool content'} description={'Every post on BensDen sorted by category. Look upon his works with great envy.'} slug={`/blog/category`} previewImage={previewImage}
			/>
			<div className={s.wrapper}>
				<article className={s.content}>
					<div>
						{uniqueCategories.map(singleCategory => {
							let postBundle = posts.filter(post =>
								post.category.includes(singleCategory)
							);

							return (
								<Articles
									posts={postBundle}
									title={titleCaseString(singleCategory)}
									headingLink={`/blog/category/${singleCategory}`}
								/>
							);
						})}
					</div>
				</article>
			</div>
		</>
	);
}

//const posts = getAllPosts().filter(post => post.meta.category.includes(slug));
//posts.map(post => post.meta)

export async function getStaticProps() {
	const posts = getAllPosts().map(post => post.meta);
	return { props: { posts } };
}
