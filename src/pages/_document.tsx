import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
        
					href="https://twitter.com/GrembloProjects"
					rel="me"
				/>
				<link
					href="https://github.com/JumboWumbus"
					rel="me"
				/>
				<link
					href="mailto:BenHammond404@gmail.com"
					rel="me"
				/>
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


