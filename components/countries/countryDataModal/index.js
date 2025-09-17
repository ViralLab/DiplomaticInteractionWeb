import React, { useState, useEffect } from 'react'
import {
	Modal,
	Table,
	Pagination,
	Tab,
	Segment,
	Header,
	Icon,
} from 'semantic-ui-react'
import styles from './countryDataModal.module.css'
import countries from '../../../data/countries.js'

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
	const [activePage, setActivePage] = useState(1)
	const [sortField, setSortField] = useState('date')
	const [sortDirection, setSortDirection] = useState('desc')
	const [mentionsData, setMentionsData] = useState(null)
	const [loading, setLoading] = useState(false)
	const itemsPerPage = 8

	// Get country name from either title or name property
	const countryName = country?.title || country?.name || ''

	useEffect(() => {
		setActivePage(1)
		setSortField('date')
		setSortDirection('desc')
	}, [modalOpen])

	// Fetch country-specific data when modal opens
	useEffect(() => {
		if (modalOpen && countryName) {
			fetchCountryData()
		}
	}, [modalOpen, countryName])

	const fetchCountryData = async () => {
		setLoading(true)
		try {
			// Use country code directly if available, otherwise map from name
			// Handle both 'code' and 'countryCode' properties
			const countryCode = country?.code || country?.countryCode || getCountryCodeFromName(countryName)
			
			if (!countryCode) {
				setMentionsData(null)
				return
			}

			const apiUrl = `${window.location.origin}/api/country/${countryCode}?limit=1000`			
			const response = await fetch(apiUrl)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json()
			setMentionsData(data)
		} catch (error) {
			console.error('=== CLIENT FETCH ERROR ===')
			console.error('Error fetching country data:', error)
			setMentionsData(null)
		} finally {
			setLoading(false)
		}
	}

	const getCountryCodeFromName = (name) => {
		// Use the countries.js file to find country code
		const country = countries.find(c => 
			c.name.toLowerCase() === name.toLowerCase() ||
			c.name.toLowerCase().includes(name.toLowerCase()) ||
			name.toLowerCase().includes(c.name.toLowerCase())
		)
		return country ? country.countryCode : null
	}

	// Get mentions for the current country
	const getMentionsForCountry = () => {
		if (!mentionsData || !mentionsData.data) {
			return []
		}


		// The API already returns enriched data with country names
		const interactions = mentionsData.data.map(interaction => ({
			id: interaction.id,
			reporter: interaction.reporterName || 'Unknown',
			reported: interaction.reportedName || 'Unknown',
			date: interaction.date,
			year: new Date(interaction.date).getFullYear(),
			type: interaction.type,
			isReporter: interaction.reporterCode === getCountryCodeFromName(countryName)
		}))


			// Aggregate by reporter, reported, year, and type for more granular grouping
			const aggregatedData = {}
			interactions.forEach(interaction => {
				const key = `${interaction.reporter}-${interaction.reported}-${interaction.year}-${interaction.type}`
				if (!aggregatedData[key]) {
					aggregatedData[key] = {
						reporter: interaction.reporter,
						reported: interaction.reported,
						year: interaction.year,
						date: interaction.date,
						type: interaction.type,
						count: 0
					}
				}
				aggregatedData[key].count++
			})
			
			const result = Object.values(aggregatedData).sort((a, b) => {
				if (sortField === 'year') {
					return sortDirection === 'desc' ? b.year - a.year : a.year - b.year
				} else if (sortField === 'count') {
					return sortDirection === 'desc' ? b.count - a.count : a.count - b.count
				}
				return b.year - a.year || a.reporter.localeCompare(b.reporter)
			})
			
			return result
		}

	const handleSort = (field) => {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortField(field)
			setSortDirection('desc')
		}
		setActivePage(1)
	}

	const mentions = getMentionsForCountry()
	const indexOfLastItem = activePage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = mentions.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(mentions.length / itemsPerPage)

	const workInProgressView = (
		<Segment placeholder className={styles.workInProgressSegment}>
			<Header icon textAlign="center">
				<Icon name="cogs" size="big" />
				Work in Progress
				<Header.Subheader>
					This section will be available with the actual data soon.
				</Header.Subheader>
			</Header>
		</Segment>
	)

	const mentionsTab = (
		<Tab.Pane>
			{loading ? (
				<Segment placeholder className={styles.workInProgressSegment}>
					<Header icon textAlign="center">
						<Icon name="spinner" loading size="big" />
						Loading Data
						<Header.Subheader>
							Fetching mentions data for {countryName}...
						</Header.Subheader>
					</Header>
				</Segment>
			) : mentions.length > 0 ? (
				<>
					<div className={styles.tableWrapper}>
						<div className={styles.tableHeader}></div>
						<Table celled compact size="small" className={styles.fittedTable}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Reporter</Table.HeaderCell>
									<Table.HeaderCell>Reported</Table.HeaderCell>
									<Table.HeaderCell 
										onClick={() => handleSort('year')}
										className={styles.sortableHeader}
									>
										Year
										<span className={`${styles.sortIcon} ${sortField === 'year' ? styles.active : styles.inactive}`}>
											{sortField === 'year' ? (sortDirection === 'desc' ? '▼' : '▲') : '↕'}
										</span>
									</Table.HeaderCell>
									<Table.HeaderCell 
										onClick={() => handleSort('count')}
										className={styles.sortableHeader}
									>
										Count
										<span className={`${styles.sortIcon} ${sortField === 'count' ? styles.active : styles.inactive}`}>
											{sortField === 'count' ? (sortDirection === 'desc' ? '▼' : '▲') : '↕'}
										</span>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{currentItems.map((item, index) => (
									<Table.Row key={index}>
										<Table.Cell className={styles.cell}>{item.reporter}</Table.Cell>
										<Table.Cell className={styles.cell}>{item.reported}</Table.Cell>
										<Table.Cell className={styles.cell}>{item.year}</Table.Cell>
										<Table.Cell className={styles.cell}>{item.count}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</div>
					{mentions.length > 0 && (
						<div className={styles.paginationWrapper}>
							<div style={{ marginBottom: '0.25rem', color: '#666', fontSize: '0.85em' }}>
								Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, mentions.length)} of {mentions.length} interactions
							</div>
							{totalPages > 1 && (
								<Pagination
									activePage={activePage}
									totalPages={totalPages}
									onPageChange={(e, { activePage }) => setActivePage(activePage)}
									size="mini"
									boundaryRange={1}
									siblingRange={1}
									ellipsisItem={null}
									firstItem={null}
									lastItem={null}
								/>
							)}
							{totalPages === 1 && mentions.length > 0 && (
								<div style={{ color: '#999', fontSize: '0.75em', fontStyle: 'italic', marginTop: '0.25rem' }}>
									All interactions shown (single page)
								</div>
							)}
						</div>
					)}
				</>
			) : (
				<Segment placeholder className={styles.workInProgressSegment}>
					<Header icon textAlign="center">
						<Icon name="info circle" size="big" />
						No Mentions Found
						<Header.Subheader>
							No interaction data available for this country.
						</Header.Subheader>
					</Header>
				</Segment>
			)}
		</Tab.Pane>
	)

	const panes = [
		{
			menuItem: 'Mentions',
			render: () => mentionsTab,
		},
		{
			menuItem: 'Interactions',
			render: () => <Tab.Pane>{workInProgressView}</Tab.Pane>,
		},
	]

	return (
		<Modal open={modalOpen} onClose={onModalClose} size="large">
			<Modal.Header>{countryName}</Modal.Header>
			<Modal.Content>
				<Tab panes={panes} />
			</Modal.Content>
		</Modal>
	)
}

export default CountryDataModal
