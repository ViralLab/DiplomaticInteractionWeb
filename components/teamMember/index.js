import React from 'react'
import { Image, Label, Icon, Divider } from 'semantic-ui-react'
import styles from './teamMember.module.css'

// Use the correct path for Next.js public directory
const googleScholarIconPath = '/icons/google-scholar.png'
const orcidIconPath = '/icons/orcid.png'

const TeamMember = ({ imageUrl, name, titles = [], socials = {} }) => {
	return (
		<div className={styles.memberContainer}>
			<Image 
				src={imageUrl} 
				size='small' 
				circular 
			/>
			<div className={styles.memberName} style={{ marginTop: '0.75rem' }}>{name}</div>
			<div className={styles.labelsContainer}>
				{titles.map((title, index) => (
					<Label key={index} size='medium' style={{ marginTop: '1rem', backgroundColor: '#197878', opacity: '0.9', borderRadius: '3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: '#ffffff' }}>
						{title}
					</Label>
				))}
			</div>
			<Divider style={{ width: '100%', height: '0.2px', marginTop: '1rem', marginBottom: '0.75rem', borderColor: 'light-gray' }} />
			<div className={styles.socialIcons}>
				{socials.linkedin && (
					<a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
						<Icon name='linkedin' size='large' />
					</a>
				)}
				{socials.github && (
					<a href={socials.github} target="_blank" rel="noopener noreferrer">
						<Icon name='github' size='large' />
					</a>
				)}
				{socials.twitter && (
					<a href={socials.twitter} target="_blank" rel="noopener noreferrer">
						<Icon name='twitter' size='large' />
					</a>
				)}
				{socials.googleScholar && (
					<a href={socials.googleScholar} target="_blank" rel="noopener noreferrer">
						<img src={googleScholarIconPath} alt="Google Scholar" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
					</a>
				)}
				{socials.email && (
					<a href={`mailto:${socials.email}`} target="_blank" rel="noopener noreferrer">
						<Icon name='mail' size='large' />
					</a>
				)}
				{socials.website && (
					<a href={socials.website} target="_blank" rel="noopener noreferrer">
						<Icon name='world' size='large' />
					</a>
				)}
				{socials.orcid && (
					<a href={socials.orcid} target="_blank" rel="noopener noreferrer">
						<img src={orcidIconPath} alt="ORCID" style={{ width: '20px', height: '20px', verticalAlign: 'middle' }} />
					</a>
				)}
			</div>
		</div>
	)
}

export default TeamMember
