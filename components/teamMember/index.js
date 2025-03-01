import React from 'react'
import { Image, Label } from 'semantic-ui-react'
import styles from './teamMember.module.css'

const TeamMember = (member) => {
	return (
		<div className={styles.memberContainer}>
			<Image src={member.imageUrl} size='small' circular />
			<div className={styles.memberName} style={{ marginTop: '0.75rem' }}>{member.name}</div>
			<Label size='large' style={{ marginTop: '0.75rem', backgroundColor: '#197878', opacity: '0.9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: '#ffffff' }}>
				{member.title}
			</Label>
		</div>
	)
}

export default TeamMember
