import { useEffect } from 'react';
import s from './TableOfContents.module.scss';

export interface Heading {
	text: string;
	depth: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			let currentActiveSection: string | null = null;
			const sections = document.querySelectorAll('section[data-id]');
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const id = entry.target.getAttribute('data-id');
							const tocItem = document.querySelector(`#toc-${id}`)!;
							if (currentActiveSection !== id) {
								if (currentActiveSection) {
									const currentActiveToc = document.querySelector(
										`#toc-${currentActiveSection}`
									)!;
									currentActiveToc.classList.remove(s.active);
								}
								currentActiveSection = id;
								tocItem.classList.add(s.active);
							}
						}
					});
				},
				{ rootMargin: '-50% 0px -50% 0px', threshold: [0] }
			);

			sections.forEach(section => {
				observer.observe(section);
			});
		}
	}, []);

	return (
		<aside className={s.wrapper}>
			<ul className={s.TOC}>
				{/*// TODO add depth styling to the headings */}

				{headings.map((heading, index) => (
					<li key={index} className={s[`depth-${heading.depth}`]}>
						<a id={`toc-${heading.text}`} href={`#${heading.text}`}>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</aside>
	);
}
