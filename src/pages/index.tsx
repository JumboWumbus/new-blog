import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from 'styles/Home.module.scss';
import { SEO } from 'src/components/SEO/SEO';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';
import Navbar from 'src/components/Navbar/Navbar';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';

const inter = Inter({ subsets: ['latin'] });


//TODO default SEO component for page titles and icon, etc...

export default function Home({ posts }: { posts: PostMeta[] }) {

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
      <main className={styles.main}>
        <h1>THE MIGHTY EYE OBSERVES AND LOOKS UPON YOU WITHOUT JUDGMENT... HOWEVER THE BEAST ALSO LOOKS AT YE WITHOUT PITY. ALL WHO COME TO MEET THE BEAST KNOW NOT OF THEIR FUTURE, BUT ONLY OF THEIR PAST TRANSGRESSIONS.</h1>

        <img

          src="/webImages/Me.webp"
          alt="The pretty creator"
        />

        <h2>Site is under construction, pls await further cool features xoxo</h2>

      </main>
    </>
  );
}



export async function getStaticProps() {
	const posts = getAllPosts().map(post => post.meta);
	return { props: { posts } };
}
