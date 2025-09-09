import React from 'react'
import Article from '@components/article'
import { Divider, Header, Icon, Segment } from 'semantic-ui-react'
import styles from './publications.module.css'
import { publications } from '@/data/publications'

const Publications = () => {
	return (
		<div className={styles.contentContainer}>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='newspaper' />
					Publications
				</Header>
			</Divider>
			{publications.length === 0 ? (
				<Segment style={{ borderRadius: '8px', padding: '24px', width: '60%' }} placeholder>
					<Header icon>
						<Icon name='book' />
						No Publications Available Yet
					</Header>
					<p style={{ textAlign: 'center' }}>It seems like there are no publications to display at the moment. Stay tuned for updates!</p>
				</Segment>
			) : (
				<div>
					{publications.map((article, index) => (
						<Article key={index} article={article} />
					))}
				</div>
			)}
		</div>
	)
}

export default Publications
