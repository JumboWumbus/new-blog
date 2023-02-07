import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import s from 'styles/Home.module.scss';
import { SEO } from 'src/components/SEO/SEO';
import { mainUrl } from 'src/utils/constants';
import { objToUrlParams } from 'src/utils/url';
import Navbar from 'src/components/Navbar/Navbar';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import { Canvas, useFrame } from '@react-three/fiber'
import Box from 'src/components/threeJS/Box';
import {OrbitControls} from '@react-three/drei'
import BenBox from 'src/components/threeJS/BenBox';
import { Suspense } from 'react';
import * as THREE from 'three';
import FAQ from 'src/components/FAQ/FAQ';




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
      <main className={s.main}>

        <div className={s.hero}>
          <h1>Welcome to my personal site!</h1>
        {/*Insert cube here maybe */}
        </div>

        <div>
          
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
        


      </main>
    </>
  );
}



export async function getStaticProps() {
	const posts = getAllPosts().map(post => post.meta);
	return { props: { posts } };
}
