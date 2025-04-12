import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Segment, Label, Dropdown } from 'semantic-ui-react'
import InteractionTable from '@components/interactionTable'
import InteractionNetwork from '@/components/interactionNetwork'
import InteractionCartography from '@/components/interactionCartography'
import styles from './countryCode.module.css'
import { invertedCamelCodeDict } from '../../data/countries/invertedCamelCaseDict'
import interactions from '../../data/interactions'

export default function CountryPage({ countryData }) {
  const router = useRouter()
  const { countryCode } = router.query

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const countryName = invertedCamelCodeDict[countryCode.toUpperCase()]

  const [visualizationFilters, setVisualizationFilters] = useState([])
  const [interactionData, setInteractionData] = useState(countryData)
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
      setInteractionData(countryData)
    } else {
      setInteractionData(
        countryData.filter((item) => item[reportType] === countryName)
      )
    }
  }

  return (
    <div>
      <h1>Country Data for {countryCode}</h1>
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

export async function getStaticPaths() {
  if (!invertedCamelCodeDict) {
    console.error('Country code dictionary is undefined')
    return {
      paths: [],
      fallback: false
    }
  }

  const countryCodes = Object.keys(invertedCamelCodeDict)
  
  return {
    paths: countryCodes.map(code => ({ 
      params: { 
        countryCode: code.toLowerCase() 
      } 
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { countryCode } = params
  
  if (!invertedCamelCodeDict) {
    return {
      notFound: true
    }
  }

  const countryName = invertedCamelCodeDict[countryCode.toUpperCase()]
  
  if (!countryName) {
    return {
      notFound: true
    }
  }
  
  const countryData = interactions.filter(
    item => item.reporter === countryName || item.reported === countryName
  )
  
  return {
    props: {
      countryData
    }
  }
} 