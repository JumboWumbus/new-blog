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
  const { data, error } = useSWR(`/api/views/${slug}`, fetcher);

  if (error) {
    return <p>Error loading data</p>; // Render an error message if there's an error fetching data
  }

  if (!data) {
    return <p className={s.views}>Loading...</p>; // Render a loading indicator while data is being fetched
  }


  return (
    <p className={s.views}>
      {data.total === 0 || null
        ? "you're the first viewer!!!"
        : data.total === 1
        ? "1 view"
        : `${data.total} views`}
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
