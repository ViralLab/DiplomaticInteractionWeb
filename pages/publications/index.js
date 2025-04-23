import React from 'react'
import Article from '@components/article'
import { Divider, Header, Icon, Segment } from 'semantic-ui-react'
import styles from './publications.module.css'

const publicationsData = [
	// {
	// 	title: 'Advancements in AI Technology',
	// 	category: 'Technology',
	// 	links: [
	// 		{
	// 			name: 'MIT Technology Review',
	// 			link: 'https://www.technologyreview.com/2022/09/08/1058971/the-top-10-most-important-advancements-in-ai/',
	// 		},
	// 		{
	// 			name: 'Forbes',
	// 			link: 'https://www.forbes.com/sites/forbestechcouncil/2022/09/08/top-10-artificial-intelligence-trends-everyone-should-be-watching-in-2022/',
	// 		},
	// 	],
	// 	description:
	// 		'This publication explores the latest advancements in artificial intelligence technology, covering new algorithms, applications, and impacts on various industries. It delves into the development of neural networks, machine learning improvements, and the integration of AI in fields such as healthcare, finance, and transportation. The publication also discusses ethical considerations and the future direction of AI research and development. Additionally, it examines the role of AI in automating complex tasks, enhancing decision-making processes, and its potential to revolutionize daily life.',
	// 	authors: ['Jane Doe', 'John Smith'],
	// 	date: '15.04.2023',
	// },
]

const Publications = () => {
	return (
		<div className={styles.contentContainer}>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='newspaper' />
					Publications
				</Header>
			</Divider>
			{publicationsData.length === 0 ? (
				<Segment style={{ borderRadius: '8px', padding: '24px' }} placeholder>
					<Header icon>
						<Icon name='book' />
						No Publications Available Yet
					</Header>
					<p>It seems like there are no publications to display at the moment. Stay tuned for updates!</p>
				</Segment>
			) : (
				<div>
					{publicationsData.map((article, index) => (
						<Article key={index} article={article} />
					))}
				</div>
			)}
		</div>
	)
}

export default Publications
