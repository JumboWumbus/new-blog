import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import Navbar from 'src/components/Navbar/Navbar';
import { SEO } from 'src/components/SEO/SEO';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import titleCaseString, { getOnlyUniqueValuesFromArray } from 'src/utils';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';

import s from 'styles/Blog.module.scss';

export default function TagPage({
  slug,
  posts
}: {
  slug: string;
  posts: PostMeta[];
}) {

  const previewImage = {
    url: `${mainUrl}/api/og?${objToUrlParams({
      header: `Blog ⟶ ${slug}`,
      title: `Posts about ${slug} on BensDen: Come take a look!`,
      subtitle: `I have ${posts.length} posts about ${slug} and counting!`
    })}`,
    description: `Personal website of Ben Hammond`
  }

  return (
    <>
      
      <SEO
          title={`Posts about ${slug} on BensDen`} description={`Posts under the topic of ${slug} on BensDen. Hopefully interesting and not bad.`} slug={`/blog/category/${slug}`} previewImage={previewImage}
        />
        <Navbar posts={posts}/>
      <div className={s.wrapper}>
        <article className={s.content}>
          <div>
            <Articles posts={posts.filter(post => post.category.includes(slug))} title={titleCaseString(slug)} />
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const posts = getAllPosts();
  return {
    props: {
      slug,
      posts: posts.map(post => post.meta)
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const categories = posts.map(post => post.meta.category).flat();
  const uniqueCategories = getOnlyUniqueValuesFromArray(categories);
  const paths = uniqueCategories.map(category => ({
    params: { slug: category }
  }));

  return {
    paths,
    fallback: false
  };
};
