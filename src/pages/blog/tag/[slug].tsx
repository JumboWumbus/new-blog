import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import titleCaseString, { getOnlyUniqueValuesFromArray } from 'src/utils';

import s from 'styles/Blog.module.scss';

export default function TagPage({
  slug,
  posts
}: {
  slug: string;
  posts: PostMeta[];
}) {
  return (
    <>
      <Head>
        <title>{`Tags: ${slug}`}</title>
      </Head>
      <div className={s.wrapper}>
        <aside className={s.side}>A sidebar</aside>
        <article className={s.content}>
          <div>
            <Articles
              posts={posts}
              title={`Posts with tag ${titleCaseString(slug)}`}
            />
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const posts = getAllPosts().filter(post => post.meta.tags.includes(slug));
  return {
    props: {
      slug,
      posts: posts.map(post => post.meta)
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const tags = posts.map(post => post.meta.tags).flat();
  const uniqueTags = getOnlyUniqueValuesFromArray(tags);
  const paths = uniqueTags.map(tag => ({ params: { slug: tag } }));

  return {
    paths,
    fallback: false
  };
};
