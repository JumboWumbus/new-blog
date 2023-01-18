// extend your interface to be sure your heading element can have stuff like a className and children
interface Element_Props extends React.HTMLAttributes<HTMLElement> {
	//Define what tag the element will have in the HTML code (Paragraph, heading, etc...)
	htmlTag: React.ElementType;
}

export const TextElement: React.FC<Element_Props> = ({
	htmlTag,
	children,
	className
}) => {
	const Element = htmlTag; //Pass prop as Tag
	return <Element className={className}>{children}</Element>;
};
