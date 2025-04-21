import Head from 'next/head'
import Layout from '@components/layout'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
				/>
			</Head>
			<Layout app={<Component {...pageProps} />} />
		</>
	)
}

export default MyApp
