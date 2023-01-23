import { FunctionalComponent } from "preact";
import useFetchWebmentions from "src/pages/api/useWebMentions";
import { Webmention } from "src/types";
import CollapseList from "./CollapseList";
import Interactions from "./Interactions";
import Reply from "./Reply";

const Webmentions: FunctionalComponent<{
	source: string;
}> = ({ source }) => {
	const { isFetching, fetchErr, webmentions } =
		useFetchWebmentions(source);

	if (isFetching) {
		return (
			<>
				<h1>Webmentions</h1>

				<span>Loading...</span>
			</>
		);
	}

	if (fetchErr) {
		return (
			<>
				<h1>Webmentions</h1>
				<p>{fetchErr.message}</p>
			</>
		);
	}

	const { replies, likes, reposts, bookmarks, mentions } =
		webmentions;
	return (
		<>
			<h1>Webmentions</h1>
			<CollapseList
				open
				summary={`Replies - ${replies.length}`}
			>
				<section>
					{replies.length ? (
						replies.map((webMention: Webmention) => (
							//BUG might not work check mans code
							<Reply
								key={webMention["wm-id"]}
								reply={webMention}
							/>
						))
					) : (
						<>
							<p>{`No replies yet :((`}</p>
							<p>{`If you have a personal site, twitter, github, facebook, instagram (and many others) if you mention this article in a post, or comment on a post mentioning this article; your words will show up here`}</p>
						</>
					)}
				</section>
			</CollapseList>

			<CollapseList
				summary={`Interactions -  ${likes.length +
					reposts.length +
					bookmarks.length +
					mentions.length
					}`}
			>
				<section>
					{Boolean(reposts.length) && (
						<Interactions
							heading={`Reposts - ${reposts.length}`}
							mentions={reposts}
						/>
					)}

					{Boolean(bookmarks.length) && (
						<Interactions
							heading={`Bookmarks - ${bookmarks.length}`}
							mentions={bookmarks}
						/>
					)}

					{Boolean(mentions.length) && (
						<Interactions
							heading={`Mentions - ${mentions.length}`}
							mentions={mentions}
						/>
					)}
				</section>
			</CollapseList>
		</>
	);
};
