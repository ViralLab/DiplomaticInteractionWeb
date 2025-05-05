import React, { useState, useEffect, useRef } from 'react'
import InteractionCartography from '@components/interactionCartography'
import CountryDataModal from '@components/CountryDataModal'
import CountryFlag from '@components/countryFlag'
import styles from './worldMapScreen.module.css'
import {
	Button,
	SidebarPushable,
	Sidebar,
	SidebarPusher,
	Icon,
	Accordion,
	AccordionTitle,
	AccordionContent,
	Segment,
	Form,
	Checkbox,
	Radio,
	FormField,
} from 'semantic-ui-react'
import InteractionNetwork from '@components/interactionNetwork'
import {camelDict} from "../../data/countries/camelCaseDict"
import interactions from '../../data/interactions'

const WorldMapScreen = () => {
	const [display, setDisplay] = useState('cartography')
	const [visible, setVisible] = useState(false)
	const [filters, setFilters] = useState({
		interactionType: { show: false, subFilters: [] },
		conversationType: { show: false, subFilters: [] },
		topic: { show: false, subFilters: [] },
		year: { show: false, subFilters: [] },
		reporter: { show: false, subFilters: [] },
	})
	const [reporterFilter, setReporterFilter] = useState({
		show: false,
		value: '',
	})
	const startDateRef = useRef(null)
	const endDateRef = useRef(null)

	const [country, setCountry] = useState('')
	const [modalOpen, setModalOpen] = useState(false)

	const [filteredData, setFilteredData] = useState(null)

	const [loading, setLoading] = useState(true)

	const [originalData, setOriginalData] = useState(null)

	function handleChecboxChange(data, filterTitle) {
		setFilters({
			...filters,
			[filterTitle]: {
				show: filters[filterTitle]['show'],
				subFilters: filters[filterTitle]['subFilters'].includes(data.value)
					? filters[filterTitle]['subFilters'].filter(
							(item) => item !== data.value
					  )
					: [...filters[filterTitle]['subFilters'], data.value],
			},
		})
	}
	function handleDataFilter(data, filters) {
		let filteredData = data
		// filter data based on selected filters
		if (filters.hasOwnProperty('interactionType')) {
			filteredData = filteredData.filter((item) => {
				return filters['interactionType'].includes(item['interactionType'])
			})
		}
		if (filters.hasOwnProperty('conversationType')) {
			filteredData = filteredData.filter((item) => {
				return filters['conversationType'].includes(item['conversationType'])
			})
		}
		if (filters.hasOwnProperty('topic')) {
			filteredData = filteredData.filter((item) => {
				return filters['topic'].includes(item['topic'])
			})
		}
		if (filters.hasOwnProperty('startDate')) {
			filteredData = filteredData.filter((item) => {
				return new Date(item['date']) >= new Date(filters['startDate'])
			})
		}
		if (filters.hasOwnProperty('endDate')) {
			filteredData = filteredData.filter((item) => {
				return new Date(item['date']) <= new Date(filters['endDate'])
			})
		}
		if (filters.hasOwnProperty('reporter')) {
			filteredData = filteredData.filter((item) => {
				return filters['reporter'].includes(item['reporter'])
			})
		}
		return filteredData
	}
	function handleFilterSelection() {
		let formattedFilters = {}
		Object.entries(filters).forEach(([key, value]) => {
			if (value['subFilters'].length > 0)
				formattedFilters[key] = value['subFilters']
		})
		if (reporterFilter['value'] !== '') {
			formattedFilters['reporterCountry'] = reporterFilter['value']
		}
		if (startDateRef.current !== null && startDateRef.current.value !== '')
			formattedFilters['startDate'] = startDateRef.current.value
		if (endDateRef.current !== null && endDateRef.current.value !== '')
			formattedFilters['endDate'] = endDateRef.current.value

		return formattedFilters
	}
	function handleCountryDataSelection(data, title) {
		const formattedCountry =
			title == undefined || title == ''
				? ''
				: title.replace(/\s+/g, '')[0].toLowerCase() +
				  title.replace(/\s+/g, '').slice(1)
		return {
			title: title,
			data: data.filter((item) => {
				return (
					item['reporter'] === formattedCountry ||
					item['reported'] === formattedCountry
				)
			}),
		}
	}
	useEffect(() => {
		setOriginalData(interactions)
		const filteredData = handleDataFilter(interactions, {})
		setFilteredData(filteredData)
		setLoading(false)
	}, [])
	return (
		<SidebarPushable>
			<Sidebar
				animation='overlay'
				icon='labeled'
				onHide={() => setVisible(false)}
				visible={visible}
				width='wide'
				className={styles.filterSidebar}
			>
				<h2>Filter By</h2>
				<Accordion fluid exclusive={false}>
					<AccordionTitle
						active={filters['reporter']['show']}
						index={0}
						onClick={() => {
							setFilters({
								...filters,
								reporter: {
									show: !filters['reporter']['show'],
									subFilters: filters['reporter']['subFilters'],
								},
							})
						}}
					>
						<Icon name='dropdown' />
						Reporter Country
					</AccordionTitle>
					<AccordionContent active={filters['reporter']['show']}>
						<Segment className={styles.reporterCountry}>
							<Form>
								{Object.entries(camelDict).map((country) => {
									return (
										<FormField key={country[1]}>
											<Checkbox
												label={
													<label>
														<CountryFlag name={country[0]} /> {country[0]}
													</label>
												}
												name='reporterCountryFilterCheckbox'
												value={country[1]}
												onChange={(e, data) =>
													handleChecboxChange(data, 'reporter')
												}
											/>
										</FormField>
									)
								})}
							</Form>
						</Segment>
					</AccordionContent>

					<AccordionTitle
						active={filters['interactionType']['show']}
						index={0}
						onClick={() => {
							setFilters({
								...filters,
								interactionType: {
									show: !filters['interactionType']['show'],
									subFilters: filters['interactionType']['subFilters'],
								},
							})
						}}
					>
						<Icon name='dropdown' />
						Interaction Type
					</AccordionTitle>
					<AccordionContent active={filters['interactionType']['show']}>
						<Segment>
							<Form>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='star' /> Leader Level
											</label>
										}
										name='interactionTypeFilterCheckbox'
										value='leaderLevel'
										onChange={(e, data) =>
											handleChecboxChange(data, 'interactionType')
										}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='at' /> Mention
											</label>
										}
										name='interactionTypeFilterCheckbox'
										value='mention'
										onChange={(e, data) =>
											handleChecboxChange(data, 'interactionType')
										}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='ellipsis horizontal' /> Other
											</label>
										}
										name='interactionTypeFilterCheckbox'
										value='other'
										onChange={(e, data) =>
											handleChecboxChange(data, 'interactionType')
										}
									/>
								</FormField>
							</Form>
						</Segment>
					</AccordionContent>

					<AccordionTitle
						active={filters['conversationType']['show']}
						index={1}
						onClick={() => {
							setFilters({
								...filters,
								conversationType: {
									show: !filters['conversationType']['show'],
									subFilters: filters['conversationType']['subFilters'],
								},
							})
						}}
					>
						<Icon name='dropdown' />
						Conversation Type
					</AccordionTitle>
					<AccordionContent active={filters['conversationType']['show']}>
						<Segment>
							<Form>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='phone' /> Telephone
											</label>
										}
										name='conversationTypeFilterCheckbox'
										value='telephone'
										onChange={(e, data) =>
											handleChecboxChange(data, 'conversationType')
										}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='envelope' /> Email
											</label>
										}
										name='conversationTypeFilterCheckbox'
										value='email'
										onChange={(e, data) =>
											handleChecboxChange(data, 'conversationType')
										}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='users' /> Face to Face
											</label>
										}
										name='conversationTypeFilterCheckbox'
										value='faceToFace'
										onChange={(e, data) =>
											handleChecboxChange(data, 'conversationType')
										}
									/>
								</FormField>
							</Form>
						</Segment>
					</AccordionContent>

					<AccordionTitle
						active={filters['topic']['show']}
						index={2}
						onClick={() => {
							setFilters({
								...filters,
								topic: {
									show: !filters['topic']['show'],
									subFilters: filters['topic']['subFilters'],
								},
							})
						}}
					>
						<Icon name='dropdown' />
						Topic
					</AccordionTitle>
					<AccordionContent active={filters['topic']['show']}>
						<Segment>
							<Form>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='chart line' /> Economic
											</label>
										}
										name='topicFilterCheckbox'
										value='economic'
										onChange={(e, data) => handleChecboxChange(data, 'topic')}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='shield' /> Military
											</label>
										}
										name='topicFilterCheckbox'
										value='military'
										onChange={(e, data) => handleChecboxChange(data, 'topic')}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='flag' /> Political
											</label>
										}
										name='topicFilterCheckbox'
										value='political'
										onChange={(e, data) => handleChecboxChange(data, 'topic')}
									/>
								</FormField>
								<FormField>
									<Checkbox
										label={
											<label>
												<Icon name='building outline' /> Development
											</label>
										}
										name='topicFilterCheckbox'
										value='development'
										onChange={(e, data) => handleChecboxChange(data, 'topic')}
									/>
								</FormField>
							</Form>
						</Segment>
					</AccordionContent>

					<AccordionTitle
						active={filters['year']['show']}
						index={2}
						onClick={() => {
							setFilters({
								...filters,
								year: {
									show: !filters['year']['show'],
									subFilters: filters['year']['subFilters'],
								},
							})
						}}
					>
						<Icon name='dropdown' />
						Year
					</AccordionTitle>
					<AccordionContent active={filters['year']['show']}>
						<Segment className={styles.yearFilter}>
							<div>
								<label>Start Date</label>
								<input
									ref={startDateRef}
									type='date'
									placeholder='Enter Start Date'
								></input>
							</div>
							<div>
								<label>End Date</label>
								<input
									ref={endDateRef}
									type='date'
									placeholder='Enter Start Date'
								></input>
							</div>
						</Segment>
					</AccordionContent>
				</Accordion>
				<Button
					primary
					className={styles.filterBtn}
					size='huge'
					onClick={() => {
						const filters = handleFilterSelection()
						const filteredData = handleDataFilter(originalData, filters)
						setFilteredData(filteredData)
					}}
				>
					Filter
				</Button>
			</Sidebar>

			<SidebarPusher>
				<div className={styles.worldMapScreenContainer}>
					<div className={styles.filterSidebarBtnWrapper}>
						<Button
							icon='filter'
							content='Filter'
							color='grey'
							onClick={() => setVisible(!visible)}
						/>
					</div>
					{loading ? (
						<div>Loading...</div>
					) : display == 'cartography' ? (
						<div className={styles.mapContainer}>
							<InteractionCartography
								onPathHover={setCountry}
								onPathClick={() => {
									setModalOpen(true)
								}}
								cartographyData={filteredData}
								countries={filters.reporter.subFilters}
							/>
							<CountryDataModal
								country={handleCountryDataSelection(originalData, country)}
								modalOpen={modalOpen}
								onModalClose={() => setModalOpen(false)}
								onModalOpen={() => setModalOpen(true)}
							/>
						</div>
					) : (
						<div className={styles.mapContainer}>
							<InteractionNetwork networkData={filteredData} />
						</div>
					)}

					<div className={styles.bottomContainer}>
						<Segment raised className={styles.visFilter}>
							<Form>
								<FormField>
									<Checkbox
										radio
										label='Cartography'
										name='displayOption'
										value='cartography'
										checked={display === 'cartography'}
										onChange={(e, data) => setDisplay(data.value)}
									/>
								</FormField>
								<FormField>
									<Checkbox
										radio
										label='Network'
										name='displayOption'
										value='network'
										checked={display === 'network'}
										onChange={(e, data) => setDisplay(data.value)}
									/>
								</FormField>
							</Form>
						</Segment>
					</div>
				</div>
			</SidebarPusher>
		</SidebarPushable>
	)
}

export default WorldMapScreen
