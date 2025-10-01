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

const WorldMapScreen = () => {
	const [visible, setVisible] = useState(false)
	const [filters, setFilters] = useState({
		interactionType: { show: false, subFilters: [] },
		conversationType: { show: false, subFilters: [] },
		topic: { show: false, subFilters: [] },
		year: { show: false, subFilters: [] },
		reporting: { show: false, subFilters: [] },
	})

	const [country, setCountry] = useState('')
	const [modalOpen, setModalOpen] = useState(false)
	const [filteredData, setFilteredData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('mentions')
	const [showMapInfo, setShowMapInfo] = useState(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await fetch('/api/mentions?overview=true')
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const mentionsData = await response.json()
			// Pass the complete data structure, not just interactions
			setFilteredData(mentionsData)
		} catch (error) {
			console.error('Error fetching data:', error)
			setFilteredData(null)
		} finally {
			setLoading(false)
		}
	}
	
	useEffect(() => {
		fetchData()
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
								className= '${styles.mapButton}'
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
									// Only set country for hover, don't interfere with click
									if (countryData && countryData.name) {
										setCountry(countryData.name)
									}
								}}
								onCountryClick={(countryData) => {
									if (countryData && countryData.name) {
										// Set the clicked country and open modal
										setCountry(countryData)
										setModalOpen(true)
									}
								}}
								interactionData={filteredData}
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
