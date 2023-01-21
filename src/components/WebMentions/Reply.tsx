import type { FunctionalComponent } from "preact";
import { Webmention } from "src/types";

const Reply: FunctionalComponent<{ reply: Webmention }> = ({
	reply,
}) => {
	const { "wm-source": source, author, published, content } = reply;

	if (!content?.value) {
		return null;
	}

	return (
		<article>
			<header>
				<div>
					<a href={author.url}>
						<img
							alt=""
							src={author.photo}
						/>
					</a>
				</div>

				<div>
					<a
						href={author.url}
						title={author.name}
					>
						{author.name}
					</a>

					<div>
						{published && (
							<time dateTime={published}>
								{new Date(published).toLocaleDateString("en-us", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
							</time>
						)}
					</div>
				</div>
			</header>

			<p dangerouslySetInnerHTML={{ __html: content.value }}></p>

			<footer>
				{!content.isTruncated && (
					<p>
						<a
							href={source}
							title="Go to webmention source"
						>
							Source
						</a>
					</p>
				)}
			</footer>
		</article>
	);
};

export default Reply;
