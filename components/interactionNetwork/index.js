'use client'
import React, { useState, useEffect } from 'react'
import Graph from 'react-graph-vis'

const InteractionNetwork = ({ networkData }) => {
	function convertDataToGraph(data) {
		const graph = {
			nodes: [],
			edges: [],
		}

		const allEntities = new Set()
		data.forEach((item) => {
			allEntities.add(item.reporter)
			allEntities.add(item.reported)
		})

		for (const entity of allEntities) {
			graph.nodes.push({
				id: entity,
				label: entity,
				title: entity,
				shape: 'circle',
			})
		}
		data.forEach((item) => {
			const index = graph.edges.findIndex((edge) => {
				return edge.from === item.reporter && edge.to === item.reported
			})
			if (index === -1) {
				graph.edges.push({
					from: item.reporter,
					to: item.reported,
					weight: 1,
				})
			} else {
				graph.edges[index].weight += 1
			}
		})
		return graph
	}
	const [isClient, setIsClient] = useState(false)
	const [graphData, setGraphData] = useState(null)
	const options = {
		physics: {
			enabled: false,
		},
		interaction: {
			navigationButtons: true,
			zoomView: false,
		},
		nodes: {
			borderWidth: 2,
			size: 50,
			color: {
				border: '#FFFFFF',
				background: '#197878',
			},
			padding: "10px",
			font: { color: '#FFFFFF' },
		},
		edges: {
			color: '#000000',
			width: 1.5,
		},
		shadow: true,
		smooth: true,
		height: '550px',
	}

	const events = {
		beforeDrawing: (ctx) => {
			// save current translate/zoom
			ctx.save();
			// reset transform to identity
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			// fill background with solid white
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			// restore old transform
			ctx.restore();
		}
	}

	useEffect(() => {
		setIsClient(true)
		setGraphData(convertDataToGraph(networkData))
	}, [networkData])
	if (!isClient) {
		return null
	} else if (!networkData) {
		return null
	}
	return <Graph graph={graphData} options={options} events={events} />
}
export default InteractionNetwork
