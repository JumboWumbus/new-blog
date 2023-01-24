import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import titleCaseString, { getOnlyUniqueValuesFromArray } from 'src/utils';

import s from 'styles/test.module.scss';

const container = {
   position: 'relative',
   paddingInline: '4rem',

   //REMOVE WHEN MOVING TO REAL THING
   width: '1200px',
   height: '630px',
}

/* TODO

Maybe add 3 sections: header, postinfo and footer and do a flex space between to equally seperate them and make it look epic???

 */



const gridStyle = {
   position: 'absolute',
   zIndex: -2,
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
   backgroundPosition: 'center',
   opacity: '60%', //May change later depending on contrast

};

const fade = {

   content: '',
   position: 'absolute',
   zIndex: -1,
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
   background: 'radial-gradient(transparent 10%, #ffffff 90%)'

};

const postInfoContainer = {

   display: 'flex',
   flexDirection: 'column',
   width: '100%',
   height: '100%',
   alignItems: 'flex-start',
   justifyContent: 'center'
}

const postTitle = {
   fontSize: '5rem',
   fontWeight: 700,

}

const footer = {
   position: 'absolute',
   bottom: 0,
   width: '100%',
   height: '100px',
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: '2rem',
   textTransform: 'uppercase',
   fontWeight: 700,
   alignItems: 'center',
}

export default function TagPage() {
   return (
      <>
         <div style={container}>
            <div style={gridStyle}></div>
            <div style={fade}></div>
            <div style={postInfoContainer}>
               <h1 style={postTitle}>{'The tegt titye where tphe thing anduhhhh'}</h1>
               <p>{'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae ad ipsum accusantium maiores quia alias possimus quos? Commodi, similique?'}</p>
            </div>

            <div style={footer}>
               <p>{'Dec 18, 1908'}</p>
               <p>{`17 min read`}</p>
            </div>

         </div>


      </>
   );
}


