import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import OGImage from 'src/components/OGImage/OGImage';
import { convertTime } from 'src/utils';
import { oGImageHeight, oGImageWidth } from 'src/utils/constants';

export const config = {
  runtime: 'experimental-edge',
};


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

    const hasTitle = searchParams.has('title');
    const hasExcerpt = searchParams.has('excerpt');
    const hasDate = searchParams.has('date');
    const hasReadingTime = searchParams.has('readingTime');

    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Some title';

    const excerpt = hasExcerpt ? searchParams.get('excerpt')?.slice(0, 100) : 'Some excerpt';

    const date = hasDate ? searchParams.get('date')?.slice(0, 100) : '2022-12-15';



    const readingTime = hasReadingTime ? searchParams.get('readingTime')?.slice(0, 100) : 'The time';

    return new ImageResponse(
      (
        <div style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          fontFamily: '"Inter"',


        }}>
          <div style={{
            position: 'absolute',
            display: 'flex',
            zIndex: '-2',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
            backgroundPosition: 'center',
            //MAY change later if contrast bad
            opacity: '0.6',
          }}></div>
          <div style={{


            position: 'absolute',
            zIndex: '-1',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: '0.8',
            backgroundImage: 'radial-gradient(ellipse, rgba(255,255,255,0) 10%, rgba(255,255,255,1) 90%)',


          }}></div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '4rem',
            paddingLeft: '4rem',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
            <h1 style={{
              fontSize: 100,
              lineHeight: 1,
              fontWeight: 700,


            }}>{title}</h1>
            <p style={{
              fontSize: 50,
              lineHeight: 1,
              fontWeight: 500,


            }}>{excerpt}</p>
          </div>

          <div style={{
            position: 'absolute',
            display: 'flex',
            paddingRight: '4rem',
            paddingLeft: '4rem',
            bottom: 0,
            width: '100%',
            height: '100px',
            justifyContent: 'space-between',
            fontSize: '2rem',
            textTransform: 'uppercase',

            alignItems: 'center',
          }}>
            <p>{convertTime(date!)}</p>
            <p>{readingTime}</p>
          </div>


        </div>
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


