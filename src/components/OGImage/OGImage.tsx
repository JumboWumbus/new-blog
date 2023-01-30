
import { convertTime } from 'src/utils';


interface Props {
   header?: string;
   title?: string;
   subtitle?: string;
}

/* TODO

Maybe add 3 sections: header, postinfo and footer and do a flex space between to equally seperate them and make it look epic???

 */
export const OGImage = ({
   title,
   header,
   subtitle
}: Props) => (

   <>

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
            opacity: '0.5',
         }}></div>
         <div style={{

            position: 'absolute',
            zIndex: '-1',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: '1',
            backgroundImage: 'radial-gradient(ellipse, rgba(255,255,255,0) 10%, rgba(255,255,255,1) 80%)',
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
            paddingBottom: '2rem',
            paddingTop: '2rem'

         }}>

            {/*At the top of the image; the part of the website and the category/info, if not it's the website and my name*/}
            <h2
               style={{
                  fontSize: 30,
                  margin: 0,
               }}
            >{header ? header : `BensDen ⟶ My fat website`}</h2>


            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
               }}
            >
               <h1 style={{
                  fontSize: 70,
                  lineHeight: 1.2,
                  fontWeight: 700,
                  margin: 0,
                  whiteSpace:'pre-wrap'
               }}>
                  {/*Title of page or whatever you want to be the biggest in the OG-Image*/}
                  {title ? title : `Developing, Designing, screaming...\n                          all at a high level`}
               </h1>
               <p style={{
                  fontSize: 30,
                  lineHeight: 1,
                  fontWeight: 500,
                  
               }}>
                  {/*The stuff under the title, could be date and read time, more description or nothing*/}
                  {subtitle ? subtitle : 'The most mediocre site in the world.'}
               </p>
            </div>

            <div style={{
               display: 'flex',
               flexDirection: 'row',
               width: '100%',
               justifyContent: 'space-between',
            }}>


               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 5,
                
                  }}
               >
                  <svg
                     height={64}
                     width={64}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="-51.2 -51.2 614.4 614.4"
                     xmlSpace="preserve"
                  >
                     <g strokeWidth={0} />
                     <g
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCC"
                        strokeWidth={2.048}
                     />
                     <path
                        d="m511.878 247.973-21.488.672 21.488-.68c-2.168-69.219-31.732-131.348-77.876-175.949C387.882 27.377 324.93-.004 256.13.004c-2.718 0-5.443.046-8.176.13h.016c-69.227 2.16-131.348 31.724-175.957 77.868C27.382 124.122 0 187.074 0 255.874c0 2.709.046 5.435.13 8.16 2.168 69.22 31.732 131.347 77.875 175.949 46.113 44.632 109.065 72.02 177.865 72.013 2.694 0 5.42-.038 8.16-.13 69.227-2.16 131.355-31.724 175.957-77.876 44.64-46.121 72.021-109.065 72.013-177.857 0-2.717-.038-5.434-.122-8.16zM102.921 107.894a213.293 213.293 0 0 1 69.67-47.891c-10.961 15.77-20.336 34.426-28.045 55.304H96.089a201.287 201.287 0 0 1 6.832-7.413zm-27.229 34.77h60.112c-8.282 30.212-13.327 63.906-14.365 99.661H43.472c2.298-36.411 13.771-70.387 32.22-99.661zm-.045 226.68c-18.351-29.121-29.808-63.044-32.144-99.661h78.028c1.046 35.732 5.954 69.471 14.236 99.661h-60.12zm32.251 39.739c-4.091-3.962-7.984-8.114-11.748-12.381h48.442c4.099 11.091 8.579 21.67 13.594 31.396 4.405 8.518 9.16 16.487 14.252 23.847a213.897 213.897 0 0 1-64.54-42.862zm134.431 59.441c-5.931-.374-11.809-.946-17.603-1.801-2.404-1.573-4.809-3.282-7.213-5.236-16.381-13.313-31.778-35.831-43.694-64.784h68.51v71.821zm0-99.18h-78.15c-8.794-29.411-14.267-63.365-15.381-99.661h93.531v99.661zm0-127.019h-93.448c1.115-36.327 6.618-70.235 15.42-99.661h78.028v99.661zm0-127.019h-68.433c2.71-6.588 5.542-12.954 8.595-18.84 10.298-19.969 22.404-35.647 35.022-45.945 2.366-1.924 4.732-3.604 7.099-5.16 5.832-.862 11.74-1.48 17.717-1.863v71.808zm194.04 27.358c18.351 29.128 29.8 63.044 32.136 99.661h-78.02c-1.046-35.732-5.954-69.471-14.236-99.661h60.12zm-32.259-39.747c4.092 3.961 7.985 8.114 11.756 12.389h-48.441c-4.099-11.092-8.58-21.672-13.596-31.396-4.412-8.527-9.167-16.496-14.267-23.847a213.904 213.904 0 0 1 64.548 42.854zM269.687 43.476c5.924.374 11.801.954 17.587 1.802 2.412 1.58 4.824 3.282 7.229 5.244 16.381 13.32 31.778 35.823 43.686 64.784h-68.502v-71.83zm0 99.188h78.15c8.794 29.411 14.267 63.364 15.381 99.661h-93.531v-99.661zm0 127.019h93.448c-1.114 36.327-6.618 70.242-15.42 99.661h-78.028v-99.661zm59.838 145.851c-10.297 19.976-22.412 35.655-35.022 45.953-2.359 1.924-4.725 3.595-7.091 5.152a213.84 213.84 0 0 1-17.725 1.862v-71.799h68.426c-2.711 6.587-5.543 12.946-8.588 18.832zm79.562-11.428a213.285 213.285 0 0 1-69.655 47.884c10.962-15.771 20.328-34.419 28.037-55.288h48.449a215.304 215.304 0 0 1-6.831 7.404zm27.221-34.762h-60.105c8.29-30.206 13.336-63.906 14.374-99.661h77.952c-2.299 36.403-13.772 70.387-32.221 99.661z"
                        style={{
                           fill: "#000",
                        }}
                     /></svg>

                  <h2 style={{ margin: 0, fontSize: 30 }}>{'bensden.xyz'}</h2>
               </div>

               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 5,
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width={64}
                     height={64}
                     viewBox="0 0 25 25"

                  >
                     <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>

                  <h2 style={{ margin: 0, fontSize: 30 }}>{'@GrembloProjects'}</h2>
               </div>
            </div>

         </div>


      </div>

   </>

);

export default OGImage;