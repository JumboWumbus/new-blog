import titleCaseString from 'src/utils';
import RightArrow from '../Icons/RightArrow';

import s from './Breadcrumbs.module.scss';

export default function Breadcrumbs({
	currentCategory
}: {
	currentCategory: string;
}) {
	//Home
	//Category Index
	//Category of current post

	return (
		<div className={s.container}>
			<a href='/blog'>Blog</a>
			<RightArrow className={s.svg} />
			<a href='/blog/category'>Category</a>
			<RightArrow className={s.svg} />
			<a href={`/blog/category/${currentCategory}`}>
				{titleCaseString(currentCategory)}
			</a>
		</div>
	);
}
