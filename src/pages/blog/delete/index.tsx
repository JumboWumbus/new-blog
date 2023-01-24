import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Articles from 'src/components/Articles/Articles';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import titleCaseString, { getOnlyUniqueValuesFromArray } from 'src/utils';

import s from 'styles/test.module.scss';

export default function TagPage() {
   return (
      <>
         <div className={`${s.container} `}>
            <div className={`${s.grid} `}></div>
            <h1>{'The test title where the thing and uhhhh'}</h1>
            <p>{'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae ad ipsum accusantium maiores quia alias possimus quos? Commodi, similique?'}</p>
            <p>
               {'Dec 18, 1908'}</p>
         </div>

         <p>{`17 min read`}</p>
      </>
   );
}


