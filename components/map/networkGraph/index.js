"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Handle,
  Position,
} from "@xyflow/react";
import { Dropdown, Icon } from "semantic-ui-react";
import styles from "./networkGraph.module.css";
import "@xyflow/react/dist/style.css";
import CountryFlag from "../../countries/countryFlag";

// ---------- helpers ----------
const flattenChunks = (objOrArray) => {
  if (!objOrArray) return [];
  if (Array.isArray(objOrArray)) return objOrArray;
  if (typeof objOrArray === "object") {
    return Object.values(objOrArray).flatMap((chunk) => flattenChunks(chunk));
  }
  return [];
};

const COLOR_BUCKETS = [
    "hsl(200, 70%, 50%)",
    "hsl(150, 70%, 45%)",
    "hsl(50, 85%, 50%)",
    "hsl(30, 80%, 55%)",
    "hsl(0, 70%, 55%)"
];

function weightToBucketColor(weight, minW, maxW) {
  if (!isFinite(minW) || !isFinite(maxW) || maxW === minW) {
    return COLOR_BUCKETS[0];
  }
  const range = maxW - minW;
  const step = range / COLOR_BUCKETS.length;
  const idx = Math.min(
    COLOR_BUCKETS.length - 1,
    Math.floor((weight - minW) / step)
  );
  return COLOR_BUCKETS[idx];
}

function computeConcentricSpiralPositions(
  centerId,
  neighbors,
  edges,
  baseRadius = 260,
  ringSpacing = 170,
  maxPerRing = 14
) {
  const nodes = [];

  const degreeMap = {};
  edges.forEach((e) => {
    const n = e.source === centerId ? e.target : e.source;
    degreeMap[n] = (degreeMap[n] || 0) + 1;
  });

  const weights = Object.values(degreeMap);
  const minW = Math.min(...weights, 1);
  const maxW = Math.max(...weights, 1);

  nodes.push({
    id: centerId.toLowerCase(),
    type: "countryNode",
    position: { x: 0, y: 0 },
    data: {
      countryName: centerId,
      countryCode: centerId,
      isCenter: true,
      color: "#333",
    },
  });

  let ring = 0;
  let indexInRing = 0;

  neighbors.forEach((nbr, idx) => {
    if (indexInRing >= maxPerRing) {
      ring++;
      indexInRing = 0;
    }

    const weight = degreeMap[nbr.id] || 1;
    const color = weightToBucketColor(weight, minW, maxW);

    const countInThisRing = Math.min(
      maxPerRing,
      neighbors.length - ring * maxPerRing
    );
    const angleStep = (2 * Math.PI) / Math.max(countInThisRing, 1);

    let angle = indexInRing * angleStep;
    angle += ring * 0.25;

    const radius = baseRadius + ring * ringSpacing;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    nodes.push({
      id: nbr.id.toLowerCase(),
      type: "countryNode",
      position: { x, y },
      data: {
        countryName: nbr.name,
        countryCode: nbr.id,
        color,
      },
    });

    indexInRing++;
  });

  return { nodes, degreeMap, minW, maxW };
}

// ---------- custom node ----------
const CountryNode = ({ data }) => {
  const nodeClass = data.isCenter
    ? `${styles.countryNode} ${styles.centerNode}`
    : styles.countryNode;

  return (
    <div
      className={nodeClass}
      style={{
        border: `2px solid ${data.color || "#333"}`,
        backgroundColor: data.isCenter ? "#fff" : data.color,
        color: "#fff",
      }}
    >
      <Handle type="source" position={Position.Top} id="source" style={{ background: "#555" }} />
      <Handle type="target" position={Position.Bottom} id="target" style={{ background: "#555" }} />
      <div className={styles.countryFlag}>
        <CountryFlag countryCode={data.countryCode} fontSize={26} />
      </div>
      <div className={styles.countryName}>{data.countryName}</div>
    </div>
  );
};

const DEFAULT_COUNTRY = "TUR";

// ---------- main component ----------
export default function NetworkGraph() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMapInfo, setShowMapInfo] = useState(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((s) => applyNodeChanges(changes, s)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((s) => applyEdgeChanges(changes, s)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((s) => addEdge(params, s)),
    []
  );

  // fetch graph
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://globaldiplomacynet-default-rtdb.europe-west1.firebasedatabase.app/network.json"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const graphData = {
          nodes: flattenChunks(data?.nodes),
          edges: flattenChunks(data?.edges),
        };

        setGraph(graphData);

        const hasDefault = graphData.nodes.some((n) => n.id === DEFAULT_COUNTRY);
        const initial = hasDefault
          ? DEFAULT_COUNTRY
          : graphData.nodes[0]?.id || null;

        if (initial) {
          setSelectedCountry(initial);
          buildEgoNetwork(graphData, initial, setNodes, setEdges);
        }
      } catch (e) {
        console.error("Error fetching graph data:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCountrySelect = (_e, { value }) => {
    setSelectedCountry(value);
    buildEgoNetwork(graph, value, setNodes, setEdges);
  };

  const nodeTypes = { countryNode: CountryNode };

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
          value={selectedCountry || undefined}
          onChange={handleCountrySelect}
          options={graph.nodes
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((n) => ({ key: n.id, value: n.id, text: n.name }))}
        />
      </div>

      {loading && <div className={styles.loadingIndicator}>Loading graph data...</div>}

      {selectedCountry && (
        <div className={styles.countryInfo}>
          <div className={styles.countryFlag}>
            <CountryFlag countryCode={selectedCountry} fontSize={20} />
          </div>
          <h3>{selectedCountry}</h3>
        </div>
      )}

      {showMapInfo && (
        <div className={styles.mapInfoBox}>
          <Icon name='info circle' />
          <span>This network shows the countries interacting with the selected country. Most frequently interacting countries are placed closer to the center. Select a country from the dropdown to explore its connections.</span>
          <Icon 
            name='close' 
            className={styles.closeIcon}
            onClick={() => setShowMapInfo(false)}
          />
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.4 }}
        minZoom={0.15}
        maxZoom={1.5}
      >
        <Background color="#aaa" gap={28} size={1.5} variant="dots" />
      </ReactFlow>
    </div>
  );
}

// ---------- ego network builder ----------
function buildEgoNetwork(graph, countryCode, setNodes, setEdges) {
  if (!graph?.nodes?.length) return;

  const center = graph.nodes.find((n) => n.id === countryCode);
  if (!center) {
    setNodes([]);
    setEdges([]);
    return;
  }

  const connectedEdges = (graph.edges || []).filter(
    (e) => e.source === countryCode || e.target === countryCode
  );

  const neighborCodes = Array.from(
    new Set(
      connectedEdges.map((e) =>
        e.source === countryCode ? e.target : e.source
      )
    )
  );

  const neighbors = graph.nodes.filter((n) => neighborCodes.includes(n.id));

  const { nodes: rfNodes, degreeMap, minW, maxW } =
    computeConcentricSpiralPositions(countryCode, neighbors, connectedEdges);

  const rfEdges = connectedEdges.map((e, idx) => {
    const nbr = e.source === countryCode ? e.target : e.source;
    const w = degreeMap[nbr] || 1;
    const color = weightToBucketColor(w, minW, maxW);
    return {
      id: `e-${countryCode}-${nbr}-${idx}`,
      source: countryCode.toLowerCase(),
      target: nbr.toLowerCase(),
      type: "straight",
      style: {
        stroke: color,
        strokeWidth: 1 + w * 0.4,
        opacity: 0.9,
      },
    };
  });

  setNodes(rfNodes);
  setEdges(rfEdges);
}
