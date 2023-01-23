import { mainUrl } from "./constants";


export const relativeBlogPostUrl = (slug: string) => `/blog/post/${slug}`;

export const canonicalBlogPostUrl = (slug: string) => `${mainUrl}${relativeBlogPostUrl}`;

export interface OGImageParams {
   title?: string;
   date?: string;
   excerpt?: string;
   readingTime?: string;
}

export const relativeOgImageUrl = ({
   title,
   excerpt,
   date,
   readingTime
}: OGImageParams) => `/api/og?title=${title ?? ''}&excerpt=${excerpt}&date=${date}&readingTime=${readingTime}`;

export const OgImageUrl = (imageParams: OGImageParams) => `${mainUrl}/${relativeOgImageUrl(imageParams)}`