import { useRouter } from "next/router";
import React, { MouseEvent } from "react";

type Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

const WrapperLink: React.FC<Props> = ({
	children,
	className,
	href,
}) => {
	const router = useRouter();

	function handleClick(event: {
		target: any;
		preventDefault: () => void;
	}) {
		// Navigate to the specified URL if the target is not a link
		event.preventDefault();
		router.push(href);
	}

	return (
		<article
			className={className}
			onClick={handleClick}>
			{children}
		</article>
	);
};

export default WrapperLink;
