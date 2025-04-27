import LandingScreen from '@components/landingScreen'
import React, { useEffect } from 'react'
import WorldMapScreen from '@components/worldMapScreen'
import Footer from '@components/footer/index.js'
const Home = () => {
	useEffect(() => {
		const handleScroll = () => {
			const mapSection = document.getElementById('mapSection')
			if (mapSection) {
				const mapSectionTop = mapSection.getBoundingClientRect().top
				mapSection.style.opacity = (
					1 -
					mapSectionTop / window.innerHeight
				).toString()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToWorldMapSection = () => {
		const section = document.getElementById('mapSection')
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div>
			<div id='landingSection'>
				<LandingScreen onScroll={scrollToWorldMapSection} />
			</div>

			<div id='mapSection'>
				<WorldMapScreen />
			</div>
		</div>
	)
}

export default Home
