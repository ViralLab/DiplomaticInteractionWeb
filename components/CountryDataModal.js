import React, { useState, useEffect } from 'react'
import {
	Modal,
	// Table,
	// Pagination,
	Tab,
	Segment,
	Header,
	Icon,
} from 'semantic-ui-react'
import styles from './CountryDataModal.module.css'

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
	const [activePage, setActivePage] = useState(1)
	const itemsPerPage = 12

	useEffect(() => {
		setActivePage(1)
	}, [modalOpen, country.title])

	const indexOfLastItem = activePage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = country.data.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(country.data.length / itemsPerPage)

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

	// Preserved for later use — Mentions tab with paginated table
	/*
	const mentionsTab = (
		<Tab.Pane>
			<div className={styles.tableWrapper}>
				<Table celled compact size="small" className={styles.fittedTable}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Reporter</Table.HeaderCell>
							<Table.HeaderCell>Reported</Table.HeaderCell>
							<Table.HeaderCell>Date</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{currentItems.map((item, index) => (
							<Table.Row key={index}>
								<Table.Cell className={styles.cell}>{item.reporter}</Table.Cell>
								<Table.Cell className={styles.cell}>{item.reported}</Table.Cell>
								<Table.Cell className={styles.cell}>{item.date}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
			{totalPages > 1 && (
				<div className={styles.paginationWrapper}>
					<Pagination
						activePage={activePage}
						totalPages={totalPages}
						onPageChange={(e, { activePage }) => setActivePage(activePage)}
						size="small"
						boundaryRange={1}
						siblingRange={1}
						ellipsisItem={null}
						firstItem={null}
						lastItem={null}
					/>
				</div>
			)}
		</Tab.Pane>
	)
	*/

	const panes = [
		{
			menuItem: 'Mentions',
			// render: () => mentionsTab,
			render: () => <Tab.Pane>{workInProgressView}</Tab.Pane>,
		},
		{
			menuItem: 'Interactions',
			render: () => <Tab.Pane>{workInProgressView}</Tab.Pane>,
		},
	]

	return (
		<Modal open={modalOpen} onClose={onModalClose} size="large">
			<Modal.Header>{country.title}</Modal.Header>
			<Modal.Content>
				<Tab panes={panes} />
			</Modal.Content>
		</Modal>
	)
}

export default CountryDataModal
