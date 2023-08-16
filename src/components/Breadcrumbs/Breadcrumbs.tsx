import { BreadCrumb } from "src/types";
import titleCaseString from "src/utils";
import RightArrow from "../SVGs/Icons/RightArrow";

import s from "./Breadcrumbs.module.scss";

interface BreadProps{
  breadcrumbArray: BreadCrumb[];
}

/** EXAMPLE of structure
 * 
 *   const crumbArray: BreadCrumb[] = [
    {displayName: `Blog`, url:`/blog`},
    {displayName: post.meta.category, url:`/blog/category/${post.meta.category}`},
    {displayName: post.meta.title, url: `/blog/post/${post.meta.slug}`},
  ] 
 * 
 */

export default function Breadcrumbs(
	props:BreadProps
) {
	//Home
	//Category Index
	//Category of current post
	// {
	//   <a href={`/blog/category/${currentCategory}`}>
	//     {titleCaseString(currentCategory)}
	//   </a>}
	return (
		<div className={s.container}>
			{props.breadcrumbArray.map((crumb, index, {length}) => {
				if(length - 1 === index){
          return(
            <span>{crumb.displayName}</span>
          )
        }
        else{
          return (
            <>
              <a href={crumb.url}>{crumb.displayName}</a>
              <RightArrow className={s.svg} />
            </>
          );
        }
			})}
		</div>
	);
}
