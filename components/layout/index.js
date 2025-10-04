import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@components/layout/header'
import Content from '@components/layout/content'
import MobileMessage from '@/components/utils/mobileMessage'
import {
	Menu,
	MenuItem,
	SidebarPusher,
	SidebarPushable,
	Icon,
	Sidebar,
} from 'semantic-ui-react'
import styles from './layout.module.css'
import Link from 'next/link'
import Footer from '@/components/layout/footer/index.js'
const Layout = ({ app }) => {
	const [visible, setVisible] = useState(false)
	const toggleSidebar = () => setVisible(!visible)
	const router = useRouter()
	const isActiveItem = (href) => router.pathname.split('/')[1] == href

	return (
		<SidebarPushable>
			<MobileMessage />
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
				<MenuItem as={Link} href="/" active={isActiveItem('')}>
					<Icon name='home' />
					Home
				</MenuItem>
				<MenuItem
					as={Link}
					href="/interactions-mentions"
					active={isActiveItem('interactions')}
				>
					<Icon name='exchange' />
					Interactions and Mentions
				</MenuItem>
				<MenuItem
					as={Link}
					href="/publications"
					active={isActiveItem('publications')}
				>
					<Icon name='newspaper' />
					Publications
				</MenuItem>
				<MenuItem as={Link} href="/team" active={isActiveItem('team')}>
					<Icon name='users' />
					Our Team
				</MenuItem>
				<MenuItem as={Link} href="/about" active={isActiveItem('about')}>
					<Icon name='users' />
					About
				</MenuItem>
			</Sidebar>

			<SidebarPusher>
				<Header toggleSidebar={toggleSidebar} />
				<Content>{app}</Content>
				<Footer />
			</SidebarPusher>
		</SidebarPushable>
	)
}

export default Layout
