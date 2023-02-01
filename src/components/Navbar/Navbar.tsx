import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import s from './Navbar.module.scss';
import NavMenu from './NavMenu';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen(!isOpen);
		console.log(isOpen);
	}
	// TODO Add Mobile Navigation (look at josh comeu's blog)
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
						<NavMenu/>
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
