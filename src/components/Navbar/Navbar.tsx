

import Link from 'next/link';
import { useState } from 'react';
import { PostMeta } from 'src/types';


import s from './Navbar.module.scss';
import NavMenu from './NavMenu';

const Navbar = ({posts}:{posts: PostMeta[]}) => {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen(!isOpen);
		console.log(isOpen);
	}
	// TODO Add Mobile Navigation (look at josh comeu's blog)
	//TODO Fix navmenu getting metadata CANNOT get data from files at build time via getStaticProps, must find another way
	return (
		<div>
			<div className={s.container}>
				<header className={s.navBar}>
					<div className={s.leftNav}>
						<div className={s.logoContainer}>
							<Link href={'#'}>
								<h1 className={s.logo}>benSden</h1>
							</Link>
						</div>
						<NavMenu posts={posts}/>
					</div>
					<div className={s.rightNav}>
						<p>Other stuff n icons</p>
					</div>
				</header>
			</div>
		</div>
	);
};

export default Navbar;
