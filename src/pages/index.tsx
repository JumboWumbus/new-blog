import Head from 'next/head';
import Image from 'next/image';

import s from 'styles/Home.module.scss';
import { SEO } from 'src/components/SEO/SEO';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';
import Navbar from 'src/components/Navbar/Navbar';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
// import { Canvas, useFrame } from '@react-three/fiber'
// import {OrbitControls} from '@react-three/drei'
import { Suspense } from 'react';
import * as THREE from 'three';
import FAQ from 'src/components/FAQ/FAQ';
import ProjectCard from 'src/components/ProjectCard/ProjectCard';
import Articles from 'src/components/Articles/Articles';
import Link from 'next/link';







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

<div className={s.content}>
        {/* <div className={s.hero}>
          <h1>Welcome to my personal site!</h1>
          <p>{`I post stuff about everything I'm doing and what I think might help others. I'm planning to use this as a centralized archive of all of my works.`}</p>

          </div> 
        
        */}

  <div>

{/*TODO Manually add projects section to highlight cool things I've done */}
          {/* <div className={s.webSection}>
            <div className={s.title}>
              <h1>Projects</h1>
              <h4 className={s.subtitle}>Making things badly</h4>
            </div>

            <ProjectCard/>
          </div> */}


          <div className={s.webSection}>
            
            <div>
              <Articles posts={posts.slice(0, 5)}  title={"Blog zone"} titleCaption={"Filled with ramblings!"}/>
              <Link className={s.seeMore} href={`/blog`}>See more posts</Link>
            </div>
          </div>



{/*TODO add a notes section and hook up to twitter maybe */}
          {/* <div className={s.webSection}>
            <div className={s.title}>
              <h1>Notes</h1>
              <h4 className={s.subtitle}>Snippets of thinks</h4>
            </div>
          </div> */}
          
        </div>

        <div className={s.FAQ}>
        <FAQ/>
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
	const posts = getAllPosts().map(post => post.meta);
	return { props: { posts } };
}
