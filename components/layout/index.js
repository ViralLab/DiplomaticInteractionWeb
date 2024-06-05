import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@components/layout/header'
import Content from '@components/layout/content'
import {
	Menu,
	MenuItem,
	SidebarPusher,
	SidebarPushable,
	Icon,
	Sidebar,
} from 'semantic-ui-react'
import styles from './layout.module.css'

const Layout = ({ app }) => {
	const [visible, setVisible] = useState(false)
	const toggleSidebar = () => setVisible(!visible)
	const router = useRouter()
	const isActiveItem = (href) => router.pathname.split('/')[1] == href

	return (
		<SidebarPushable>
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				inverted
				onHide={() => setVisible(false)}
				vertical
				visible={visible}
				width='wide'
				className={styles.sidebarContainer}
			>
				<MenuItem as='a' href='/' active={isActiveItem('')}>
					<Icon name='home' />
					Home
				</MenuItem>
				<MenuItem as='a' href='/countries' active={isActiveItem('countries')}>
					<Icon name='world' />
					Countries
				</MenuItem>
				<MenuItem
					as='a'
					href='/interactions'
					active={isActiveItem('interactions')}
				>
					<Icon name='exchange' />
					Interactions
				</MenuItem>
				<MenuItem
					as='a'
					href='/publications'
					active={isActiveItem('publications')}
				>
					<Icon name='newspaper' />
					Publications
				</MenuItem>
				<MenuItem as='a' href='/team' active={isActiveItem('team')}>
					<Icon name='users' />
					Our Team
				</MenuItem>
			</Sidebar>

			<SidebarPusher>
				<Header toggleSidebar={toggleSidebar} />
				<Content>{app}</Content>
			</SidebarPusher>
		</SidebarPushable>
	)
}

export default Layout
