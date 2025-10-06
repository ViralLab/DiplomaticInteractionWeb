import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Modal,
  Table,
  Pagination,
  Tab,
  Segment,
  Header,
  Icon,
  Dropdown,
  Button,
} from 'semantic-ui-react'
import styles from './countryDataModal.module.css'
import countries from '../../../data/countries.js'
import WorkInProgress from '@/components/utils/workInProgress/WorkInProgress'
import CountryFlag from '@/components/countries/countryFlag'

const CountryDataModal = ({ country, modalOpen, onModalClose }) => {
  const [activePage, setActivePage] = useState(1)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

  const [interactions, setInteractions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [pageMeta, setPageMeta] = useState({
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: false,
  })

  // cache to store fetched pages
  const [pageCache, setPageCache] = useState({})
  const latestRequestKeyRef = useRef(null)

  // Multi-country series state
  const [selectedCountries, setSelectedCountries] = useState([])
  const [multiSeries, setMultiSeries] = useState([])
  const [multiLoading, setMultiLoading] = useState(false)
  const [multiError, setMultiError] = useState(null)
  const [loadingCountries, setLoadingCountries] = useState([])

  const countryName = country?.title || country?.name || ''

  useEffect(() => {
    setActivePage(1)
    setSortField('date')
    setSortDirection('desc')
    setPageCache({})
    setSelectedCountries([])
    setMultiSeries([])
    setMultiError(null)
    setLoadingCountries([])
  }, [modalOpen])

  useEffect(() => {
    if (modalOpen && countryName) {
      setInteractions([])
      setPageMeta({ limit: 20, offset: 0, total: 0, hasMore: false })
      setError(null)
      fetchPage(1) // load first page
    }
  }, [modalOpen, countryName])

  // Fetch multi-country series when selected countries change
  useEffect(() => {
    const countryCode = resolveCountryCode()
    if (!countryCode || selectedCountries.length === 0) {
      setMultiSeries([])
      return
    }
    fetchMultiSeries(countryCode, selectedCountries)
  }, [selectedCountries])

  const getCountryCodeFromName = (name) => {
    const c = countries.find(
      (c) =>
        c.name.toLowerCase() === name.toLowerCase() ||
        c.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(c.name.toLowerCase())
    )
    return c ? c.countryCode : null
  }

  const resolveCountryCode = () => {
    // First try direct country code from the country object
    if (country?.code) return country.code;
    if (country?.countryCode) return country.countryCode;
    
    // Then try to find by name in static countries data
    const staticCountryCode = getCountryCodeFromName(countryName);
    if (staticCountryCode) return staticCountryCode;
    
    // If not found, return null to trigger error
    return null;
  }

  const fetchMultiSeries = async (baseCountry, countries) => {
    try {
      setMultiLoading(true);
      setMultiError(null);
      setMultiSeries([]);
      setLoadingCountries([...countries]); // Track which countries are being loaded
      
      const url = `/api/mentions/multi?baseCountry=${encodeURIComponent(baseCountry)}&countries=${countries.join(',')}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMultiSeries(Array.isArray(data.countrySeries) ? data.countrySeries : []);
    } catch (e) {
      console.error('Failed to fetch multi-country series:', e);
      setMultiError('Failed to load multi-country series.');
    } finally {
      setMultiLoading(false);
      setLoadingCountries([]); // Clear loading countries
    }
  };

  // Color palette for different countries
  const getCountryColor = (index) => {
    const colors = [
      '#4aa89d', // Teal
      '#e74c3c', // Red
      '#3498db', // Blue
      '#f39c12', // Orange
      '#9b59b6', // Purple
      '#2ecc71', // Green
      '#e67e22', // Dark Orange
      '#34495e', // Dark Blue
      '#f1c40f', // Yellow
      '#1abc9c', // Light Teal
    ];
    return colors[index % colors.length];
  };

  const fetchPage = async (page = 1, prefetch = false, sortOverride = null) => {
    const countryCode = resolveCountryCode()
    if (!countryCode) {
      setError('Country code could not be resolved.')
      return
    }

    const sortParam = sortOverride?.field || sortField
    const orderParam = sortOverride?.direction || sortDirection

    // if cached already for current sort
    if (pageCache[page] && pageCache[page].sort && pageCache[page].sort.field === sortParam && pageCache[page].sort.direction === orderParam) {
      if (!prefetch) {
        setInteractions(pageCache[page].data)
        setPageMeta(pageCache[page].pageMeta)
        setActivePage(page)
      }
      return
    }

    if (!prefetch) setLoading(true)
    setError(null)

    try {
      const limit = pageMeta.limit || 20
      const offset = (page - 1) * limit
      const requestKey = `${countryCode}:${page}:${sortParam}:${orderParam}`
      if (!prefetch) {
        latestRequestKeyRef.current = requestKey
      }
      const url = `/api/country/${countryCode}?limit=${limit}&offset=${offset}&sort=${encodeURIComponent(sortParam)}&order=${encodeURIComponent(orderParam)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      const newPageMeta = {
        limit: data?.pagination?.limit ?? limit,
        offset,
        total: data?.pagination?.total ?? 0,
        hasMore: data?.pagination?.hasMore ?? false,
      }

      // store in cache with sort signature
      setPageCache(prev => ({
        ...prev,
        [page]: { data: data?.data || [], pageMeta: newPageMeta, sort: { field: sortParam, direction: orderParam } }
      }))

      if (!prefetch) {
        if (latestRequestKeyRef.current !== requestKey) {
          // stale response, ignore
          return
        }
        setInteractions(data?.data || [])
        setPageMeta(newPageMeta)
        setActivePage(page)
      }
    } catch (e) {
      if (!prefetch) {
        console.error('Failed to fetch country data:', e)
        setError('Failed to fetch data. Please try again.')
      }
    } finally {
      if (!prefetch) setLoading(false)
    }
  }

  // prefetch next 3 pages in background
  useEffect(() => {
    if (activePage > 0 && pageMeta.total > 0) {
      for (let i = 1; i <= 3; i++) {
        const nextPage = activePage + i
        const totalPages = Math.ceil(pageMeta.total / (pageMeta.limit || 20))
        if (nextPage <= totalPages && !pageCache[nextPage]) {
          fetchPage(nextPage, true) // background fetch
        }
      }
    }
  }, [activePage, pageMeta.total])

  const handleSort = (field) => {
    let nextField = field
    let nextDirection = 'desc'
    if (sortField === field) {
      nextDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    }
    setSortField(nextField)
    setSortDirection(nextDirection)
    setPageCache({})
    setActivePage(1)
    fetchPage(1, false, { field: nextField, direction: nextDirection })
  }

  const sortedInteractions = interactions // server provides sorted list

  const MultiSeriesChart = ({ baseCountry, countrySeries, loading, error, onRetry, loadingCountries }) => {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const update = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.clientWidth);
        }
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);

    const dims = useMemo(() => {
      const width = Math.max(500, containerWidth || 700);
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 36, left: 48 };
      return { width, height, margin, innerWidth: width - margin.left - margin.right, innerHeight: height - margin.top - margin.bottom };
    }, [containerWidth]);

    const { xScale, yScale, ticks, paths } = useMemo(() => {
      // Collect all years and counts from all series
      const allYears = new Set();
      const allCounts = [];
      
      countrySeries.forEach(countryData => {
        countryData.series.forEach(point => {
          allYears.add(point.year);
          allCounts.push(point.count);
        });
      });

      const years = Array.from(allYears).sort((a, b) => a - b);
      const minYear = years.length ? Math.min(...years) : new Date().getFullYear() - 5;
      const maxYear = years.length ? Math.max(...years) : new Date().getFullYear();
      const maxCountRaw = allCounts.length ? Math.max(...allCounts) : 1;
      const yMax = Math.max(1, maxCountRaw);

      const xScaleFn = (y) => {
        if (maxYear === minYear) return dims.margin.left + dims.innerWidth / 2;
        return dims.margin.left + ((y - minYear) / (maxYear - minYear)) * dims.innerWidth;
      };
      const yScaleFn = (c) => {
        return dims.margin.top + dims.innerHeight - (c / yMax) * dims.innerHeight;
      };

      // Create paths for each country
      const countryPaths = countrySeries.map((countryData, index) => {
        const sorted = [...countryData.series].sort((a, b) => a.year - b.year);
        const d = sorted.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${xScaleFn(p.year)} ${yScaleFn(p.count)}`).join(' ');
        return {
          countryCode: countryData.countryCode,
          path: d,
          points: sorted,
          color: getCountryColor(index)
        };
      });

      const ticksArr = [];
      for (let y = minYear; y <= maxYear; y++) ticksArr.push(y);
      
      // Build integer y-axis ticks with a nice step
      const step = Math.max(1, Math.ceil(yMax / 4));
      const yTicks = [];
      for (let v = 0; v <= yMax; v += step) yTicks.push(v);
      if (yTicks[yTicks.length - 1] !== yMax) yTicks.push(yMax);
      
      return { 
        xScale: xScaleFn, 
        yScale: yScaleFn, 
        ticks: { years: ticksArr, y: yTicks, yMax }, 
        paths: countryPaths 
      };
    }, [countrySeries, dims]);

    const totalMentions = countrySeries.reduce((sum, countryData) => sum + countryData.total, 0);

    return (
      <div className={styles.chartCard} ref={containerRef}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>Mentions of {countryName} by selected countries</div>
          <div className={styles.chartSub}>
            Year by year • Total: {totalMentions} mentions
            {loadingCountries.length > 0 && (
              <span className={styles.loadingIndicator}>
                <Icon name='spinner' loading size='small' /> Loading {loadingCountries.length} countries...
              </span>
            )}
          </div>
        </div>
        {loading ? (
          <div className={styles.chartLoading}><Icon name='spinner' loading /> Loading multi-country series…</div>
        ) : error ? (
          <div className={styles.chartError}>
            <Icon name='warning circle' /> {error}
            <Button size='tiny' basic onClick={onRetry} style={{ marginLeft: '0.75rem' }}>Retry</Button>
          </div>
        ) : countrySeries.length === 0 || totalMentions === 0 ? (
          <div className={styles.chartEmpty}><Icon name='info circle' /> No mentions found for selected countries.</div>
        ) : (
          <>
            <svg
              className={styles.chartSvg}
              width="100%"
              height={dims.height}
              viewBox={`0 0 ${dims.width} ${dims.height}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {paths.map((pathData, index) => (
                  <linearGradient key={`grad-${pathData.countryCode}`} id={`lineGrad-${pathData.countryCode}`} x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor={pathData.color} stopOpacity='1' />
                    <stop offset='100%' stopColor={pathData.color} stopOpacity='0.8' />
                  </linearGradient>
                ))}
              </defs>
              <rect x='0' y='0' width={dims.width} height={dims.height} rx='12' ry='12' fill='white' />
              {/* Y grid */}
              {ticks.y.map((yVal, idx) => {
                const y = dims.margin.top + dims.innerHeight - (yVal / ticks.yMax) * dims.innerHeight;
                return (
                  <g key={idx}>
                    <line x1={dims.margin.left} x2={dims.margin.left + dims.innerWidth} y1={y} y2={y} stroke='#edf2f7' />
                    <text x={dims.margin.left - 10} y={y} textAnchor='end' dominantBaseline='middle' className={styles.axisLabel}>{yVal}</text>
                  </g>
                );
              })}
              {/* X axis */}
              {ticks.years.map((yr, i) => (
                <g key={yr}>
                  <line x1={xScale(yr)} x2={xScale(yr)} y1={dims.margin.top + dims.innerHeight} y2={dims.margin.top + dims.innerHeight + 6} stroke='#cbd5e0' />
                  {(i === 0 || i === ticks.years.length - 1 || (yr % 2 === 0)) && (
                    <text x={xScale(yr)} y={dims.margin.top + dims.innerHeight + 20} textAnchor='middle' className={styles.axisLabel}>{yr}</text>
                  )}
                </g>
              ))}
              {/* Lines for each country */}
              {paths.map((pathData) => (
                <g key={pathData.countryCode}>
                  <path d={pathData.path} fill='none' stroke={`url(#lineGrad-${pathData.countryCode})`} strokeWidth='3' />
                  {/* Points */}
                  {pathData.points.map((p) => (
                    <g key={`${pathData.countryCode}-${p.year}`}>
                      <circle cx={xScale(p.year)} cy={yScale(p.count)} r='4' fill={pathData.color} />
                      <title>{`${pathData.countryCode} - ${p.year}: ${p.count}`}</title>
                    </g>
                  ))}
                </g>
              ))}
            </svg>
            {/* Legend */}
            <div className={styles.chartLegend}>
              {paths.map((pathData) => {
                const countryData = countrySeries.find(cs => cs.countryCode === pathData.countryCode);
                const countryInfo = countries.find(c => c.countryCode === pathData.countryCode);
                return (
                  <div key={pathData.countryCode} className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ backgroundColor: pathData.color }}></div>
                    <span className={styles.legendText}>
                      {countryInfo?.name || pathData.countryCode} ({countryData?.total || 0} mentions)
                    </span>
                  </div>
                );
              })}
              {/* Show loading states for countries that are being loaded */}
              {loadingCountries.map((countryCode) => {
                const countryInfo = countries.find(c => c.countryCode === countryCode);
                const countryIndex = loadingCountries.indexOf(countryCode);
                return (
                  <div key={`loading-${countryCode}`} className={styles.legendItem}>
                    <div className={styles.legendColorLoading}>
                      <Icon name='spinner' loading size='small' />
                    </div>
                    <span className={styles.legendText}>
                      {countryInfo?.name || countryCode} (Loading...)
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

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
          {loading && interactions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '0.5rem' }}>
              <Icon name="spinner" loading />
              <span>Updating…</span>
            </div>
          )}
          <div className={styles.tableWrapper}>
            <Table celled compact size="small" className={styles.fittedTable}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    onClick={() => { if (!loading) handleSort('reporter') }}
                    className={styles.sortableHeader}
                  >
                    Reporter
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={() => { if (!loading) handleSort('reported') }}
                    className={styles.sortableHeader}
                  >
                    Reported
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={() => { if (!loading) handleSort('date') }}
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
                  <Table.HeaderCell style={{ color: '#999', fontWeight: 'normal' }}>
                    Type (Work in Progress)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sortedInteractions.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.reporterName || 'Unknown'}</Table.Cell>
                    <Table.Cell>{item.reportedName || 'Unknown'}</Table.Cell>
                    <Table.Cell>{item.date || 'Unknown'}</Table.Cell>
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

  const timeSeriesTab = (
    <Tab.Pane>
      <div className={styles.pairControls}>
        <div className={styles.pairControlsRow}>
          <div className={styles.pairTitle}>Time series: mentions of {countryName} by other countries</div>
          <Dropdown
            placeholder='Select countries to compare'
            selection
            multiple
            clearable
            value={selectedCountries}
            className={styles.countryDropdown}
            options={countries
              .filter(c => c.countryCode !== (country?.code || country?.countryCode))
              .map(c => ({ key: c.countryCode, value: c.countryCode, text: `${c.name} (${c.countryCode})` }))}
            onChange={(e, { value }) => setSelectedCountries(value || [])}
            noResultsMessage='No countries found'
          />
        </div>
      </div>

      {selectedCountries.length > 0 ? (
        <MultiSeriesChart
          baseCountry={country?.code || country?.countryCode}
          countrySeries={multiSeries}
          loading={multiLoading}
          error={multiError}
          onRetry={() => fetchMultiSeries(country?.code || country?.countryCode, selectedCountries)}
          loadingCountries={loadingCountries}
        />
      ) : (
        <Segment placeholder className={styles.workInProgressSegment}>
          <Header icon textAlign="center">
            <Icon name="search" size="big" />
            Select countries to compare
            <Header.Subheader>
              Use the dropdown above to select multiple countries and see year-by-year mentions.
            </Header.Subheader>
          </Header>
        </Segment>
      )}
    </Tab.Pane>
  )

  const panes = [
    { menuItem: 'Mentions', render: () => mentionsTab },
    { menuItem: 'Interactions', render: () => <Tab.Pane><WorkInProgress /></Tab.Pane> },
    { menuItem: 'Time Series', render: () => timeSeriesTab },
  ]

  return (
    <Modal open={modalOpen} onClose={onModalClose} size="large">
      <Modal.Header className={styles.modalHeader}>
        <div className={styles.headerContent}>
          <CountryFlag 
            name={countryName} 
            countryCode={country?.code || country?.countryCode} 
            fontSize={32}
          />
          <span className={styles.countryName}>{countryName}</span>
        </div>
      </Modal.Header>
      <Modal.Content>
        <Tab panes={panes} />
      </Modal.Content>
    </Modal>
  )
}

export default CountryDataModal
