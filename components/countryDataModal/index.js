import React from 'react'
import styles from './countryDataModal.module.css'
import {
	Icon,
	ModalHeader,
	ModalDescription,
	ModalContent,
	ModalActions,
	Modal,
	Table,
	TableRow,
	TableHeaderCell,
	TableHeader,
	TableCell,
	TableBody,
	Button,
} from 'semantic-ui-react'
import CountryFlag from '@components/countryFlag'
import { codeDict } from '@/data/countries/countryCodes';

const CountryDataModal = ({
	country,
	modalOpen,
	onModalOpen,
	onModalClose,
}) => {
	function capitalized(text) {
		return text
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/\b\w/g, function (char) {
				return char.toUpperCase()
			})
	}
	const camelCaseData = country.data.map((data) => {
		return {
			reporter: capitalized(data.reporter),
			reported: capitalized(data.reported),
			interactionType: capitalized(data.interactionType),
			conversationType: capitalized(data.conversationType),
			topic: capitalized(data.topic),
			date: capitalized(data.date),
		}
	})
	return (
		<>
			{country.title !== '' && (
				<div className={styles.countryToolTipContainer}>
					<div className={styles.countryTooltipHeader}>
						<CountryFlag countryCode={[country.title]} />
						{country.title}
					</div>
					<div className={styles.toolTipText}>
						<p>Click on map to see more information</p>
						<Icon name={'right arrow'} />
					</div>
				</div>
			)}

			<Modal onClose={onModalClose} onOpen={onModalOpen} open={modalOpen}>
				<ModalHeader>
					<div className={styles.modalHeader}>
						<CountryFlag countryCode={[country.title]} />
						<div>{country.title} - Data</div>
					</div>
				</ModalHeader>
				<ModalContent className={styles.modalContent}>
					<ModalDescription>
						<Table celled>
							<TableHeader>
								<TableRow>
									<TableHeaderCell textAlign='center'>Reporter</TableHeaderCell>
									<TableHeaderCell textAlign='center'>Reported</TableHeaderCell>
									<TableHeaderCell textAlign='center'>
										Interaction Type
									</TableHeaderCell>
									<TableHeaderCell textAlign='center'>
										Conversation Type
									</TableHeaderCell>
									<TableHeaderCell textAlign='center'>Topic</TableHeaderCell>
									<TableHeaderCell textAlign='center'>Date</TableHeaderCell>
								</TableRow>
							</TableHeader>

							<TableBody>
								{camelCaseData.map((data, index) => (
									<TableRow key={index}>
										<TableCell textAlign='center'>
											{data.reporter === country.title ? (
												<div className={styles.boldTitle}>{data.reporter}</div>
											) : (
												<div>{data.reporter}</div>
											)}
										</TableCell>
										<TableCell textAlign='center'>
											{data.reported === country.title ? (
												<div className={styles.boldTitle}>{data.reported}</div>
											) : (
												<div>{data.reported}</div>
											)}
										</TableCell>
										<TableCell textAlign='center'>
											{data.interactionType}
										</TableCell>
										<TableCell textAlign='center'>
											{data.conversationType}
										</TableCell>
										<TableCell textAlign='center'>{data.topic}</TableCell>
										<TableCell textAlign='center'>{data.date}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ModalDescription>
				</ModalContent>
				<ModalActions>
					<Button
						as='a'
						href={`/countries/${
							codeDict[country.title] === undefined
								? '/404'
								: codeDict[country.title].toLowerCase()
						}`}
						primary
					>
						Go To Page
					</Button>
				</ModalActions>
			</Modal>
		</>
	)
}

export default CountryDataModal
