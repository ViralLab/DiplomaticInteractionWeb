"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Handle, Position } from '@xyflow/react';
import { Dropdown } from 'semantic-ui-react';
import styles from './networkGraph.module.css';
import '@xyflow/react/dist/style.css';
import CountryFlag from '../../countries/countryFlag';
import countriesData from '../../../data/countries';

// Remove duplicates from countries data
const countries = countriesData.filter(
  (country, index, self) =>
    index === self.findIndex((c) => c.countryCode === country.countryCode)
);

// Custom Country Node Component
const CountryNode = ({ data }) => {
  const nodeClass = data.isCenter ? `${styles.countryNode} ${styles.centerNode}` : styles.countryNode;
  
  return (
    <div className={nodeClass}>
      <Handle
        type="source"
        position={Position.Top}
        id="source"
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target"
        style={{ background: '#555' }}
      />
      <div className={styles.countryFlag}>
        <CountryFlag countryCode={data.countryCode} fontSize={24} />
      </div>
      <div className={styles.countryName}>{data.countryName}</div>
    </div>
  );
};

// Default country to select on component mount
const DEFAULT_COUNTRY = 'TR'; // Turkey

const NetworkGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  // Fetch country data when a country is selected
  const fetchCountryData = async (countryCode) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/country/${countryCode}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountryData(data);

      // Generate nodes + edges together
      generateGraphElements(data, countryCode);
    } catch (error) {
      console.error('Error fetching country data:', error);
      setCountryData(null);
    } finally {
      setLoading(false);
    }
  };

  // Generate nodes and edges from country data
  const generateGraphElements = (data, selectedCountryCode) => {
    const newNodes = [];
    const newEdges = [];

    // Add center node
    const selectedCountry = countries.find((c) => c.countryCode === selectedCountryCode);
    if (selectedCountry) {
      newNodes.push({
        id: selectedCountryCode.toLowerCase(),
        type: 'countryNode',
        position: { x: 0, y: 0 },
        data: {
          countryName: selectedCountry.name,
          countryCode: selectedCountryCode,
          isCenter: true,
        },
      });
    }

    // Extract connected countries
    const connectedCountries = new Set();
    if (data && data.data) {
      data.data.forEach((interaction) => {
        if (interaction.reporterCode === selectedCountryCode && interaction.reportedCode) {
          connectedCountries.add(interaction.reportedCode);
        }
        if (interaction.reportedCode === selectedCountryCode && interaction.reporterCode) {
          connectedCountries.add(interaction.reporterCode);
        }
      });
    }

    // Add connected countries + edges
    const connectedCountriesArray = Array.from(connectedCountries);
    connectedCountriesArray.forEach((code, index) => {
      if (code !== selectedCountryCode) {
        const country = countries.find((c) => c.countryCode === code);
        if (country) {
          const angle = (index * 2 * Math.PI) / connectedCountriesArray.length;
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          newNodes.push({
            id: code.toLowerCase(),
            type: 'countryNode',
            position: { x, y },
            data: {
              countryName: country.name,
              countryCode: code,
            },
          });

          // Force visible edges
          newEdges.push({
            id: `${selectedCountryCode.toLowerCase()}-${code.toLowerCase()}`,
            source: selectedCountryCode.toLowerCase(),
            target: code.toLowerCase(),
            type: 'straight',
            animated: false,
            style: { stroke: 'black', strokeWidth: 2 }, // make sure edges are visible
          });
        }
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  // Handle country selection from dropdown
  const handleCountrySelect = (event, { value }) => {
    const selectedCountryData = countries.find((country) => country.countryCode === value);
    if (selectedCountryData) {
      setSelectedCountry(selectedCountryData);
      fetchCountryData(value);
    }
  };

  // Select default country on component mount
  useEffect(() => {
    const defaultCountryData = countries.find((country) => country.countryCode === DEFAULT_COUNTRY);
    if (defaultCountryData) {
      setSelectedCountry(defaultCountryData);
      fetchCountryData(DEFAULT_COUNTRY);
    }
  }, []);

  const nodeTypes = {
    countryNode: CountryNode,
  };

  return (
    <div className={styles.networkContainer}>
      <div className={styles.networkDropdown}>
        <Dropdown
          text="Select Country"
          icon="world"
          floating
          labeled
          button
          className="icon"
          search
          selection
          onChange={handleCountrySelect}
          options={countries.map((country) => ({
            key: country.countryCode,
            value: country.countryCode,
            text: country.name,
          }))}
        />
      </div>

      {/* Loading indicator */}
      {loading && <div className={styles.loadingIndicator}>Loading country data...</div>}

      {/* Selected country info */}
      {selectedCountry && countryData && (
        <div className={styles.countryInfo}>
          <h3>{selectedCountry.name}</h3>
          <p>Country Code: {selectedCountry.countryCode}</p>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#aaa" gap={24} size={1.5} variant="dots" />
      </ReactFlow>
    </div>
  );
};

export default NetworkGraph;
