import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAllPosts } from 'src/lib/lib';
import { PostMeta } from 'src/types';
import { getOnlyUniqueValuesFromArray } from 'src/utils';

import s from './NavMenu.module.scss';

//TODO Fix navbar and make it epic:

//https://cal.com/pricing


//TODO set a limit for categories and display > ...34 more | at the end

//TODO add tags section with similar setup as above

//TODO figure out where useful links, music/movie reviews are going to go

export default function NavMenu({posts}:{posts:PostMeta[]}) {

  const categories = posts.map(post => post.category).flat();
	const uniqueCategories = getOnlyUniqueValuesFromArray(categories);

  const tags = posts.map(post => post.tags).flat();
	const uniqueTags = getOnlyUniqueValuesFromArray(tags);

  const router = useRouter();

  return (
    <NavigationMenu.Root
      className={s.container}
      orientation="horizontal"
    >
      <NavigationMenu.List className={s.list}>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={`${s.button} ${s.firstButton}`} onClick={()=>router.push('/blog')}>
            Blog
          </NavigationMenu.Trigger>
          
            <NavigationMenu.Content className={s.content}>
              <div>
              <h1 className={s.title}>Find posts via:</h1>
              <div className={s.section}>
                <Link className={s.header} href={'/blog/category'}>Recent</Link>
                  <div className={`${s.recentPostList} ${s.list}`}>
                    {posts.slice(0, 5).map((post)=>{
                      return(
                      <a href={`/blog/post/${post.slug}`} className={s.recentPostItem}><p>{post.title}</p></a>
                      )
                    })}
                  </div>
              </div>

              <hr className={s.horizontalLine} />
              <div className={s.section}>
                <Link className={s.header} href={'/blog/category'}>Category</Link>
                  <div className={s.list}>
                    {uniqueCategories.map((singleCategory: string) => {
                      let postBundle = posts.filter((post) =>
                        post.category.includes(singleCategory)
                      );
                      return (
                        <a href={`/blog/category/${singleCategory}`} className={s.sectionLink}>
                        <p className={s.linkTitle}>{singleCategory}</p>
                        <p className={s.linkNumber}>{postBundle.length}</p>
                        </a>
                      );
                    })}
                  </div>
              </div>
              <hr className={s.horizontalLine} />
              <div className={s.section}>
              <p className={s.tagHeader}>Popular tags</p>
                  <div className={s.list}>
                    {uniqueTags.map((singleTag: string) => {
                      let postBundle = posts.filter((post) =>
                        post.tags.includes(singleTag)
                      );
                      return (
                        <a href={`/blog/tag/${singleTag}`} className={`${s.sectionLink} ${s.tagLink}`}>
                        <p className={s.linkTitle}>{singleTag}</p>
                        <p className={s.linkNumber}>{postBundle.length}</p>
                        </a>
                      );
                    })}
                  </div>
              </div>


              </div>
            </NavigationMenu.Content>
  
          
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={s.button}>
            ?????
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={s.content}>
          Currently planning/crafting extra content and sections to go in here, check back later for some fat and cool stuff.
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={s.button}>
            ?????
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={s.content}>
            Currently planning/crafting extra content and sections to go in here, check back later for some fat and cool stuff. 
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={`${s.button} ${s.lastButton}`}>
            About
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator" />
      </NavigationMenu.List>

      <NavigationMenu.Viewport className={s.viewport} />
    </NavigationMenu.Root>
  );
}

