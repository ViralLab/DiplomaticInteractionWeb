import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import GlobeNetworkSvg from '@components/globeNetworkSvg'
import LandingIcon from '@components/landingIcon'
import styles from './landingScreen.module.css'

const LandingScreen = ({ onScroll }) => {
	return (
		<Grid>
			<Grid.Row className={styles.headerRow}>
				<Grid.Column width={10} textAlign='center' verticalAlign='middle'>
					<div className={styles.landingText}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo
						massa, facilisis sit amet sem ut, fringilla pharetra velit. Ut
						tristique ligula sed nisi luctus
					</div>
				</Grid.Column>
				<Grid.Column width={6} textAlign='center' verticalAlign='middle'>
					<GlobeNetworkSvg />
				</Grid.Column>
			</Grid.Row>

		<Grid.Row className={styles.infoRow}>
				<Grid.Column className={styles.iconsContainer}>
					<div className={styles.iconsWrapper} style={{ 
						display: 'flex', 
						alignItems: 'center', 
						justifyContent: 'space-between',
						gap: '2rem'
					}}>
						<div className={styles.cardBox}>
							<LandingIcon icon='flag' />
							<p>Thousand of articles spanning more than 20 years.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon
								icon='globe'
							/>
							<p>Interaction between countries mapped globally by extraction mentions of countries and politicians.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon
								icon='map outline'
							/>
							<p>We offer detailed interactive tool for you to inspecting data.</p>
						</div>
						<div className={styles.cardBox}>
							<LandingIcon
								icon='balance scale'
							/>
							<p>Country-level insights extracted for topic of text and visuals shared online.</p>
						</div>
					</div>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row className={styles.scrolRow}>
				<Grid.Column width={16} textAlign='center' verticalAlign='top'>
					<Icon
						name='angle double down'
						size='huge'
						className={styles.scrollIcon}
						onClick={onScroll}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default LandingScreen
