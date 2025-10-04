import React, { useState, useMemo, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import styles from './worldMap.module.css'
import CountryTooltip from './CountryTooltip'

const WorldMap = ({
	onCountryHover = () => {},
	onCountryClick = () => {},
	countriesData,
}) => {
	const [hoveredCountry, setHoveredCountry] = useState(null)
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [mapPosition, setMapPosition] = useState({ x: 0, y: 0, zoom: 1.2 })

	// Create a map of country names to interaction data
	const countryInteractionMap = useMemo(() => {
		if (!countriesData) return {}

		const map = {}
		countriesData.forEach(country => {
			map[country.name] = {
				id: country.id,
				name: country.name,
				code: country.code,
				isSelected: selectedCountry === country.name
			}
		})
		return map
	}, [countriesData, selectedCountry])

	const handleCountryHover = useCallback((geo) => {
		const countryName = geo.properties.name
		const countryData = countryInteractionMap[countryName]
		
		if (countryData) {
			setHoveredCountry(countryData)
			onCountryHover(countryData.name)
		}
	}, [countryInteractionMap, onCountryHover])

	const handleCountryLeave = useCallback(() => {
		setHoveredCountry(null)
		onCountryHover('')
	}, [onCountryHover])

	const handleCountryClick = useCallback((geo) => {
		const countryName = geo.properties.name
		const countryData = countryInteractionMap[countryName]
		
		// Make all countries clickable, even if they don't have data
		if (countryData) {
			setSelectedCountry(countryData.name)
			onCountryClick(countryData)
		} else {
			// For countries not in our data, create a basic country object
			const isoCode = geo.properties.ISO_A2 || geo.properties.ISO_A3 || ''
			const basicCountryData = {
				name: countryName,
				code: isoCode,
				interactionCount: 0,
				isSelected: true
			}
			setSelectedCountry(countryName)
			onCountryClick(basicCountryData)
		}
	}, [countryInteractionMap, onCountryClick])

	const getCountryColor = useCallback((countryName) => {
		const countryData = countryInteractionMap[countryName]
		
		// Selected country gets golden color
		if (countryData?.isSelected) return '#FFD700'
		
		// Default color for all countries (clickable)
		return '#E8E8E8'
	}, [countryInteractionMap])

	const getCountryStrokeColor = useCallback((countryName) => {
		const countryData = countryInteractionMap[countryName]
		if (countryData?.isSelected) return '#FF8C00'
		return '#CCCCCC' // Default stroke for all countries
	}, [countryInteractionMap])

	const getCountryStrokeWidth = useCallback((countryName) => {
		const countryData = countryInteractionMap[countryName]
		if (countryData?.isSelected) return 2.5
		return 1 // Default stroke width for all countries
	}, [countryInteractionMap])

	// Gentle boundary check - only prevents extreme scrolling
	const checkBoundaries = useCallback((coordinates, zoom) => {
		const maxPanDistance = 300 // Much more generous than before
		const currentX = coordinates[0]
		const currentY = coordinates[1]
		
		// Only apply boundaries if user is trying to go very far
		if (Math.abs(currentX) > maxPanDistance || Math.abs(currentY) > maxPanDistance) {
			// Gently nudge back towards reasonable bounds
			const boundedX = Math.max(-maxPanDistance, Math.min(maxPanDistance, currentX))
			const boundedY = Math.max(-maxPanDistance, Math.min(maxPanDistance, currentY))
			return [boundedX, boundedY]
		}
		
		return coordinates
	}, [])

	return (
		<div className={styles.mapContainer}>
			<ComposableMap
				projection="geoEqualEarth"
				projectionConfig={{
					scale: 180,
					center: [0, 20]
				}}
				style={{
					background: '#FFFFFF',
					width: '100%',
					height: '100%'
				}}
			>
				<ZoomableGroup
					center={[mapPosition.x, mapPosition.y]}
					zoom={mapPosition.zoom}
					maxZoom={4}
					minZoom={0.8}
					onMoveEnd={({ coordinates, zoom }) => {
						const boundedCoords = checkBoundaries(coordinates, zoom)
						setMapPosition({
							x: boundedCoords[0],
							y: boundedCoords[1],
							zoom: zoom
						})
					}}
				>
					<Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
						{({ geographies }) =>
							geographies.map((geo) => {
								const countryName = geo.properties.name
								const countryData = countryInteractionMap[countryName]
								const isHovered = hoveredCountry?.name === countryName
								
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill={isHovered ? '#FFD700' : getCountryColor(countryName)}
										stroke={getCountryStrokeColor(countryName)}
										strokeWidth={getCountryStrokeWidth(countryName)}
										style={{
											default: {
												outline: 'none',
												cursor: countryData ? 'pointer' : 'default',
												transition: 'all 0.2s ease-in-out'
											},
											hover: {
												fill: countryData ? '#FFD700' : '#F0F0F0',
												outline: 'none',
												cursor: countryData ? 'pointer' : 'default',
												stroke: countryData ? '#FF8C00' : '#CCCCCC',
												strokeWidth: countryData ? 2.5 : 1,
												transition: 'all 0.2s ease-in-out',
												filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
											},
											pressed: {
												outline: 'none',
												fill: countryData ? '#FFA500' : '#F0F0F0',
												stroke: countryData ? '#FF6600' : '#CCCCCC',
												strokeWidth: countryData ? 3 : 1,
												transition: 'all 0.1s ease-in-out'
											}
										}}
										onMouseEnter={() => handleCountryHover(geo)}
										onMouseLeave={handleCountryLeave}
										onClick={() => handleCountryClick(geo)}
									/>
								)
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			
			{/* New compact tooltip component */}
			<CountryTooltip country={hoveredCountry} />
		</div>
	)
}

export default WorldMap 