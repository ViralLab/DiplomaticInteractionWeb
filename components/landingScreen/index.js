import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import GlobeNetworkSvg from '@components/globeNetworkSvg'
import LandingIcon from '@components/landingIcon'
import styles from './landingScreen.module.css'
import Link from 'next/link'

const LandingScreen = ({ onScroll }) => {
	return (
		<Grid>
			<Grid.Row className={styles.datasetRow}>
				<Grid.Column width={16} textAlign='center' verticalAlign='middle'>
					<div className={styles.datasetContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '0 6rem'}}>
						<div className={styles.datasetText} style={{ fontSize: '16px', color: 'gray', textAlign: 'left', lineHeight: '1.2'}}>
							Our <span style={{ color: 'rgb(25, 120, 120)', fontWeight: 'bold' }}>dataset</span> and <span style={{ color: 'rgb(25, 120, 120)', fontWeight: 'bold' }}>code</span> are now accessible through the following platforms:
						</div>
						<div className={styles.buttonContainer}>
							<Link href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/OFN15B" legacyBehavior>
								<a className={styles.button} target='_blank' rel='noopener noreferrer'>
									<img src='/images/logos/harvard-logo.png' alt='dataverse' style={{ width: '24px', height: '24px', marginRight: '8px' }} />
									Harvard Dataverse
								</a>
							</Link>
							<Link href="https://github.com/ViralLab/GlobalDiplomacyNet-Dataset" legacyBehavior>
								<a className={styles.button} target='_blank' rel='noopener noreferrer'>
									<Icon name='github' style={{ fontSize: '24px', marginRight: '8px', marginTop: '2px' }} />
									GitHub
								</a>
							</Link>
						</div>
					</div>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row className={styles.headerRow}>
				<Grid.Column width={10} textAlign='center' verticalAlign='middle' >
					<div className={styles.landingText} style={{ padding: '0 6rem', color: 'black'}}>
						<Link href="/">
							<span 
								style={{ color: 'rgb(25, 120, 120)', cursor: 'pointer' }}
							>
								GlobalDiplomacyNET
							</span>
						</Link> project gathers reports and news for 160 countries globally. Using NLP and Network Science, we map the interactions topically and longitudinally.
					</div>
					<div className={styles.descriptionText} style={{ padding: '0 6rem', marginTop: '2rem', fontSize: '20px', color: 'gray', textAlign: 'left', lineHeight: '1.6'}}>
						We scrape websites of Executive and Ministry of Foreign Affairs of these countries to collect reports and news.
					</div>
				</Grid.Column>
				<Grid.Column width={6} textAlign='center' verticalAlign='middle'>
					<GlobeNetworkSvg />
				</Grid.Column>
			</Grid.Row>


			<Grid.Row className={styles.infoRow}>
				<Grid.Column className={styles.iconsContainer}>
					<div className={styles.iconsWrapper}>
						<div className={styles.cardBox}>
							<LandingIcon s icon='flag' />
							<p>Thousand of articles spanning more than 20 years.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon icon='globe' />
							<p>Interactions mapped globally by extraction mentions of countries and politicians.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon icon='map outline' />
							<p>We offer detailed interactive tool for you to inspect data.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon icon='balance scale' />
							<p>Country-level insights extracted for topic of text and visuals shared online.</p>
						</div>
					</div>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row className={styles.scrolRow}>
				<Grid.Column width={16} style={{ marginTop: '2rem', marginBottom: '1rem' }} textAlign='center' verticalAlign='top'>
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
