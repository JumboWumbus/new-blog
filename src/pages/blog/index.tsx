import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import CategorySidebar from 'src/components/CategorySidebar/CategorySidebar';
import Navbar from 'src/components/Navbar/Navbar';
import { SEO } from 'src/components/SEO/SEO';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';

import s from 'styles/Blog.module.scss';

export default function Blog({ posts }: { posts: PostMeta[] }) {

	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
		  header: `BensDen ⟶ My website`,
		  title: `Developing, Designing, screaming...\n                          all at a high level`,
		  subtitle: `The most mediocre site in the world.`
		})}`,
		description: `Personal website of Ben Hammond`
	 }

	return (
		<>
			
			<SEO
          title={`BensDen | The worst place to be!`} description={`This is my personal website where I put all of my ideas, work and sweat.`} slug={``} previewImage={previewImage}
        />
			<Navbar posts={posts}/>



				<div className={s.content}>
					<div>
						<Articles posts={posts.slice(0, 9)} title={'Most recent Posts'} />
					</div>
				</div>

		</>
	);
}

export async function getStaticProps() {
	const posts = getAllPosts()
		.map(post => post.meta);
	return { props: { posts } };
}
