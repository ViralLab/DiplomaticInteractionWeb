import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { 
  Table, 
  Pagination, 
  Tab, 
  Segment, 
  Header, 
  Icon, 
  Loader, 
  Dimmer,
  Button,
  Dropdown,
} from 'semantic-ui-react';
import CountryFlag from '@/components/countries/countryFlag';
import countriesData from '@/data/countries';
import WorkInProgress from '@/components/utils/workInProgress/WorkInProgress';
import NetworkGraph from '@/components/map/networkGraph';
import styles from './countryDetail.module.css';

const CountryPage = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  
  const [activePage, setActivePage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  // Pairwise series state
  const [secondCountry, setSecondCountry] = useState(null);
  const [pairSeries, setPairSeries] = useState([]);
  const [pairLoading, setPairLoading] = useState(false);
  const [pairError, setPairError] = useState(null);
  
  const [pageMeta, setPageMeta] = useState({
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: false,
  });

  // cache to store fetched pages
  const [pageCache, setPageCache] = useState({});

  // Get country information from countries data
  useEffect(() => {
    if (countryCode) {
      const country = countriesData.find(c => c.countryCode === countryCode);
      setCountryInfo(country);
    }
  }, [countryCode]);

  // Fetch pairwise series when second country changes
  useEffect(() => {
    if (!countryCode || !secondCountry) return;
    fetchPairSeries(countryCode, secondCountry);
  }, [countryCode, secondCountry]);

  const fetchPairSeries = async (a, b) => {
    try {
      setPairLoading(true);
      setPairError(null);
      setPairSeries([]);
      const url = `/api/mentions/pair?countryA=${encodeURIComponent(a)}&countryB=${encodeURIComponent(b)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPairSeries(Array.isArray(data.series) ? data.series : []);
    } catch (e) {
      console.error('Failed to fetch pair series:', e);
      setPairError('Failed to load pairwise series.');
    } finally {
      setPairLoading(false);
    }
  };

  const PairSeriesChart = ({ countryA, countryB, series, loading, error, onRetry }) => {
    const containerRef = useRef(null);
    const dims = useMemo(() => {
      const width = 800;
      const height = 260;
      const margin = { top: 24, right: 24, bottom: 36, left: 48 };
      return { width, height, margin, innerWidth: width - margin.left - margin.right, innerHeight: height - margin.top - margin.bottom };
    }, []);

    const { xScale, yScale, ticks, pathD } = useMemo(() => {
      const years = series.map(d => d.year);
      const counts = series.map(d => d.count);
      const minYear = years.length ? Math.min(...years) : new Date().getFullYear() - 5;
      const maxYear = years.length ? Math.max(...years) : new Date().getFullYear();
      const maxCount = counts.length ? Math.max(...counts) : 1;

      const xScaleFn = (y) => {
        if (maxYear === minYear) return dims.margin.left + dims.innerWidth / 2;
        return dims.margin.left + ((y - minYear) / (maxYear - minYear)) * dims.innerWidth;
      };
      const yScaleFn = (c) => {
        return dims.margin.top + dims.innerHeight - (c / Math.max(maxCount, 1)) * dims.innerHeight;
      };

      const sorted = [...series].sort((a, b) => a.year - b.year);
      const d = sorted.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${xScaleFn(p.year)} ${yScaleFn(p.count)}`).join(' ');
      const ticksArr = [];
      for (let y = minYear; y <= maxYear; y++) ticksArr.push(y);
      return { xScale: xScaleFn, yScale: yScaleFn, ticks: { years: ticksArr, maxCount }, pathD: d };
    }, [series, dims]);

    return (
      <div className={styles.chartCard} ref={containerRef}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>Mentions between {countryA} and {countryB}</div>
          <div className={styles.chartSub}>Year by year</div>
        </div>
        {loading ? (
          <div className={styles.chartLoading}><Icon name='spinner' loading /> Loading pairwise series…</div>
        ) : error ? (
          <div className={styles.chartError}>
            <Icon name='warning circle' /> {error}
            <Button size='tiny' basic onClick={onRetry} style={{ marginLeft: '0.75rem' }}>Retry</Button>
          </div>
        ) : series.length === 0 ? (
          <div className={styles.chartEmpty}><Icon name='info circle' /> No mentions between selected countries.</div>
        ) : (
          <svg width={dims.width} height={dims.height} className={styles.chartSvg}>
            <defs>
              <linearGradient id='lineGrad' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor='#4aa89d' stopOpacity='1' />
                <stop offset='100%' stopColor='#5bb8ad' stopOpacity='1' />
              </linearGradient>
            </defs>
            <rect x='0' y='0' width={dims.width} height={dims.height} rx='12' ry='12' fill='white' />
            {/* Y grid */}
            {Array.from({ length: 4 }).map((_, idx) => {
              const yVal = (ticks.maxCount * idx) / 4;
              const y = dims.margin.top + dims.innerHeight - (yVal / Math.max(ticks.maxCount, 1)) * dims.innerHeight;
              return (
                <g key={idx}>
                  <line x1={dims.margin.left} x2={dims.margin.left + dims.innerWidth} y1={y} y2={y} stroke='#edf2f7' />
                  <text x={dims.margin.left - 10} y={y} textAnchor='end' dominantBaseline='middle' className={styles.axisLabel}>{Math.round(yVal)}</text>
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
            {/* Line */}
            <path d={pathD} fill='none' stroke='url(#lineGrad)' strokeWidth='3' />
            {/* Points */}
            {series.sort((a,b)=>a.year-b.year).map((p) => (
              <g key={p.year}>
                <circle cx={xScale(p.year)} cy={yScale(p.count)} r='4' fill='#4aa89d' />
                <title>{`${p.year}: ${p.count}`}</title>
              </g>
            ))}
          </svg>
        )}
      </div>
    );
  };

  // Reset pagination and sorting when country changes
  useEffect(() => {
    setActivePage(1);
    setSortField('date');
    setSortDirection('desc');
    setPageCache({});
    setSecondCountry(null);
    setPairSeries([]);
    setPairError(null);
  }, [countryCode]);

  // Fetch country-specific data
  useEffect(() => {
    if (countryCode && countryInfo) {
      setInteractions([]);
      setPageMeta({ limit: 20, offset: 0, total: 0, hasMore: false });
      setError(null);
      fetchPage(1); // load first page
    }
  }, [countryCode, countryInfo]);

  const fetchPage = async (page = 1, prefetch = false) => {
    if (!countryCode) {
      setError('Country code is required.');
      return;
    }

    // if cached already
    if (pageCache[page]) {
      if (!prefetch) {
        setInteractions(pageCache[page].data);
        setPageMeta(pageCache[page].pageMeta);
        setActivePage(page);
      }
      return;
    }

    if (!prefetch) setLoading(true);
    setError(null);

    try {
      const limit = pageMeta.limit || 20;
      const offset = (page - 1) * limit;
      const url = `/api/country/${countryCode}?limit=${limit}&offset=${offset}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const newPageMeta = {
        limit: data?.pagination?.limit ?? limit,
        offset,
        total: data?.pagination?.total ?? 0,
        hasMore: data?.pagination?.hasMore ?? false,
      };

      // store in cache
      setPageCache(prev => ({
        ...prev,
        [page]: { data: data?.data || [], pageMeta: newPageMeta }
      }));

      if (!prefetch) {
        setInteractions(data?.data || []);
        setPageMeta(newPageMeta);
        setActivePage(page);
      }
    } catch (e) {
      if (!prefetch) {
        console.error('Failed to fetch country data:', e);
        setError('Failed to fetch data. Please try again.');
      }
    } finally {
      if (!prefetch) setLoading(false);
    }
  };

  // prefetch next 3 pages in background
  useEffect(() => {
    if (activePage > 0 && pageMeta.total > 0) {
      for (let i = 1; i <= 3; i++) {
        const nextPage = activePage + i;
        const totalPages = Math.ceil(pageMeta.total / (pageMeta.limit || 20));
        if (nextPage <= totalPages && !pageCache[nextPage]) {
          fetchPage(nextPage, true); // background fetch
        }
      }
    }
  }, [activePage, pageMeta.total]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedInteractions = [...interactions].sort((a, b) => {
    if (sortField === 'date') {
      const ad = new Date(a.date);
      const bd = new Date(b.date);
      return sortDirection === 'desc' ? bd - ad : ad - bd;
    } else if (sortField === 'reporter') {
      return sortDirection === 'desc'
        ? (b.reporterName || '').localeCompare(a.reporterName || '')
        : (a.reporterName || '').localeCompare(b.reporterName || '');
    } else if (sortField === 'reported') {
      return sortDirection === 'desc'
        ? (b.reportedName || '').localeCompare(a.reportedName || '')
        : (a.reportedName || '').localeCompare(b.reportedName || '');
    }
    return 0;
  });

  const handleBackToCountries = () => {
    router.push('/interactions-mentions');
  };

  const mentionsTab = (
    <Tab.Pane>
      <div className={styles.pairControls}>
        <div className={styles.pairControlsRow}>
          <div className={styles.pairTitle}>Compare mentions with another country</div>
          <Dropdown
            placeholder='Select second country'
            selection
            clearable
            value={secondCountry}
            className={styles.countryDropdown}
            options={countriesData
              .filter(c => c.countryCode !== countryCode)
              .map(c => ({ key: c.countryCode, value: c.countryCode, text: `${c.name} (${c.countryCode})` }))}
            onChange={(e, { value }) => setSecondCountry(value || null)}
            noResultsMessage='No countries found'
          />
        </div>
      </div>

      {secondCountry && (
        <PairSeriesChart
          countryA={countryCode}
          countryB={secondCountry}
          series={pairSeries}
          loading={pairLoading}
          error={pairError}
          onRetry={() => fetchPairSeries(countryCode, secondCountry)}
        />
      )}

      {loading && interactions.length === 0 ? (
        <Segment placeholder className={styles.loadingSegment}>
          <Header icon textAlign="center">
            <Icon name="spinner" loading size="big" />
            Loading Data
            <Header.Subheader>
              Fetching interactions for {countryInfo?.name}...
            </Header.Subheader>
          </Header>
        </Segment>
      ) : error ? (
        <Segment placeholder className={styles.loadingSegment}>
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
                    <span
                      className={`${styles.sortIcon} ${
                        sortField === 'reporter' ? styles.active : styles.inactive
                      }`}
                    >
                      {sortField === 'reporter'
                        ? sortDirection === 'desc'
                          ? '▼'
                          : '▲'
                        : '↕'}
                    </span>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={() => handleSort('reported')}
                    className={styles.sortableHeader}
                  >
                    Reported
                    <span
                      className={`${styles.sortIcon} ${
                        sortField === 'reported' ? styles.active : styles.inactive
                      }`}
                    >
                      {sortField === 'reported'
                        ? sortDirection === 'desc'
                          ? '▼'
                          : '▲'
                        : '↕'}
                    </span>
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
              &nbsp; | &nbsp; {pageMeta.total} total mentions
            </div>

            <Pagination
              activePage={activePage}
              totalPages={Math.ceil(pageMeta.total / pageMeta.limit) || 1}
              onPageChange={(e, { activePage: next }) => {
                fetchPage(next);
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
        <Segment placeholder className={styles.loadingSegment}>
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
  );

  const interactionsTab = (
    <Tab.Pane>
      <WorkInProgress />
    </Tab.Pane>
  );

  const networkTab = (
    <Tab.Pane style={{ height: '600px', position: 'relative' }}>
      <NetworkGraph initialCountry={countryCode} />
    </Tab.Pane>
  );

  const panes = [
    {
      menuItem: 'Mentions',
      render: () => mentionsTab,
    },
    {
      menuItem: 'Interactions',
      render: () => interactionsTab,
    },
    {
      menuItem: 'Network',
      render: () => networkTab,
    },
  ];

  if (!countryInfo) {
    return (
      <div className={styles.contentContainer}>
        <Dimmer active inverted>
          <Loader size='large'>Loading country information...</Loader>
        </Dimmer>
      </div>
    );
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.headerSection}>
        <Button 
          icon='arrow left' 
          content='Back' 
          onClick={handleBackToCountries}
          className={styles.backButton}
        />
        
        <div className={styles.countryHeader}>
          <div className={styles.countryFlagContainer}>
            <CountryFlag 
              countryCode={countryCode} 
              name={countryInfo.name}
              fontSize={48}
            />
          </div>
          <div className={styles.countryInfo}>
            <h1 className={styles.countryName}>{countryInfo.name}</h1>
            <p className={styles.countryCode}>{countryCode}</p>
            <div className={styles.stats}>
              <div className={styles.interactionStats}>
                <Icon name='exchange' />
                <span>{"-"} total interactions</span>
              </div>
              <div className={styles.mentionStats}>
                <Icon name='chat' />
                <span>{pageMeta.total} total mentions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <Tab panes={panes} className={styles.tabs} />
      </div>
    </div>
  );
};

export default CountryPage;
