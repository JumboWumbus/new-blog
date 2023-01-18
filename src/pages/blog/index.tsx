import Articles from 'src/components/Articles/Articles';
import CategorySidebar from 'src/components/CategorySidebar/CategorySidebar';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';

import s from 'styles/Blog.module.scss';

export default function Blog({ posts }: { posts: PostMeta[] }) {
	return (
		<>
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
