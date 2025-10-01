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
  Grid,
  Card
} from 'semantic-ui-react';
import CountryFlag from '@/components/countries/countryFlag';
import countriesData from '@/data/countries';
import styles from './countryDetail.module.css';

const CountryPage = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  
  const [activePage, setActivePage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [mentionsData, setMentionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryInfo, setCountryInfo] = useState(null);
  
  const itemsPerPage = 10;

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
  }, [countryCode]);

  // Fetch country-specific data
  useEffect(() => {
    if (countryCode) {
      fetchCountryData();
    }
  }, [countryCode]);

  const fetchCountryData = async () => {
    setLoading(true);
    try {
      const apiUrl = `/api/country/${countryCode}?limit=1000`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMentionsData(data);
    } catch (error) {
      console.error('Error fetching country data:', error);
      setMentionsData(null);
    } finally {
      setLoading(false);
    }
  };

  // Get mentions for the current country
  const getMentionsForCountry = () => {
    if (!mentionsData || !mentionsData.data) {
      return [];
    }

    // The API already returns enriched data with country names
    const interactions = mentionsData.data.map(interaction => ({
      id: interaction.id,
      reporter: interaction.reporterName || 'Unknown',
      reported: interaction.reportedName || 'Unknown',
      date: interaction.date,
      year: new Date(interaction.date).getFullYear(),
      type: interaction.type,
      isReporter: interaction.reporterCode === countryCode
    }));

    // Aggregate by reporter, reported, year, and type for more granular grouping
    const aggregatedData = {};
    interactions.forEach(interaction => {
      const key = `${interaction.reporter}-${interaction.reported}-${interaction.year}-${interaction.type}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          reporter: interaction.reporter,
          reported: interaction.reported,
          year: interaction.year,
          date: interaction.date,
          type: interaction.type,
          count: 0
        };
      }
      aggregatedData[key].count++;
    });
    
    const result = Object.values(aggregatedData).sort((a, b) => {
      if (sortField === 'year') {
        return sortDirection === 'desc' ? b.year - a.year : a.year - b.year;
      } else if (sortField === 'count') {
        return sortDirection === 'desc' ? b.count - a.count : a.count - b.count;
      }
      return b.year - a.year || a.reporter.localeCompare(b.reporter);
    });
    
    return result;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setActivePage(1);
  };

  const mentions = getMentionsForCountry();
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mentions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mentions.length / itemsPerPage);

  const handleBackToCountries = () => {
    router.push('/countries');
  };

  const mentionsTab = (
    <Tab.Pane>
      {loading ? (
        <Segment placeholder className={styles.loadingSegment}>
          <Header icon textAlign="center">
            <Icon name="spinner" loading size="big" />
            Loading Data
            <Header.Subheader>
              Fetching mentions data for {countryInfo?.name}...
            </Header.Subheader>
          </Header>
        </Segment>
      ) : mentions.length > 0 ? (
        <>
          <div className={styles.tableWrapper}>
            <Table celled compact size="small" className={styles.fittedTable}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Reporter</Table.HeaderCell>
                  <Table.HeaderCell>Reported</Table.HeaderCell>
                  <Table.HeaderCell 
                    onClick={() => handleSort('year')}
                    className={styles.sortableHeader}
                  >
                    Year
                    <span className={`${styles.sortIcon} ${sortField === 'year' ? styles.active : styles.inactive}`}>
                      {sortField === 'year' ? (sortDirection === 'desc' ? '▼' : '▲') : '↕'}
                    </span>
                  </Table.HeaderCell>
                  <Table.HeaderCell 
                    onClick={() => handleSort('count')}
                    className={styles.sortableHeader}
                  >
                    Count
                    <span className={`${styles.sortIcon} ${sortField === 'count' ? styles.active : styles.inactive}`}>
                      {sortField === 'count' ? (sortDirection === 'desc' ? '▼' : '▲') : '↕'}
                    </span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentItems.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className={styles.cell}>{item.reporter}</Table.Cell>
                    <Table.Cell className={styles.cell}>{item.reported}</Table.Cell>
                    <Table.Cell className={styles.cell}>{item.year}</Table.Cell>
                    <Table.Cell className={styles.cell}>{item.count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          {mentions.length > 0 && (
            <div className={styles.paginationWrapper}>
              <div className={styles.paginationInfo}>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, mentions.length)} of {mentions.length} interactions
              </div>
              {totalPages > 1 && (
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  onPageChange={(e, { activePage }) => setActivePage(activePage)}
                  size="mini"
                  boundaryRange={1}
                  siblingRange={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                />
              )}
              {totalPages === 1 && mentions.length > 0 && (
                <div className={styles.singlePageNote}>
                  All interactions shown (single page)
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <Segment placeholder className={styles.noDataSegment}>
          <Header icon textAlign="center">
            <Icon name="info circle" size="big" />
            No Mentions Found
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
      <Segment placeholder className={styles.workInProgressSegment}>
        <Header icon textAlign="center">
          <Icon name="cogs" size="big" />
          Work in Progress
          <Header.Subheader>
            This section will be available with the actual data soon.
          </Header.Subheader>
        </Header>
      </Segment>
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
          content='Back to Countries' 
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
              <span>{mentions.length} total interactions</span>
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
