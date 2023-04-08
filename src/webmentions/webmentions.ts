
import { z } from 'zod';

/*
ALL thanks goes to https://github.com/pkerschbaum for being an absolute G-unit and giving a concise and easy to follow setup that's used on their own personal blog site https://pkerschbaum.com/


I am but an idiot with 0 brain cells and a rabid desire to get webmentions to work on my yuck arse site. This is everything I wanted webmentions to be and more.

*/


const schema_webmentionsResponse = z.object({
  links: z.array(z.unknown()),
});
const schema_webmention = z.object({
  id: z.number(),
  data: z.object({
    author: z.object({
      name: z.string().min(1),
      photo: z.string().url(),
    }),
    url: z.string().url(),
    content: z.string(),
    published_ts: z.number().int(),
  }),
  activity: z.object({
    type: z.enum(['repost', 'reply']),
  }),
});
export type Webmention = z.infer<typeof schema_webmention>;

export async function fetchWebmentions(target: string): Promise<{ webmentions: Webmention[] }> {
  const webMentionsURL = new URL('https://webmention.io/api/mentions');
  webMentionsURL.searchParams.set('page', '0');
  webMentionsURL.searchParams.set('per-page', '50');
  webMentionsURL.searchParams.set('sort-by', 'published');
  webMentionsURL.searchParams.set('target', target);
  const response = await fetch(webMentionsURL);
  const json: unknown = await response.json();
  const { links } = schema_webmentionsResponse.parse(json);
  const usableWebmentions: Webmention[] = [];
  for (const link of links) {
    const parseResult = schema_webmention.safeParse(link);
    if (parseResult.success) {
      usableWebmentions.push(parseResult.data);
    }
  }
  return { webmentions: usableWebmentions };
}