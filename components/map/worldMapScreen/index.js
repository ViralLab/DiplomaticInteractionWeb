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

import interactions from '../../../data/mentions'

const WorldMapScreen = () => {
	const [visible, setVisible] = useState(false)
	const [filters, setFilters] = useState({
		interactionType: { show: false, subFilters: [] },
		conversationType: { show: false, subFilters: [] },
		topic: { show: false, subFilters: [] },
		year: { show: false, subFilters: [] },
		reporter: { show: false, subFilters: [] },
	})

	const [country, setCountry] = useState('')
	const [modalOpen, setModalOpen] = useState(false)
	const [filteredData, setFilteredData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('mentions')
	const [showMapInfo, setShowMapInfo] = useState(true)

	function handleDataFilter(data) {
		let filteredData = data.interactions || []
		
		// Filter by tab selection first
		if (activeTab === 'mentions') {
			filteredData = filteredData.filter((item) => {
				return item['type'] === 'mention'
			})
		} else if (activeTab === 'interactions') {
			// For interactions tab, return empty array since we don't have interaction data yet
			return []
		}
	
		return filteredData
	}
	
	useEffect(() => {
		const filteredData = handleDataFilter(interactions)
		setFilteredData(filteredData)
		setLoading(false)
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
								disabled
								title="Work in Progress"
								className={`${styles.disabledButton} ${styles.mapButton}`}
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
										setCountry(countryData.name)
										setModalOpen(true)
									}
								}}
								cartographyData={filteredData}
								countries={filters.reporter.subFilters}
								interactionData={interactions}
							/>
							{modalOpen && country && (
								<CountryDataModal
									country={{ title: country }}
									modalOpen={modalOpen}
									onModalClose={() => setModalOpen(false)}
								/>
							)}
							{showMapInfo && (
								<div className={styles.mapInfoBox}>
									<Icon name='info circle' />
									<span>This map shows diplomatic interactions and mentions between countries. Use the filter sidebar to explore specific data.</span>
									<Icon 
										name='close' 
										className={styles.closeIcon}
										onClick={() => setShowMapInfo(false)}
									/>
								</div>
							)}
							<div className={styles.mapLegend}>
								<div className={styles.legendTitle}># of Mentions</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#003366'}}></div>
									<span>1000+</span>
								</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#0052CC'}}></div>
									<span>501-1000</span>
								</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#1A8CFF'}}></div>
									<span>101-500</span>
								</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#66B2FF'}}></div>
									<span>26-100</span>
								</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#B3D9FF'}}></div>
									<span>1-25</span>
								</div>
								<div className={styles.legendItem}>
									<div className={styles.legendDot} style={{backgroundColor: '#F0F0F0'}}></div>
									<span>No Mentions</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</SidebarPusher>
		</SidebarPushable>
	)
}

export default WorldMapScreen
