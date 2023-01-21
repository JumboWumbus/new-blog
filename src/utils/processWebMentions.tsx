import { Webmention } from "src/types";
import DOMPurify from "dompurify";

export const processWebmentions = (webmentions: Webmention[]) => {
	const likes: Webmention[] = [];
	const reposts: Webmention[] = [];
	const bookmarks: Webmention[] = [];
	const mentions: Webmention[] = [];
	const replies: Webmention[] = [];

	for (const wm of webmentions) {
		if (!wm["wm-source"]) {
			continue;
		}

		const allowedWm = [
			"like-of",
			"repost-of",
			"bookmark-of",
			"mention-of",
			"in-reply-to",
		];
		if (!allowedWm.includes(wm["wm-property"])) {
			continue;
		}

		if (!wm.author?.name || !wm.author?.url || !wm.author?.photo) {
			continue;
		}

		// See: https://github.com/cure53/DOMPurify#can-i-configure-dompurify
		const allowedHtml = {
			ALLOWED_TAGS: ["a", "b", "em", "i", "strong"],
			ALLOWED_ATTR: ["href"],
		};

		// Turns out any webmention can contain content (even a like or a
		// bookmark). So if it does have content, we sanitize it.
		if (wm.content) {
			// NOTE: It looks like when `content.value` is set, it contains the
			// `html`. So `content.value` will contain the sanitized html/text.
			wm.content.value = undefined;

			const { html, text } = wm.content;
			const content = html || text;
			if (content) {
				const src = wm["wm-source"];
				const prop = wm["wm-property"];
				const wmPropToText = {
					"like-of": "Liked",
					"repost-of": "Reposted",
					"bookmark-of": "Bookmarked",
					"mention-of": "Mentioned",
					"in-reply-to": "Replied to",
					rsvp: "RSVPd",
				};
				const txt = wmPropToText[prop] || "Mentioned";
				const exceedsMaxContentLength = content.length > 1500;

				wm.content.value =
					// A webmention can contain the entire content of the source
					// (e.g. the entire post that mentions the source).
					exceedsMaxContentLength
						? `${txt} this post at: <a href="${src}">${src}</a>.`
						: DOMPurify.sanitize(content, allowedHtml);

				// Custom field.
				wm.content.isTruncated = exceedsMaxContentLength;
			}
		}

		switch (wm["wm-property"]) {
			case "like-of": {
				likes.push(wm);
				break;
			}
			case "repost-of": {
				reposts.push(wm);
				break;
			}
			case "bookmark-of": {
				bookmarks.push(wm);
				break;
			}
			case "mention-of": {
				if (!wm.content?.value) {
					// We don't want to show a mention without content.
					break;
				}

				mentions.push(wm);
				break;
			}
			case "in-reply-to": {
				if (!wm.content?.value) {
					// We don't want to show a reply without content.
					break;
				}

				replies.push(wm);
				break;
			}
		}
	}

	return {
		likes,
		reposts,
		bookmarks,
		mentions,
		replies,
	};
};
