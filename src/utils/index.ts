import { useEffect, useState } from "react";

export function sortByDate(
	a: { frontmatter: { date: string | number | Date } },
	b: { frontmatter: { date: string | number | Date } }
) {
	return (
		new Date(b.frontmatter.date).valueOf() -
		new Date(a.frontmatter.date).valueOf()
	); //new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
}

export function slugify(title: string) {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");
}

export function convertTime(time: string | number | Date) {
	return new Date(time).toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function getOnlyUniqueValuesFromArray(array: any[]) {
	return array.filter((value, index, self) => {
		return self.indexOf(value) === index;
	});
}

/*
 * Title Caps
 *
 * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */

export default function titleCaseString(title: string) {
	var small =
		"(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
	var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

	var parts = [],
		split = /[:.;?!] |(?: |^)["Ò]/g,
		index = 0;

	while (true) {
		var m = split.exec(title);

		parts.push(
			title
				.substring(index, m ? m.index : title.length)
				.replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function (all) {
					return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
				})
				.replace(RegExp("\\b" + small + "\\b", "ig"), lower)
				.replace(
					RegExp("^" + punct + small + "\\b", "ig"),
					function (all, punct, word) {
						return punct + upper(word);
					}
				)
				.replace(RegExp("\\b" + small + punct + "$", "ig"), upper)
		);

		index = split.lastIndex;

		if (m) parts.push(m[0]);
		else break;
	}

	return parts
		.join("")
		.replace(/ V(s?)\. /gi, " v$1. ")
		.replace(/(['Õ])S\b/gi, "$1s")
		.replace(/\b(AT&T|Q&A)\b/gi, function (all) {
			return all.toUpperCase();
		});
}

function lower(word: string) {
	return word.toLowerCase();
}

function upper(word: string) {
	return word.substring(0, 1).toUpperCase() + word.substring(1);
}

export async function getHeadings(source: string) {
	// Get each line individually, and filter out anything that
	// isn't a heading.
	const headingLines = source.split("\n").filter((line) => {
		return line.match(/^###*\s/);
	});

	// Transform the string '## Some text' into an object
	// with the shape '{ text: 'Some text', level: 2 }'
	return headingLines.map((raw) => {
		const text = raw.replace(/^###*\s/, "");
		// I only care about h2 and h3.
		// If I wanted more levels, I'd need to count the
		// number of #s.
		const level = raw.slice(0, 3) === "###" ? 3 : 2;

		return { text, level };
	});
}

export type WebMentionsCollection = {
	likes: any;
	reposts: any;
	mentions: any;
};

export const useWebMentions = (
	url?: string
): WebMentionsCollection => {
	const [mentions, setMentions] = useState<
		WebMentionsCollection | undefined
	>(undefined);
	useEffect(() => {
		const wmUrl =
			"https://webmention.io/api/mentions.jf2?bensden.xyz&token=gHoe7aABKHTcUEgBAOkFlw";

		// Check if the url has been passed, if so use as the target url otherwise get all mentions
		const target = url ? `${wmUrl}&target=${url}` : wmUrl;

		fetch(target)
			.then((response) => response.json())
			.then((mentions) => {
				if (mentions.children) {
					const mentionsWithoutLikeOrReposts =
						mentions.children.filter(
							(mention: { [x: string]: string }) =>
								mention["wm-property"] !== "like-of" &&
								mention["wm-property"] !== "repost-of"
						);
					const totalLike = mentions.children.filter(
						(mention: { [x: string]: string }) =>
							mention["wm-property"] === "like-of"
					);
					const totalRepost = mentions.children.filter(
						(mention: { [x: string]: string }) =>
							mention["wm-property"] === "repost-of"
					);

					const webMentions: WebMentionsCollection = {
						likes: totalLike,
						reposts: totalRepost,
						mentions: mentionsWithoutLikeOrReposts,
					};
					setMentions(webMentions);
				}
			});
	}, []);
	//@ts-ignore
	return mentions;
};
