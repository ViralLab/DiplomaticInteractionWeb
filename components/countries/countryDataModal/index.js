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
import WorkInProgress from '@/components/utils/workInProgress/WorkInProgress'

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
  const [activePage, setActivePage] = useState(1)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

  const [interactions, setInteractions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [pageMeta, setPageMeta] = useState({
    limit: 20, // rows per page
    offset: 0,
    total: 0,
    hasMore: false,
  })

  const countryName = country?.title || country?.name || ''

  useEffect(() => {
    setActivePage(1)
    setSortField('date')
    setSortDirection('desc')
  }, [modalOpen])

  useEffect(() => {
    if (modalOpen && countryName) {
      setInteractions([])
      setPageMeta({ limit: 20, offset: 0, total: 0, hasMore: false })
      setError(null)
      fetchPage(1) // load first page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, countryName])

  const getCountryCodeFromName = (name) => {
    const c = countries.find(
      (c) =>
        c.name.toLowerCase() === name.toLowerCase() ||
        c.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(c.name.toLowerCase())
    )
    return c ? c.code : null
  }

  const resolveCountryCode = () =>
    country?.code || country?.countryCode || getCountryCodeFromName(countryName)

  const fetchPage = async (page = 1) => {
    const countryCode = resolveCountryCode()
    if (!countryCode) {
      setError('Country code could not be resolved.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const limit = pageMeta.limit || 20
      const offset = (page - 1) * limit
      const url = `/api/country/${countryCode}?limit=${limit}&offset=${offset}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      setInteractions(data?.data || [])
      setPageMeta({
        limit: data?.pagination?.limit ?? limit,
        offset,
        total: data?.pagination?.total ?? 0,
        hasMore: data?.pagination?.hasMore ?? false,
      })
      setActivePage(page)
    } catch (e) {
      console.error('Failed to fetch country data:', e)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // client-side sort of the current page
  const sortedInteractions = [...interactions].sort((a, b) => {
    if (sortField === 'date') {
      const ad = new Date(a.date)
      const bd = new Date(b.date)
      return sortDirection === 'desc' ? bd - ad : ad - bd
    } else if (sortField === 'reporter') {
      return sortDirection === 'desc'
        ? (b.reporterName || '').localeCompare(a.reporterName || '')
        : (a.reporterName || '').localeCompare(b.reporterName || '')
    } else if (sortField === 'reported') {
      return sortDirection === 'desc'
        ? (b.reportedName || '').localeCompare(a.reportedName || '')
        : (a.reportedName || '').localeCompare(b.reportedName || '')
    }
    return 0
  })

  const mentionsTab = (
    <Tab.Pane>
      {loading && interactions.length === 0 ? (
        <Segment placeholder className={styles.workInProgressSegment}>
          <Header icon textAlign="center">
            <Icon name="spinner" loading size="big" />
            Loading Data
            <Header.Subheader>
              Fetching interactions for {countryName}...
            </Header.Subheader>
          </Header>
        </Segment>
      ) : error ? (
        <Segment placeholder className={styles.workInProgressSegment}>
          <Header icon textAlign="center">
            <Icon name="warning circle" size="big" color="red" />
            {error}
          </Header>
        </Segment>
      ) : interactions.length > 0 ? (
        <>
          <div className={styles.tableWrapper}>
            <Table celled compact size="small" className={styles.fittedTable}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    onClick={() => handleSort('reporter')}
                    className={styles.sortableHeader}
                  >
                    Reporter
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={() => handleSort('reported')}
                    className={styles.sortableHeader}
                  >
                    Reported
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={() => handleSort('date')}
                    className={styles.sortableHeader}
                  >
                    Date
                    <span
                      className={`${styles.sortIcon} ${
                        sortField === 'date' ? styles.active : styles.inactive
                      }`}
                    >
                      {sortField === 'date'
                        ? sortDirection === 'desc'
                          ? '▼'
                          : '▲'
                        : '↕'}
                    </span>
                  </Table.HeaderCell>
                  {/* Type column header with Work in Progress note */}
                  <Table.HeaderCell>Type (Work in Progress)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
			  <Table.Body>
				{sortedInteractions.map((item) => (
					<Table.Row key={item.id}>
						<Table.Cell>{item.reporterName|| 'Unknown'}</Table.Cell>
						<Table.Cell>{item.reportedName || 'Unknown'}</Table.Cell>
						<Table.Cell>{item.date || 'Unknown'}</Table.Cell>
						{/* Show dash until type is available */}
						<Table.Cell>-</Table.Cell>
					</Table.Row>
				))}
			  </Table.Body>
            </Table>
          </div>

          <div className={styles.paginationWrapper}>
            <div
              style={{ marginBottom: '0.25rem', color: '#666', fontSize: '0.85em' }}
            >
              Page {activePage} of {Math.ceil(pageMeta.total / pageMeta.limit) || 1}
              &nbsp; | &nbsp; {pageMeta.total} total interactions
            </div>

            <Pagination
              activePage={activePage}
              totalPages={Math.ceil(pageMeta.total / pageMeta.limit) || 1}
              onPageChange={(e, { activePage: next }) => {
                fetchPage(next)
              }}
              size="mini"
              boundaryRange={1}
              siblingRange={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
            />
          </div>
        </>
      ) : (
        <Segment placeholder className={styles.workInProgressSegment}>
          <Header icon textAlign="center">
            <Icon name="info circle" size="big" />
            No Interactions Found
            <Header.Subheader>
              No interaction data available for this country.
            </Header.Subheader>
          </Header>
        </Segment>
      )}
    </Tab.Pane>
  )

  const panes = [
    { menuItem: 'Mentions', render: () => mentionsTab },
    { menuItem: 'Interactions', render: () => <Tab.Pane><WorkInProgress /></Tab.Pane> },
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
