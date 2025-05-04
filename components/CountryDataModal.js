import React, { useState, useEffect } from 'react';
import { Modal, Table, Pagination } from 'semantic-ui-react';
import styles from './CountryDataModal.module.css'; // Create this file if it doesn't exist

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
	const [activePage, setActivePage] = useState(1);
	const itemsPerPage = 12;

	// Reset to first page when modal opens or country changes
	useEffect(() => {
		setActivePage(1);
	}, [modalOpen, country.title]);

	const indexOfLastItem = activePage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = country.data.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(country.data.length / itemsPerPage);

	return (
		<Modal open={modalOpen} onClose={onModalClose} size="large">
			<Modal.Header>{country.title}</Modal.Header>
			<Modal.Content>
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
			</Modal.Content>
		</Modal>
	);
};

export default CountryDataModal; 