import Head from 'next/head'
import Layout from '@components/layout'
import '../styles/globals.css'
import { useGoogleAnalytics } from '../utils/useGoogleAnalytics'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
	useGoogleAnalytics()
	
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
				/>
			</Head>
			<Script
				strategy="afterInteractive"
				src="https://www.googletagmanager.com/gtag/js?id=G-4QY8YT7STT"
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-4QY8YT7STT');
					`,
				}}
			/>
			<Layout app={<Component {...pageProps} />} />
		</>
	)
}

export default MyApp
