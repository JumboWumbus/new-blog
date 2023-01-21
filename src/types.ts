export interface PostMeta {
	excerpt: string;
	summary: string;
	slug: string;
	title: string;
	author: string;
	tags: string[];
	category: string;
	date: string;
	imageURL: string;
	readingTime: string;
}

export type Webmention = {
	type: "entry";
	author: {
		type: "card";
		name: string;
		photo: string;
		url: string;
	};
	url: string;
	published: null | string;
	"wm-received": string;
	"wm-id": number;
	"wm-source": string;
	"wm-target": string;
	"wm-private": boolean;
	syndication?: string[];
	summary?: {
		"content-type": "text/plain";
		value: "Figuring things out one step at a time.";
	};
	content?: {
		"content-type"?: string;
		value?: string;
		html: string;
		text: string;

		// Custom field.
		isTruncated?: boolean;
	};
	rels?: {
		canonical: string;
	};
} & (
	| {
			"wm-property": "like-of";
			"like-of": string;
	  }
	| {
			"wm-property": "repost-of";
			"repost-of": string;
	  }
	| {
			"wm-property": "bookmark-of";
			"bookmark-of": string;
	  }
	| {
			"wm-property": "mention-of";
			"mention-of": string;
	  }
	| {
			"wm-property": "in-reply-to";
			"in-reply-to": string;
	  }
	| {
			"wm-property": "rsvp";
	  }
);
