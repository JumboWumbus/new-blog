import Head from "next/head";
import { canonicalBlogPostUrl } from "src/utils/url";

interface PreviewImage {
	url: string;
	description: string;
}

interface Props {
	authorName: string;
	readingTime: string;
	date: string;
	slug: string;
	title: string;
	description: string;
	previewImage: PreviewImage;
}

export function SEOBlogPost({
	authorName,
	readingTime,
	date,
	slug,
	title,
	description,
	previewImage,
}: Props) {
	return (
		<Head>
			<meta
				name="twitter:label1"
				content="Written by"
				key="twitter:label1"
			/>
			<meta
				name="twitter:data1"
				content={authorName}
				key="twitter:data1"
			/>
			<meta
				name="twitter:label2"
				content="Estimated reading time"
				key="twitter:label2"
			/>
			<meta
				name="twitter:data2"
				content={`${readingTime}`}
				key="twitter:data2"
			/>
			<meta
				property="og:type"
				content="article"
				key="og:type"
			/>
			<meta
				property="article:published_time"
				content={date}
				key="article:published_time"
			/>
			<meta
				property="article:modified_time"
				content={date}
				key="article:modified_time"
			/>
			<meta
				property="article:author"
				content={authorName}
				key="article:author"
			/>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${canonicalBlogPostUrl(slug)}"
                        },
                        "headline": "${title}",
                        "image": [
                            "${previewImage.url}"
                        ],
                        "datePublished": "${date}",
                        "dateModified": "${date}",
                        "author": {
                            "@type": "Person",
                            "name": "${authorName}"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "${authorName}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "/favicons/android-chrome-192x192.png"
                            }
                        },
                        "description": "${description}"
                    }`,
				}}
			/>
		</Head>
	);
}

//TODO make icon for window tab
