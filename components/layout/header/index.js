import React from 'react'
import styles from './header.module.css'

import { Menu, Button, Icon } from 'semantic-ui-react'

const Header = ({ toggleSidebar }) => {
	return (
		<Menu secondary className={styles.navbar}>
			<Button
				icon='bars'
				inverted
				color='black'
				size='huge'
				onClick={toggleSidebar}
			/>
			<div className={styles.rightNavbar}>
				{/* I want to add a logo here */}
				<img src='/images/logo.png' alt='logo' className={styles.logo} />
			</div>
		</Menu>
	)
}

export default Header
