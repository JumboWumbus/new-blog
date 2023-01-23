import { useEffect, useState } from "react";
import { Webmention } from "src/types";
import { processWebmentions } from "src/utils/processWebMentions";

function useFetchWebmentions(source: string) {
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [fetchErr, setFetchErr] = useState<null | Error>(null);
	const [webmentions, setWebmentions] = useState<{
		likes: Webmention[];
		reposts: Webmention[];
		bookmarks: Webmention[];
		mentions: Webmention[];
		replies: Webmention[];
	}>({
		likes: [],
		reposts: [],
		bookmarks: [],
		mentions: [],
		replies: [],
	});

	useEffect(() => {
		setIsFetching(true);
		setFetchErr(null);

		// See: https://github.com/aaronpk/webmention.io#api
		// NOTE: the trailing "/" for a target (source) is required!
		const api = "https://webmention.io/api/mentions.jf2";
		const url = `${api}?target=${source}/&per-page=999`;

		const controller = new AbortController();

		fetch(url, {
			signal: controller.signal,
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}

				return res.json();
			})
			.then(
				(feed: {
					type: "feed";
					name: "Webmentions";
					children: Webmention[];
				}) => {
					return feed.children;
				}
			)
			.then(processWebmentions)
			.then((processed) => {
				setWebmentions(processed);
			})
			.catch((err) => {
				setFetchErr(new Error(`Failed to get webmentions: ${err}`));
			})
			.finally(() => {
				setIsFetching(false);
			});

		return () => {
			controller.abort();
		};
	}, [source]);

	return { isFetching, fetchErr, webmentions };
}

export default useFetchWebmentions;
