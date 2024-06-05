import React, { useEffect } from 'react'
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

const invertedCodeDict = {
	AL: 'Albania',
	DZ: 'Algeria',
	AS: 'American Samoa',
	AO: 'Angola',
	AI: 'Anguilla',
	AG: 'Antigua and Barbuda',
	AR: 'Argentina',
	AM: 'Armenia',
	AW: 'Aruba',
	AU: 'Australia',
	AT: 'Austria',
	AZ: 'Azerbaijan',
	BS: 'Bahamas',
	BH: 'Bahrain',
	BD: 'Bangladesh',
	BB: 'Barbados',
	BY: 'Belarus',
	BE: 'Belgium',
	BZ: 'Belize',
	BJ: 'Benin',
	BM: 'Bermuda',
	BT: 'Bhutan',
	BO: 'Bolivia',
	BA: 'Bosnia and Herzegovina',
	BW: 'Botswana',
	BR: 'Brazil',
	VG: 'British Virgin Islands',
	BN: 'Brunei Darussalam',
	BG: 'Bulgaria',
	BF: 'Burkina Faso',
	BI: 'Burundi',
	KH: 'Cambodia',
	CM: 'Cameroon',
	CA: 'Canada',
	CV: 'Cape Verde',
	KY: 'Cayman Islands',
	CF: 'Central African Republic',
	TD: 'Chad',
	CL: 'Chile',
	CN: 'China',
	CO: 'Colombia',
	KM: 'Comoros',
	CG: 'Congo',
	CR: 'Costa Rica',
	HR: 'Croatia',
	CU: 'Cuba',
	CW: 'Curaçao',
	CY: 'Cyprus',
	CZ: 'Czech Republic',
	KP: 'Dem. Rep. Korea',
	DK: 'Denmark',
	DJ: 'Djibouti',
	DM: 'Dominica',
	DO: 'Dominican Republic',
	EC: 'Ecuador',
	EG: 'Egypt',
	SV: 'El Salvador',
	GQ: 'Equatorial Guinea',
	ER: 'Eritrea',
	EE: 'Estonia',
	ET: 'Ethiopia',
	FO: 'Faeroe Islands',
	FK: 'Falkland Islands',
	FM: 'Federated States of Micronesia',
	FJ: 'Fiji',
	FI: 'Finland',
	FR: 'France',
	GF: 'French Guiana',
	PF: 'French Polynesia',
	GA: 'Gabon',
	GM: 'Gambia',
	GE: 'Georgia',
	DE: 'Germany',
	GH: 'Ghana',
	GR: 'Greece',
	GL: 'Greenland',
	GD: 'Grenada',
	GP: 'Guadeloupe',
	GU: 'Guam',
	GT: 'Guatemala',
	GN: 'Guinea',
	GW: 'Guinea-Bissau',
	GY: 'Guyana',
	HT: 'Haiti',
	HN: 'Honduras',
	HU: 'Hungary',
	IS: 'Iceland',
	IN: 'India',
	ID: 'Indonesia',
	IR: 'Iran',
	IQ: 'Iraq',
	IE: 'Ireland',
	IL: 'Israel',
	IT: 'Italy',
	JM: 'Jamaica',
	JP: 'Japan',
	JO: 'Jordan',
	KZ: 'Kazakhstan',
	KE: 'Kenya',
	KW: 'Kuwait',
	KG: 'Kyrgyzstan',
	LA: 'Lao PDR',
	LV: 'Latvia',
	LB: 'Lebanon',
	LS: 'Lesotho',
	LR: 'Liberia',
	LY: 'Libya',
	LT: 'Lithuania',
	LU: 'Luxembourg',
	MK: 'Macedonia',
	MG: 'Madagascar',
	MW: 'Malawi',
	MY: 'Malaysia',
	MV: 'Maldives',
	ML: 'Mali',
	MT: 'Malta',
	MH: 'Marshall Islands',
	MQ: 'Martinique',
	MR: 'Mauritania',
	MU: 'Mauritius',
	YT: 'Mayotte',
	MX: 'Mexico',
	MD: 'Moldova',
	MN: 'Mongolia',
	ME: 'Montenegro',
	MS: 'Montserrat',
	MA: 'Morocco',
	MZ: 'Mozambique',
	MM: 'Myanmar',
	NA: 'Namibia',
	NR: 'Nauru',
	NP: 'Nepal',
	NL: 'Netherlands',
	NC: 'New Caledonia',
	NZ: 'New Zealand',
	NI: 'Nicaragua',
	NE: 'Niger',
	NG: 'Nigeria',
	MP: 'Northern Mariana Islands',
	NO: 'Norway',
	OM: 'Oman',
	PK: 'Pakistan',
	PW: 'Palau',
	PS: 'Palestine',
	PA: 'Panama',
	PG: 'Papua New Guinea',
	PY: 'Paraguay',
	PE: 'Peru',
	PH: 'Philippines',
	PL: 'Poland',
	PT: 'Portugal',
	PR: 'Puerto Rico',
	QA: 'Qatar',
	KR: 'Republic of Korea',
	RE: 'Reunion',
	RO: 'Romania',
	RU: 'Russia',
	RW: 'Rwanda',
	KN: 'Saint Kitts and Nevis',
	LC: 'Saint Lucia',
	VC: 'Saint Vincent and the Grenadines',
	BL: 'Saint-Barthélemy',
	MF: 'Saint-Martin',
	WS: 'Samoa',
	ST: 'São Tomé and Principe',
	SA: 'Saudi Arabia',
	SN: 'Senegal',
	RS: 'Serbia',
	SC: 'Seychelles',
	SL: 'Sierra Leone',
	SX: 'Sint Maarten',
	SK: 'Slovakia',
	SI: 'Slovenia',
	SB: 'Solomon Islands',
	SO: 'Somalia',
	ZA: 'South Africa',
	ES: 'Spain',
	LK: 'Sri Lanka',
	BQ: 'St. Eustatius And Saba (Netherlands)',
	SD: 'Sudan',
	SR: 'Suriname',
	SZ: 'Swaziland',
	SE: 'Sweden',
	CH: 'Switzerland',
	SY: 'Syria',
	TW: 'Taiwan',
	TJ: 'Tajikistan',
	TZ: 'Tanzania',
	TH: 'Thailand',
	TL: 'Timor-Leste',
	TG: 'Togo',
	TO: 'Tonga',
	TT: 'Trinidad and Tobago',
	TN: 'Tunisia',
	TR: 'Turkey',
	TM: 'Turkmenistan',
	TC: 'Turks and Caicos Islands',
	TV: 'Tuvalu',
	UG: 'Uganda',
	UA: 'Ukraine',
	AE: 'United Arab Emirates',
	GB: 'United Kingdom',
	US: 'United States',
	VI: 'United States Virgin Islands',
	UY: 'Uruguay',
	UZ: 'Uzbekistan',
	VU: 'Vanuatu',
	VE: 'Venezuela',
	VN: 'Vietnam',
	EH: 'Western Sahara',
	YE: 'Yemen',
	ZM: 'Zambia',
	ZW: 'Zimbabwe',
}
const InteractionTable = ({ tableData }) => {
	useEffect(() => {
		console.log({ tableData: tableData })
	}, [])
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
