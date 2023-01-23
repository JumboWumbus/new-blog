import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import OGImage from 'src/components/OGImage/OGImage';
import { oGImageHeight, oGImageWidth } from 'src/utils/constants';

export const config = {
  runtime: 'experimental-edge',
};


export default async function handler(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const hasExcerpt = searchParams.has('excerpt');
    const hasDate = searchParams.has('date');
    const hasReadingTime = searchParams.has('readingtime');

    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Some title';

    const excerpt = hasExcerpt ? searchParams.get('excerpt')?.slice(0, 100) : 'Some excerpt';

    const date = hasDate ? searchParams.get('date')?.slice(0, 100) : '2022-12-15';

    console.log(date)

    const readingTime = hasReadingTime ? searchParams.get('readingtime')?.slice(0, 100) : 'The time';

    return new ImageResponse(
      (
        <OGImage title={title!} date={date!} excerpt={excerpt!} readMinutes={readingTime!} />
      ),
      {
        width: oGImageWidth,
        height: oGImageHeight,
      }
    )
  }
  catch (e) {
    return new Response('Failed to generate og image :(', {
      status: 500,
    })
  }
}


