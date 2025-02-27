import React from 'react'
import styles from './header.module.css'
import { useRouter } from 'next/router'
import { Menu, Button } from 'semantic-ui-react'

const Header = ({ toggleSidebar }) => {
	const router = useRouter()

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
				<img 
					src='/images/logo.png' 
					alt='logo' 
					className={styles.logo} 
					onClick={() => router.push('/')}
					style={{ cursor: 'pointer' }}
				/>
			</div>
		</Menu>
	)
}

export default Header
