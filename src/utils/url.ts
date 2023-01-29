import { mainUrl } from "./constants";


export const relativeBlogPostUrl = (slug: string) => `/blog/post/${slug}`;

export const canonicalUrl = (slug: string) => `${mainUrl}${slug}`

export const canonicalBlogPostUrl = (slug: string) => `${mainUrl}${relativeBlogPostUrl(slug)}`;

export interface OGImageParams {
   title?: string;
   date?: string;
   excerpt?: string;
   readingTime?: string;
}

// export const relativeOgImageUrl = ({
//    title,
//    excerpt,
//    date,
//    readingTime
// }: OGImageParams) => `api/og?title=${title ?? ''}&excerpt=${excerpt}&date=${date}&readingTime=${readingTime}`;

// export const OgImageUrl = (imageParams: OGImageParams) => `${mainUrl}/${relativeOgImageUrl(imageParams)}`;

export function objToUrlParams(params: Record<string, string>) {
   return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
}