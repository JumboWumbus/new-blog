import { useEffect } from "react";
import s from "./TableOfContents.module.scss";

export interface Heading {
  text: string;
	depth: number;
	dataId: string;
}

export default function TableOfContents({
  headings,
  headingDepth,
}: {
  headings: Heading[];
  headingDepth: number;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let currentActiveSection: string | null = null;
      const root = document.querySelector("blogContainer");
      const sections = document.querySelectorAll("section[data-id]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-id");
              const tocItem = document.querySelector(`#toc-${id}`);
              if (tocItem) {
                if (currentActiveSection !== id) {
                  if (currentActiveSection) {
                    const currentActiveToc = document.querySelector(
                      `#toc-${currentActiveSection}`
                    );
                    if (currentActiveToc) {
                      currentActiveToc.classList.remove(s.active);
                    }
                  }
                  currentActiveSection = id;
                  tocItem.classList.add(s.active);
                }
              }
            }
          });
        },
        {
          root: root,
          rootMargin: "-50% 0px -50% 0px",
          threshold: [0],
        }
      );
  
      sections.forEach((section) => {
        observer.observe(section);
      });
    }
  }, []);

  const filteredHeadings = headings.filter(
    (heading) => heading.depth <= (headingDepth)
  );

  console.log("Da epic depth:" + headingDepth)

  return (
    <aside className={s.wrapper}>
      <ul className={s.TOC}>
        {filteredHeadings.map((heading, index) => (
          <li key={index} className={s[`depth-${heading.depth}`]}>
            <a id={`toc-${heading.dataId}`} href={`#${heading.dataId}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
