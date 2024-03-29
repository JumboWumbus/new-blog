import "styles/globals.scss";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Footer from "src/components/Footer/Footer";

import Navbar from "src/components/Navbar/Navbar";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

/*
Next font import for non-variable fonts:

import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


Next font import for local font files:

import localFont from '@next/font/local'
const myFont = localFont({src:'/fonts/my-font.woff2})
*/

export default function App({ Component, pageProps }: AppProps) {


	return (
		<>
<div className={`${"layout"}`}>

<div className={"overlay"}></div>
			<main  className={`${inter.className} ${"content"}`}>
				<Component {...pageProps} />
				<Analytics />
				
			</main>

			<Footer fontClass={inter.className}/>
      </div>
		</>
	);
}
