import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import s from './Navbar.module.scss';

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
						<nav className={s.navLinks}>
							<ul className={s.wrapper}>
								<li className={s.link}>
									<Link href={'#'}>One</Link>
								</li>
								<li className={s.link}>
									<Link href={'#'}>Two</Link>
								</li>

								<li className={s.link}>
									<Link href={'#'}>Three</Link>
								</li>
								<li className={s.link}>
									<Link href={'#'}>Four</Link>
								</li>
							</ul>
						</nav>
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
