import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import GlobeNetworkSvg from '@components/globeNetworkSvg'
import LandingIcon from '@components/landingIcon'
import styles from './landingScreen.module.css'
import Link from 'next/link'

const LandingScreen = ({ onScroll }) => {
	return (
		<Grid>
			<Grid.Row className={styles.headerRow}>
				<Grid.Column width={10} textAlign='center' verticalAlign='middle' >
					<div className={styles.landingText} style={{ padding: '0 4rem', color: 'black'}}>
						<Link href="/">
							<span 
								style={{ color: 'rgb(25, 120, 120)', cursor: 'pointer' }}
							>
								DiplomacyNet
							</span>
						</Link> project gathers reports and news for nearly 200 countries globally. Using NLP and Network Science, we map the interactions topically and longitudinally.
					</div>
					<div className={styles.descriptionText} style={{ padding: '0 4rem', marginTop: '2rem', fontSize: '20px', color: 'gray', textAlign: 'left', lineHeight: '1.6'}}>
						We scrape websites of Executive and Ministry of Foreign Affairs of these countries to collect reports and news.
					</div>
				</Grid.Column>
				<Grid.Column width={6} textAlign='center' verticalAlign='middle'>
					<GlobeNetworkSvg />
				</Grid.Column>
			</Grid.Row>

			<Grid.Row className={styles.infoRow}>
				<Grid.Column width={16} className={styles.iconsContainer}>
					<div className={styles.iconsWrapper} style={{ display: 'flex', alignItems: 'flex-start' }}>
						<LandingIcon
							icon='flag'
							desc='Thousand of articles spanning more than 20 years'
						/>
						<LandingIcon
							icon='globe'
							desc='Interaction between countries mapped globally by extraction mentions of countries and politicians.'
						/>
						<LandingIcon
							icon='map outline'
							desc='We offer detailed interactive tool for you to inspecting data.'
						/>
						<LandingIcon
							icon='balance scale'
							desc='Country-level insights extracted for topic of text and visuals shared online.'
						/>
					</div>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row className={styles.scrolRow}>
				<Grid.Column width={16} style={{ marginTop: '3rem', marginBottom: '1rem' }} textAlign='center' verticalAlign='top'>
					<Icon
						name='angle double down'
						size='huge'
						color='rgb(25, 120, 120)'
						className={styles.scrollIcon}
						onClick={onScroll}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default LandingScreen
