import Link, { LinkProps } from 'next/link';
import NextLink from 'next/link';
import { PostMeta } from 'src/types';

import titleCaseString, {
	convertTime,
	getOnlyUniqueValuesFromArray,
	slugify
} from 'src/utils';
import Author from '../SVGs/Icons/Author';
import Date from '../SVGs/Icons/Date';
import ReadTime from '../SVGs/Icons/ReadTime';
import WrapperLink from '../ArticleItemWrapper/ArticleLinkWrapper';

import s from './ArticleItem.module.scss';

export default function ArticleItem({ post }: { post: PostMeta }) {
	let tagList = post.tags;
	let uniqueTags = getOnlyUniqueValuesFromArray(tagList);

	const handleChildClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	return (
		<WrapperLink
			href={`/blog/post/${post.slug}`}
			className={s.article}
		>
			{/* <Link className={s.img} href={`blog/post/${post.slug}`}>
        <img src={post.imageURL} alt='Image for article' />
      </Link> */}

			<div>
				<div className={s.postMeta}>
					<div className={s.metaInfo}>
						<span className={s.icon}>
							<Date
								style={{
									position: 'relative',
									top: '3px'
								}}
								width={18}
								height={18}
							/>
						</span>
						<span className={s.text}>{convertTime(post.date)}</span>
					</div>

					<div className={s.metaInfo}>
						<span className={s.icon}>
							<Author
								style={{
									position: 'relative',
									top: '2px'
								}}
								width={18}
								height={18}
							/>
						</span>
						<span className={s.text}>{post.author}</span>
					</div>

					<div className={s.metaInfo}>
						<span className={s.icon}>
							<ReadTime
								style={{
									position: 'relative',
									top: '5px'
								}}
								width={18}
								height={18}
							/>
						</span>
						<span className={s.text}>{post.readingTime}</span>
					</div>
				</div>

				<Link
					onClick={handleChildClick}
					className={s.title}
					href={`/blog/post/${post.slug}`}
				>
					{titleCaseString(post.title)}
				</Link>

				<p className={s.excerpt}>{post.excerpt}</p>
			</div>

			<div>
				<ul className={s.tags}>
					{uniqueTags.map(tag => (
						<li>
							<Link
								onClick={handleChildClick}
								className={s.tagItem}
								key={`${post} ${tag}`}
								href={`/blog/tag/${tag}`}
							>
								{tag}
							</Link>
						</li>
					))}
				</ul>

				<Link className={s.readArticle} href={`/blog/post/${post.slug}`}>
					<button>Read Article</button>
				</Link>
			</div>
		</WrapperLink>
	);
}
