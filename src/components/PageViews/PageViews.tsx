import useSWR from "swr";
import { FC } from "react";

import s from "./PageViews.module.scss";

interface PageViewsProps {
	slug: string;
}

const fetcher = async (input: RequestInfo) => {
	const res: Response = await fetch(input);
	return await res.json();
};

const PageViews: FC<PageViewsProps> = ({ slug }) => {
	const { data } = useSWR(`/api/views/${slug}`, fetcher);

	return (
		<p className={s.views}>
			{data?.total
				? `${data.total} views`
				: `you're the first viewer!!!`}
		</p>
	);
};

export default PageViews;

// export default function PageViews({ slug }: {st}) {
// 	const { data, error } = useSWR(`/api/pageVisits/${slug}`, async (input) => {
// 		const res = await fetch(input);
// 		return res.json();
// 	});
// 	return (
// 			{data ?
// 				<p className="font-medium text-gray-600 dark:text-gray-300 mr-1">{data?.views?.toLocaleString()} views</p> :
// 				<p className="font-medium text-gray-600 dark:text-gray-300 mr-1 animate-pulse">• views</p>}
// 		</div>
// 	)
// }
