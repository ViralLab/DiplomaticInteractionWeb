import React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import styles from './mobileMessage.module.css'

const MobileMessage = () => {
	return (
		<div className={styles.mobileMessageContainer}>
			<Message icon className={styles.mobileMessage}>
				<Icon name='mobile alternate' />
				<Message.Content>
					<Message.Header>Mobile Version Coming Soon!</Message.Header>
				</Message.Content>
			</Message>
		</div>
	)
}

export default MobileMessage