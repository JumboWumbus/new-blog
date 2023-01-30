import Head from 'next/head';
import { mainUrl, siteName, twitterHandle } from 'src/utils/constants';
import { canonicalBlogPostUrl, canonicalUrl } from 'src/utils/url';

interface PreviewImage {
   url: string;
   description: string;
}


interface Props {
   title: string;
   description: string;
   slug: string;
   previewImage?: PreviewImage;
}

export function SEO({ title, description, slug, previewImage }: Props) {
   console.log(`og zone: ${previewImage?.url}`)
   return (
      <Head>
         <title>{title}</title>
         <meta name="description" content={description} key="description" />
         <link
            rel="canonical"
            href={canonicalUrl(slug)}
            key="canonical"
         />

         <meta property="og:type" content="website" key="og:type" />
         <meta property="og:site_name" content={siteName} key="og:site_name" />
         <meta property="og:locale" content="en" key="og:locale" />
         <meta
            property="og:url"
            content={canonicalUrl(slug)}
            key="og:url"
         />
         <meta property="og:title" content={title} key="og:title" />
         <meta
            property="og:description"
            content={description}
            key="og:description"
         />
         <meta property="og:image" content={previewImage?.url} key="og:image" />
         <meta
            property="og:image:alt"
            content={previewImage?.description}
            key="og:image:alt"
         />
         <meta property="og:image:width" content="1200" key="og:image:width" />
         <meta property="og:image:height" content="630" key="og:image:height" />

         <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter:card"
         />
         <meta name="twitter:title" content={title} key="twitter:title" />
         <meta
            name="twitter:description"
            content={description}
            key="twitter:description"
         />
         <meta name="twitter:site" content={twitterHandle} key="twitter:site" />
         <meta name="twitter:creator" content={twitterHandle} key="twitter:creator" />
      </Head>
   );
}