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
import interactionData from '../../../data/mentions.json'

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
	const [activePage, setActivePage] = useState(1)
	const [sortField, setSortField] = useState('year')
	const [sortDirection, setSortDirection] = useState('desc')
	const itemsPerPage = 8

	// Get country name from either title or name property
	const countryName = country?.title || country?.name || ''

	useEffect(() => {
		setActivePage(1)
		setSortField('year')
		setSortDirection('desc')
	}, [modalOpen])

	// Get mentions for the current country
	const getMentionsForCountry = (countryName) => {
			console.log('Getting mentions for country:', countryName)
			console.log('Available countries:', interactionData.countries.map(c => c.name))

			// Find the country code from the countries data
			const countryFromData = interactionData.countries.find(c => c.name === countryName)
			if (!countryFromData) {
				console.log('Country not found in interaction data:', countryName)
				return []
			}
			
			const countryId = countryFromData.id
			console.log('Country ID:', countryId)
			
			const countryIndex = interactionData.index.byCountry[countryId]
			if (!countryIndex) {
				console.log('Country index not found for ID:', countryId)
				return []
			}
			
			console.log('Country index found:', countryIndex)
			
			const allInteractionIds = [...countryIndex.asReporter, ...countryIndex.asReported]
			console.log('All interaction IDs:', allInteractionIds)
			
			const interactions = allInteractionIds.map(id => {
				const interaction = interactionData.interactions.find(i => i.id === id)
				if (!interaction) return null
				
				const reporter = interactionData.countries.find(c => c.id === interaction.reporting)
				const reported = interactionData.countries.find(c => c.id === interaction.reported)
				
				return {
					id: interaction.id,
					reporter: reporter?.name || 'Unknown',
					reported: reported?.name || 'Unknown',
					date: interaction.date,
					year: new Date(interaction.date).getFullYear(),
					type: interaction.type,
					isReporter: countryIndex.asReporter.includes(id)
				}
			}).filter(Boolean)
			
			console.log('Processed interactions:', interactions)
			
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
			
			console.log('Final aggregated result:', result)
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


	console.log('Modal country data:', country)
	console.log('Using country name:', countryName)
	
	const mentions = getMentionsForCountry(countryName)
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
			{mentions.length > 0 ? (
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
