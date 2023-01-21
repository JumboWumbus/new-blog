import { Webmention } from "src/types";
import { FunctionalComponent, VNode } from "preact";

const Interactions: FunctionalComponent<{
	heading: string;
	mentions: any;
}> = ({ heading, mentions }) => {
	return (
		<div>
			<span>{heading}</span>

			<ul>
				{mentions.map((webMention: Webmention) => {
					return (
						<li key={webMention["wm-id"]}>
							<a
								href={webMention["wm-source"]}
								title="Go to webmention source"
							>
								<img
									alt=""
									src={webMention.author.photo}
								/>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Interactions;
