import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import OGImage from 'src/components/OGImage/OGImage';
import { convertTime } from 'src/utils';
import { oGImageHeight, oGImageWidth } from 'src/utils/constants';
import z from 'zod'

export const config = {
  runtime: 'experimental-edge',
};

interface Props {
  header?: string;
  title?: string;
  subtitle?: string;
}


//TODO add type safety from previous versions of this code (check github history)

/*
DEFAULT TYPE EXAMPLE USE 

  get content from query params
  const title = searchParams.has('title')
    ? searchParams.get('title')
    : 'OG Image';

  const description = searchParams.has('description')
    ? searchParams.get('description')
    : 'Add `title` and `description` to the URL as query params to populate the card with your own content.';

*/


// Make sure the font exists in the specified path:
const regular = fetch(new URL('../../assets/fonts/Inter-Regular.woff', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

// Make sure the font exists in the specified path:
const bold = fetch(new URL('../../assets/fonts/Inter-Bold.woff', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);


export default async function handler(req: NextRequest) {
  const interReg = await regular;
  const interBold = await bold;

  try {

    const { searchParams } = new URL(req.url);

    //If any of these search parameters don't exist, they will be replaced with a default, this is what I use to build the default og-image
    const header = searchParams.get('header');
    const title = searchParams.get('title');
    const subtitle = searchParams.get('subtitle');
    

    return new ImageResponse(
      (
        <OGImage title={title!} header={header!} subtitle={subtitle!}/>
        
      ),
      {
        width: oGImageWidth,
        height: oGImageHeight,
        fonts: [
          {
            name: 'Inter',
            data: interReg,
            style: 'normal',
            weight: 500
          },

          {
            name: 'Inter',
            data: interBold,
            style: 'normal',
            weight: 700
          },
        ]
      }
    )
  }
  catch (e) {
    return new Response('Failed to generate og image :(', {
      status: 500,
    })
  }
}


