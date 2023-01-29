

export default function Test() {

   return (
      <div style={{
         position: 'relative',
         display: 'flex',
         width: '1200px',
         height: '630px',
         backgroundColor: 'white',
         fontFamily: '"Inter"',
      }}>

         {/*Background of the image, mines is fancy and cool, it was hell to figure out*/}
         <div style={{
            position: 'absolute',
            display: 'flex',
            zIndex: '-2',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
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

         {/*Image content is split into 3 columns and spaced evenly; top text, title/description, links*/}
         <div style={{
            position: 'absolute',
            zIndex: '1',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: '4rem',
            paddingLeft: '4rem',

         }}>

            {/*At the top of the image; the part of the website and the category/info, if not it's the website and my name*/}
            <h2>{'BensDen ⟶ Ben Hammond'}</h2>


            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  alignItems: 'flex-start',
               }}
            >
               <h1 style={{
                  fontSize: 100,
                  lineHeight: 1,
                  fontWeight: 700,
               }}>
                  {/*Title of page or whatever you want to be the biggest in the OG-Image*/}
                  {'Developing, Designing, screaming; all at a high level'}
               </h1>
               <p style={{
                  fontSize: 50,
                  lineHeight: 1,
                  fontWeight: 500,
               }}>
                  {/*The stuff under the title, could be date and read time, more description or nothing*/}
                  {'The most mediocre site in the world.'}
               </p>
            </div>

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
            {/*Items at the bottom of the OG-Image, a good place to put names, handles, links or whatever*/}

            <p>{/*INSERT bottom tags HERE*/}</p>
            <p>{/*INSERT bottom tags HERE*/}</p>
            <p>{/*INSERT bottom tags HERE*/}</p>
            <p>{/*INSERT bottom tags HERE*/}</p>
         </div>




      </div>
   )
}