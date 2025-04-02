import React from 'react'
import {
	TableRow,
	TableHeaderCell,
	TableHeader,
	TableCell,
	TableBody,
	Table,
	Segment,
} from 'semantic-ui-react'
import CountryFlag from '@components/countryFlag'
import styles from './interactionTable.module.css'
import { invertedCodeDict } from '@/data/countries/invertedCountryCodes'

const InteractionTable = ({ tableData }) => {
	return (
		<Segment className={styles.countryTableSegment}>
			<Table celled inverted selectable>
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
					{tableData.map((interaction) => {
						return (
							<TableRow>
								<TableCell>
									<div className={styles.rowCountryContainer}>
										<CountryFlag
											fontSize={15}
											countryCode={interaction.reporterId}
										/>
										<span className={styles.rowCountryTitle}>
											{invertedCodeDict[interaction.reporterId] ??
												interaction.reporter}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className={styles.rowCountryContainer}>
										<CountryFlag
											fontSize={15}
											countryCode={interaction.reportedId}
										/>
										<span className={styles.rowCountryTitle}>
											{invertedCodeDict[interaction.reportedId] ??
												interaction.reported}
										</span>
									</div>
								</TableCell>
								<TableCell textAlign='center'>
									{interaction.interactionType}
								</TableCell>
								<TableCell textAlign='center'>
									{interaction.conversationType}
								</TableCell>
								<TableCell textAlign='center'>{interaction.topic}</TableCell>
								<TableCell textAlign='center'>{interaction.date}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Segment>
	)
}

export default InteractionTable
