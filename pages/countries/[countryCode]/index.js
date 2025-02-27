import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Segment, Label, Dropdown } from 'semantic-ui-react'
import InteractionTable from '@components/interactionTable'
import InteractionNetwork from '@/components/interactionNetwork'
import InteractionCartography from '@/components/interactionCartography'
import styles from './countryCode.module.css'

export const getServerSideProps = async (context) => {
	const countryCode = (context.params?.countryCode ?? '').toString()
	const res = await fetch('http://localhost:3000/api/countries/' + countryCode)
	const data = await res.json()
	if (data == null) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		}
	}
	return { props: { data } }
}
const CountryInteraction = ({ data }) => {
	const router = useRouter()
	const { countryCode } = router.query
	const invertedCamelCodeDict = {
		AL: 'albania',
		DZ: 'algeria',
		AS: 'americanSamoa',
		AO: 'angola',
		AI: 'anguilla',
		AG: 'antiguaAndBarbuda',
		AR: 'argentina',
		AM: 'armenia',
		AW: 'aruba',
		AU: 'australia',
		AT: 'austria',
		AZ: 'azerbaijan',
		BS: 'bahamas',
		BH: 'bahrain',
		BD: 'bangladesh',
		BB: 'barbados',
		BY: 'belarus',
		BE: 'belgium',
		BZ: 'belize',
		BJ: 'benin',
		BM: 'bermuda',
		BT: 'bhutan',
		BO: 'bolivia',
		BA: 'bosniaAndHerzegovina',
		BW: 'botswana',
		BR: 'brazil',
		VG: 'britishVirginIslands',
		BN: 'bruneiDarussalam',
		BG: 'bulgaria',
		BF: 'burkinaFaso',
		BI: 'burundi',
		KH: 'cambodia',
		CM: 'cameroon',
		CA: 'canada',
		CV: 'capeVerde',
		KY: 'caymanIslands',
		CF: 'centralAfricanRepublic',
		TD: 'chad',
		CL: 'chile',
		CN: 'china',
		CO: 'colombia',
		KM: 'comoros',
		CG: 'congo',
		CR: 'costaRica',
		HR: 'croatia',
		CU: 'cuba',
		CW: 'curacao',
		CY: 'cyprus',
		CZ: 'czechRepublic',
		KP: 'demRepKorea',
		DK: 'denmark',
		DJ: 'djibouti',
		DM: 'dominica',
		DO: 'dominicanRepublic',
		EC: 'ecuador',
		EG: 'egypt',
		SV: 'elSalvador',
		GQ: 'equatorialGuinea',
		ER: 'eritrea',
		EE: 'estonia',
		ET: 'ethiopia',
		FO: 'faeroeIslands',
		FK: 'falklandIslands',
		FM: 'federatedStatesOfMicronesia',
		FJ: 'fiji',
		FI: 'finland',
		FR: 'france',
		GF: 'frenchGuiana',
		PF: 'frenchPolynesia',
		GA: 'gabon',
		GM: 'gambia',
		GE: 'georgia',
		DE: 'germany',
		GH: 'ghana',
		GR: 'greece',
		GL: 'greenland',
		GD: 'grenada',
		GP: 'guadeloupe',
		GU: 'guam',
		GT: 'guatemala',
		GN: 'guinea',
		GW: 'guineaBissau',
		GY: 'guyana',
		HT: 'haiti',
		HN: 'honduras',
		HU: 'hungary',
		IS: 'iceland',
		IN: 'india',
		ID: 'indonesia',
		IR: 'iran',
		IQ: 'iraq',
		IE: 'ireland',
		IL: 'israel',
		IT: 'italy',
		JM: 'jamaica',
		JP: 'japan',
		JO: 'jordan',
		KZ: 'kazakhstan',
		KE: 'kenya',
		KW: 'kuwait',
		KG: 'kyrgyzstan',
		LA: 'laoPDR',
		LV: 'latvia',
		LB: 'lebanon',
		LS: 'lesotho',
		LR: 'liberia',
		LY: 'libya',
		LT: 'lithuania',
		LU: 'luxembourg',
		MK: 'macedonia',
		MG: 'madagascar',
		MW: 'malawi',
		MY: 'malaysia',
		MV: 'maldives',
		ML: 'mali',
		MT: 'malta',
		MH: 'marshallIslands',
		MQ: 'martinique',
		MR: 'mauritania',
		MU: 'mauritius',
		YT: 'mayotte',
		MX: 'mexico',
		MD: 'moldova',
		MN: 'mongolia',
		ME: 'montenegro',
		MS: 'montserrat',
		MA: 'morocco',
		MZ: 'mozambique',
		MM: 'myanmar',
		NA: 'namibia',
		NR: 'nauru',
		NP: 'nepal',
		NL: 'netherlands',
		NC: 'newCaledonia',
		NZ: 'newZealand',
		NI: 'nicaragua',
		NE: 'niger',
		NG: 'nigeria',
		MP: 'northernMarianaIslands',
		NO: 'norway',
		OM: 'oman',
		PK: 'pakistan',
		PW: 'palau',
		PS: 'palestine',
		PA: 'panama',
		PG: 'papuaNewGuinea',
		PY: 'paraguay',
		PE: 'peru',
		PH: 'philippines',
		PL: 'poland',
		PT: 'portugal',
		PR: 'puertoRico',
		QA: 'qatar',
		KR: 'republicOfKorea',
		RE: 'reunion',
		RO: 'romania',
		RU: 'russia',
		RW: 'rwanda',
		KN: 'saintKittsAndNevis',
		LC: 'saintLucia',
		VC: 'saintVincentAndTheGrenadines',
		BL: 'saintBarthelemy',
		MF: 'saintMartin',
		WS: 'samoa',
		ST: 'saoTomeAndPrincipe',
		SA: 'saudiArabia',
		SN: 'senegal',
		RS: 'serbia',
		SC: 'seychelles',
		SL: 'sierraLeone',
		SX: 'sintMaarten',
		SK: 'slovakia',
		SI: 'slovenia',
		SB: 'solomonIslands',
		SO: 'somalia',
		ZA: 'southAfrica',
		ES: 'spain',
		LK: 'sriLanka',
		BQ: 'sabaNetherlands',
		SD: 'sudan',
		SR: 'suriname',
		SZ: 'swaziland',
		SE: 'sweden',
		CH: 'switzerland',
		SY: 'syria',
		TW: 'taiwan',
		TJ: 'tajikistan',
		TZ: 'tanzania',
		TH: 'thailand',
		TL: 'timorLeste',
		TG: 'togo',
		TO: 'tonga',
		TT: 'trinidadAndTobago',
		TN: 'tunisia',
		TR: 'turkey',
		TM: 'turkmenistan',
		TC: 'turksaAndCaicosIslands',
		TV: 'tuvalu',
		UG: 'uganda',
		UA: 'ukraine',
		AE: 'unitedArabEmirates',
		GB: 'unitedKingdom',
		US: 'unitedStates',
		VI: 'unitedStatesVirginIslands',
		UY: 'uruguay',
		UZ: 'uzbekistan',
		VU: 'vanuatu',
		VE: 'venezuela',
		VN: 'vietnam',
		EH: 'westernSahara',
		YE: 'yemen',
		ZM: 'zambia',
		ZW: 'zimbabwe',
	}
	const countryName = invertedCamelCodeDict[countryCode.toUpperCase()]

	const [visualizationFilters, setVisualizationFilters] = useState([])
	const [interactionData, setInteractionData] = useState(data)
	const visualizationOptions = [
		{ key: 'table', text: 'Table', value: 'table' },
		{ key: 'network', text: 'Network', value: 'network' },
		{ key: 'cartography', text: 'Cartography', value: 'cartography' },
	]
	const reportOptions = [
		{ key: 'all', text: 'All', value: 'all' },
		{ key: 'reporter', text: 'Reporter', value: 'reporter' },
		{ key: 'reported', text: 'Reported', value: 'reported' },
	]
	function filterInteractionData(reportType) {
		if (reportType === 'all') {
			setInteractionData(data)
		} else {
			setInteractionData(
				data.filter((item) => item[reportType] === countryName)
			)
		}
	}
	return (
		<div>
			<Segment raised className={styles.filterSegment}>
				<Dropdown
					placeholder='Visualize With'
					fluid
					multiple
					selection
					options={visualizationOptions}
					onChange={(e, data) => setVisualizationFilters(data.value)}
				/>
				<Dropdown
					placeholder='Report Type'
					fluid
					selection
					options={reportOptions}
					onChange={(e, data) => filterInteractionData(data.value)}
				/>
			</Segment>
			<div className={styles.interactionVisContainer}>
				{visualizationFilters.includes('table') && (
					<Segment raised>
						<Label as='div' color='teal' ribbon size='medium'>
							Table Visualization
						</Label>
						<InteractionTable tableData={interactionData} />
					</Segment>
				)}
				{visualizationFilters.includes('network') && (
					<Segment raised>
						<Label as='div' color='teal' ribbon size='medium'>
							Network Visualization
						</Label>
						<InteractionNetwork networkData={interactionData} />
					</Segment>
				)}
				{visualizationFilters.includes('cartography') && (
					<Segment raised>
						<Label as='div' color='teal' ribbon size='medium'>
							Cartography Visualization
						</Label>
						<InteractionCartography
							cartographyData={interactionData}
							countries={[countryName]}
						/>
					</Segment>
				)}
			</div>
		</div>
	)
}

export default CountryInteraction
