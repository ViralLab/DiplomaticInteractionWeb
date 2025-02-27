import React, { useState, useEffect } from 'react'
import TeamMember from '@components/teamMember'
import { Transition, Modal } from 'semantic-ui-react'
import styles from './team.module.css'

const Team = () => {
	const [visible, setVisible] = useState(false)
	const [selectedMember, setSelectedMember] = useState(null)

	useEffect(() => {
		setVisible(true)
	}, [])

	return (
		<>
			<Transition visible={visible} animation='slide left' duration={500}>
				<div className={styles.memberContainer}>
					<div className={styles.memberRow}>
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Nihat Muğurtay',
							title: 'Project Manager',
							imageUrl: '/images/people/nihatmugurtay.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/nihatmugurtay.jpeg'
								name='Nihat Muğurtay'
								title='Project Manager'
							/>
						</div>
						<div className={styles.separatorBig} />
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Onur Varol',
							title: 'Project Manager',
							imageUrl: '/images/people/onurvarol.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/onurvarol.jpeg'
								name='Onur Varol'
								title='Project Manager'
							/>
						</div>
					</div>
					<div className={styles.memberRow}>
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Kaan Güray Şirin',
							title: 'AI Engineer',
							imageUrl: '/images/people/kaanguraysirin.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/kaanguraysirin.jpeg'
								name='Kaan Güray Şirin'
								title='AI Engineer'
							/>
						</div>
						<div className={styles.separatorSmall} />
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Ayça Demir',
							title: 'AI Engineer',
							imageUrl: '/images/people/aycademir.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/aycademir.jpeg'
								name='Ayça Demir'
								title='AI Engineer'
							/>
						</div>
						<div className={styles.separatorSmall} />
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Batuhan Bahçeci',
							title: 'AI Engineer',
							imageUrl: '/images/people/batuhanbahceci.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/batuhanbahceci.jpeg'
								name='Batuhan Bahçeci'
								title='AI Engineer'
							/>
						</div>
					</div>
					<div className={styles.memberRow}>
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Fazlı Göktuğ Yılmaz',
							title: 'AI Engineer',
							imageUrl: '/images/people/fazligoktugyilmaz.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/fazligoktugyilmaz.jpeg'
								name='Fazlı Göktuğ Yılmaz'
								title='AI Engineer'
							/>
						</div>
						<div className={styles.separatorSmall} />
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Melis Gemalmaz',
							title: 'AI Engineer',
							imageUrl: '/images/people/melisgemalmaz.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/melisgemalmaz.jpeg'
								name='Melis Gemalmaz'
								title='AI Engineer'
							/>
						</div>
						<div className={styles.separatorSmall} />
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Yunus Tan Kerestecioğlu',
							title: 'Web Developer',
							imageUrl: '/images/people/yunuskerestecioglu.jpg'
						})}>
							<TeamMember
								imageUrl='/images/people/yunuskerestecioglu.jpg'
								name='Yunus Tan Kerestecioğlu'
								title='Web Developer'
							/>
						</div>
					</div>
					<div className={styles.memberRow}>
						<div className={styles.memberProfile} onClick={() => setSelectedMember({
							name: 'Ahmet Taha Kahya',
							title: 'Image Analysis / Web Developer',
							imageUrl: '/images/people/ahmettahakahya.jpeg'
						})}>
							<TeamMember
								imageUrl='/images/people/ahmettahakahya.jpeg'
								name='Ahmet Taha Kahya'
								title='AI Engineer'
							/>
						</div>
					</div>
				</div>
			</Transition>

			<Modal
				open={!!selectedMember}
				onClose={() => setSelectedMember(null)}
				size="small"
			>
				{selectedMember && (
					<>
						<Modal.Header>{selectedMember.name}</Modal.Header>
						<Modal.Content>
							<div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
								<img 
									src={selectedMember.imageUrl} 
									alt={selectedMember.name}
									style={{ width: '200px', borderRadius: '10px' }}
								/>
								<div>
									<h3>{selectedMember.title}</h3>
									{/* Add more details here when available */}
								</div>
							</div>
						</Modal.Content>
					</>
				)}
			</Modal>
		</>
	)
}

export default Team
