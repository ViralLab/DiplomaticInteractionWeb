import React, { useState, useEffect } from 'react';
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
} from 'semantic-ui-react';
import CountryFlag from '@/components/countries/countryFlag';
import countriesData from '@/data/countries';
import WorkInProgress from '@/components/utils/workInProgress/WorkInProgress';
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

  // Reset pagination and sorting when country changes
  useEffect(() => {
    setActivePage(1);
    setSortField('date');
    setSortDirection('desc');
    setPageCache({});
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
              &nbsp; | &nbsp; {pageMeta.total} total interactions
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

  const panes = [
    {
      menuItem: 'Mentions',
      render: () => mentionsTab,
    },
    {
      menuItem: 'Interactions',
      render: () => interactionsTab,
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
          content='Back to Interactions' 
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
            <div className={styles.interactionStats}>
              <Icon name='exchange' />
              <span>{pageMeta.total} total interactions</span>
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
