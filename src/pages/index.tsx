import Head from "next/head";
import Image from "next/image";

import s from "styles/Home.module.scss";
import { SEO } from "src/components/SEO/SEO";
import { mainUrl } from "src/utils/constants";
import { objToUrlParams } from "src/utils/url";
import Navbar from "src/components/Navbar/Navbar";
import { getAllPostMetadata, getAllPosts } from "src/lib/lib";
import { PostMeta } from "src/types";
// import { Canvas, useFrame } from '@react-three/fiber'
// import {OrbitControls} from '@react-three/drei'
import { Suspense } from "react";
import FAQ from "src/components/FAQ/FAQ";
import ProjectCard from "src/components/ProjectCard/ProjectCard";
import Articles from "src/components/Articles/Articles";
import Link from "next/link";
import { right } from "@popperjs/core";
import ImageSlider from "src/components/ImageSlider/ImageSlider";


const faces = [
  "/BensDenThreshold_1.png",
  "/BensDenThreshold_2.png",
  "/BensDenThreshold_3.png",
  "/BensDenThreshold_4.png",
  "/BensDenThreshold_5.png",
  "/BensDenThreshold_6.png",
]

//TODO default SEO component for page titles and icon, etc...

export default function Home({ posts }: { posts: PostMeta[] }) {
  const previewImage = {
    url: `${mainUrl}/api/og?${objToUrlParams({
      header: `BensDen ⟶ My website`,
      title: `Developing, Designing, screaming...\n                          all at a high level`,
      subtitle: `The most mediocre site in the world.`,
    })}`,
    description: `Personal website of Ben Hammond`,
  };

  return (
    <>
      <SEO
        title={`BensDen | The worst place to be!`}
        description={`This is my personal website where I put all of my ideas, work and sweat.`}
        slug={``}
        previewImage={previewImage}
      />
      <Navbar posts={posts} />

      <div className={s.content}>
        <div className={`${s.intro} ${s.webSection}`}>

          <h1 className={s.topText}>Jello me Ben</h1>
          <ImageSlider images={faces} interval={4000} />
          <h1 className={s.bottomText}>This is da den</h1>

        </div>





        <div>
          <div className={s.webSection}>
            <Articles
              posts={posts
                .filter((post) => post.section.includes("project"))
                .slice(0, 5)}
              title={"Projects"}
              titleCaption={"Things I made with my own fat hands."}
              headingLink="/projects"
            />
            <Link
              className={s.seeMore}
              href={`/blog`}>
              See more projects
            </Link>


          </div>
          <hr />
          <div className={s.webSection}>
            <div>
              <Articles
                posts={posts
                  .filter((post) => post.section.includes("blog"))
                  .slice(0, 5)}
                title={"Blog"}
                titleCaption={"Filled with ramblings!"}
                headingLink="/blog"
              />
              <Link
                className={s.seeMore}
                href={`/blog`}>
                See more posts
              </Link>
            </div>
          </div>
          <hr />
          {/*TODO add a notes section and hook up to twitter maybe */}
          {/* <div className={s.webSection}>
            <div className={s.title}>
              <h1>Notes</h1>
              <h4 className={s.subtitle}>Snippets of thinks</h4>
            </div>
          </div> */}
        </div>

        <div className={s.webSection}>
          <FAQ />
        </div>

        {/* 
        <Canvas className={s.canvas} onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.outputEncoding = THREE.sRGBEncoding;

   
        }}>
       <OrbitControls enableZoom={false} enablePan={false}/>
          <ambientLight intensity={1}/>
          <directionalLight position={[-2,5,2]} intensity={1}/>
          <Suspense fallback={null}>
          <BenBox/>
          </Suspense>
      
        </Canvas> */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPostMetadata();
  return { props: { posts } };
}
