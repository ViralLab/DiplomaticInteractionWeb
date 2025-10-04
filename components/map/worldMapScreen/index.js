import React, { useState, useEffect } from 'react'
import WorldMap from '@/components/map/worldMap'
import CountryDataModal from '@/components/countries/countryDataModal'
import styles from './worldMapScreen.module.css'
import {
	Button,
	SidebarPushable,
	SidebarPusher,
	Icon,
} from 'semantic-ui-react'
import NetworkGraph from '../networkGraph'
import { mentionsService } from '@/lib/firebase'

const WorldMapScreen = () => {
	const [visible, setVisible] = useState(false)
	const [country, setCountry] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState('mentions')
	const [showMapInfo, setShowMapInfo] = useState(true)
	const [countriesData, setCountriesData] = useState(null)

	useEffect(() => {
		if (activeTab === 'mentions') {
			mentionsService.getCountries().then((countries) => {
				setCountriesData(countries)
			})
		}
	}, [activeTab])

	return (
		<SidebarPushable>
			<SidebarPusher>
				<div className={styles.worldMapScreenContainer}>
					<div className={styles.filterSidebarBtnWrapper}>
						<div className={styles.titleContainer}>
							<h3 className={styles.title}>
								<Icon name='globe' />
								Explore the data on the map
							</h3>
						</div>
						<div className={styles.mapButtons}>
							<Button
								primary={activeTab === 'mentions'}
								basic={activeTab !== 'mentions'}
								onClick={() => setActiveTab('mentions')}
								className={styles.mapButton}
							>
								<Icon name='map' />
								Cartography
							</Button>
							<Button
								primary={activeTab === 'network'}
								basic={activeTab !== 'network'}
								onClick={() => setActiveTab('network')}
								className={styles.mapButton}
							>
								<Icon name='sitemap' />
								Network
							</Button>
						</div>
						<div className={styles.filterContainer}>
							<Button
								icon='filter'
								content='Filter'
								color='grey'
								onClick={() => setVisible(!visible)}
								className={styles.filterButton}
							/>
						</div>
					</div>
					{loading ? (
						<div>Loading...</div>
					) : (
						(activeTab === 'mentions' ? (
						<div className={styles.mapContainer}>
							<WorldMap
								onCountryHover={(countryData) => {
									// Only set hover name, not the object
									if (countryData && countryData.name) {
										setCountry((prev) => ({ ...prev, name: countryData.name }))
									}
								}}
								onCountryClick={async (countryData) => {
									console.log('clicking country', countryData)
									if (countryData && countryData.name) {
										// Pass both code and name for modal
										setCountry({ code: countryData.code, name: countryData.name })
										setModalOpen(true)
									}
								}}
								countriesData={countriesData}
							/>
							{modalOpen && country && (
								<CountryDataModal
									country={country}
									modalOpen={modalOpen}
									onModalClose={() => setModalOpen(false)}
								/>
							)}
							{showMapInfo && (
								<div className={styles.mapInfoBox}>
									<Icon name='info circle' />
									<span>This map shows the diplomatic interactions and mentions of countries.</span>
									<Icon 
										name='close' 
										className={styles.closeIcon}
										onClick={() => setShowMapInfo(false)}
									/>
								</div>
							)}
							<div className={styles.mapLegend}>
								<div className={styles.legendTitle}>Interactive Map</div>
								<div className={styles.legendNotec}>
									Click any country to view their diplomatic interactions
								</div>
							</div>
						</div>
						) : (
						<NetworkGraph/>
						))
					)}
				</div>
			</SidebarPusher>
		</SidebarPushable>
	)
}

export default WorldMapScreen
