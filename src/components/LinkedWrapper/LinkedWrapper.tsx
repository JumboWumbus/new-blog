import { useRouter } from 'next/router';

type Props = {
	tag: keyof JSX.IntrinsicElements;

	href: string;
	children: React.ReactNode;
	className?: string;
};

const WrapperLink: React.FC<Props> = ({ tag, children, className, href }) => {
	const router = useRouter();
	const Element = tag;

	function handleClick(event: { target: any; preventDefault: () => void }) {
		if (event.target instanceof HTMLAnchorElement) {
			// Do nothing if the target is a link
			return;
		}

		// Navigate to the specified URL if the target is not a link
		event.preventDefault();
		router.push(href);
	}

	return (
		<Element className={className} onClick={handleClick}>
			{children}
		</Element>
	);
};

export default WrapperLink;
