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

//TODO default SEO component for page titles and icon, etc...

export default function Home({ posts }: { posts: PostMeta[] }) {
	const previewImage = {
		url: `${mainUrl}/api/og?${objToUrlParams({
			header: `BensDen ⟶ My website`,
			title: `About me, who I am and what I do 😎`,
			subtitle: `The most mediocre site in the world.`,
		})}`,
		description: `Personal website of Ben Hammond`,
	};

	return (
		<>
			<SEO
				title={`BensDen | About the Ben`}
				description={`About me and what I do.`}
				slug={`/about`}
				previewImage={previewImage}
			/>
			<Navbar posts={posts} />

			<div className={s.content}>
				<h1>Under construction...</h1>
        <hr/>
        <p>Still trying to figure out how best to describe myshelf</p>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const posts = getAllPostMetadata();
	return { props: { posts } };
}
