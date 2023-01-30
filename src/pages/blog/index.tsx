import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import CategorySidebar from 'src/components/CategorySidebar/CategorySidebar';
import { SEO } from 'src/components/SEO/SEO';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';

import s from 'styles/Blog.module.scss';

export default function Blog({ posts }: { posts: PostMeta[] }) {

	//For default OG image leave all url params blank
	const previewImage = {
		url: `${mainUrl}/api/og`,
		description: `Personal website of Ben Hammond`
	 }

	return (
		<>
			<Head>
				<title>{'BensDen | The worst place to be!'}</title>
				<SEO
					title={`Blog page`} description={`Blog section of the website`} slug={`/blog`} previewImage={previewImage}
				/>
			</Head>
			<div className={s.wrapper}>
				<div className={s.content}>
					<div>
						<Articles posts={posts} title={'Most recent Posts'} />
					</div>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const posts = getAllPosts()
		.slice(0, 9)
		.map(post => post.meta);
	return { props: { posts } };
}
