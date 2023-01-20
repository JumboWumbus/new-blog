import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<a
					href="https://twitter.com/GrembloProjects"
					rel="me"
				></a>
				<a
					href="https://github.com/JumboWumbus"
					rel="me"
				></a>
				<a
					href="mailto:BenHammond404@gmail.com"
					rel="me"
				></a>
				<link
					rel="webmention"
					href="https://webmention.io/bensden.xyz/webmention"
				/>
				<link
					rel="pingback"
					href="https://webmention.io/bensden.xyz/xmlrpc"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
