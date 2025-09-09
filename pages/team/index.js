import React, { useState, useEffect } from 'react'
import TeamMember from '@components/teamMember'
import { Transition, Modal, Divider, Header, Icon } from 'semantic-ui-react'
import styles from './team.module.css'
import Footer from '../../components/layout/footer'

const Team = () => {
	const [visible, setVisible] = useState(false)
	const [selectedMember, setSelectedMember] = useState(null)

	useEffect(() => {
		setVisible(true)
	}, [])

	return (
		<>
			<div className={styles.contentContainer} style={{ marginRight: '1.5rem', marginLeft: '1.5rem' }}>
				<Divider horizontal style={{ marginTop: '3.5rem' }}>
					<Header as='h4'>
						<Icon name='users' />
						Current Project Members
					</Header>
				</Divider>

				<Transition visible={visible} animation='slide left' duration={500}>
					<div style={{ marginTop: '3.5rem' }}>
						<div className={styles.memberRow}>
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/nihatmugurtay.jpeg'
									name='Nihat Muğurtay'
									titles={['PI']}
									socials={{
										googleScholar: 'https://scholar.google.com/citations?user=K7NgiC0AAAAJ',
										website: 'https://nihatmugurtay.com/',
										linkedin: 'https://www.linkedin.com/in/n-mu%C4%9Furtay-7620741b7/',
										twitter: 'https://twitter.com/MugurtayN',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/onurvarol.jpeg'
									name='Onur Varol'
									titles={['Advisor']}
									socials={{
										email: 'onur.varol@sabanciuniv.edu',
										website: 'http://www.onurvarol.com/',
										linkedin: 'https://www.linkedin.com/in/onurvarol/',
										twitter: 'https://twitter.com/onurvarol',
										googleScholar: 'https://scholar.google.com/citations?user=t8YAefAAAAAJ',
										orcid: 'https://orcid.org/0000-0002-3994-6106'
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl="/images/people/meltemmuftulerbac.png"
									name='Meltem Müftüler-Baç'
									titles={['Advisor']}
									socials={{
										email: 'muftuler@sabanciuniv.edu',
										website: 'http://myweb.sabanciuniv.edu/muftuler',
										googleScholar: 'https://scholar.google.com.tr/citations?user=G7EFKhEAAAAJ&hl=en'
									}}
									imageStyle={{ 
										width: '150px', 
										height: '150px', 
										borderRadius: '50%', 
										objectFit: 'cover',
										backgroundColor: '#f0f0f0'
									}}
								/>
							</div>
						</div>
						<div className={styles.memberRow}>
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/kaanguraysirin.jpeg'
									name='Kaan Güray Şirin'
									titles={['Data', 'Image Analysis']}
									socials={{
										linkedin: 'http://www.linkedin.com/in/kaan-%C5%9Firin-5732462ba',
										github: 'https://github.com/KaanSirin',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/fazligoktugyilmaz.jpeg'
									name='Fazlı Göktuğ Yılmaz'
									titles={['NER', 'Network Analysis']}
									socials={{
										linkedin: 'https://www.linkedin.com/in/fazl%C4%B1-g%C3%B6ktu%C4%9F-y%C4%B1lmaz-79664a170/',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/mehrdadheshmat.jpg'
									name='Mehrdad Heshmat'
									titles={['NER Pipeline']}
									socials={{
										linkedin: 'https://www.linkedin.com/in/mehrdad-heshmat/',
										github: 'https://github.com/MR-EIGHT',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
						</div>
						<div className={styles.memberRow}>
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/ahmettahakahya.png'
									name='Ahmet Taha Kahya'
									titles={['Image Analysis', 'Website']}
									socials={{
										linkedin: 'https://www.linkedin.com/in/ahmet-taha-kahya-614b78246/',
										github: 'https://github.com/taha-kahya',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
						</div>
					</div>
				</Transition>

				<Divider horizontal style={{ marginTop: '4rem' }}>
					<Header as='h4'>
						<Icon name='users' />
						Past Project Members
					</Header>
				</Divider>

				<Transition visible={visible} animation='slide left' duration={500}>
					<div style={{ marginTop: '3.5rem' }}>
						<div className={styles.memberRow}>
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/aycademir.jpeg'
									name='Ayça Demir'
									title=''
									socials={{
										linkedin: 'https://www.linkedin.com/in/ay%C3%A7a-demir-08b1aa271/',
										github: 'https://github.com/aycademir',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/batuhanbahceci.jpeg'
									name='Batuhan Bahçeci'
									titles={['Image Analysis']}
									socials={{
										github: 'https://github.com/batuhanbhc',
									}}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl=''
									name='Doğukan Tosun'
									title=''
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
						</div>
						<div className={styles.memberRow}>
							<div className={styles.memberProfile}>
								<TeamMember
									imageUrl='/images/people/yunuskerestecioglu.jpg'
									name='Yunus Tan Kerestecioğlu'
									titles={['Website']}
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
							<div className={styles.separatorSmall} />
							<div className={styles.memberProfile}>
								<TeamMember
									name='Melis Gemalmaz'
									title=''
									imageStyle={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
								/>
							</div>
						</div>
					</div>
				</Transition>

				<Transition visible={visible} animation='slide left' duration={500}>
					<div style={{ marginTop: '3.5rem' }}>
						{/* Add other contributors here */}
					</div>
				</Transition>
			</div>

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
									style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
								/>
								<div>
									<h3>{selectedMember.title}</h3>
									<div style={{ marginTop: '10px' }}>
										<a href={selectedMember.socials.linkedin} target="_blank" rel="noopener noreferrer">
											<Icon name='linkedin' size='large' />
										</a>
										<a href={selectedMember.socials.github} target="_blank" rel="noopener noreferrer">
											<Icon name='github' size='large' />
										</a>
										<a href={selectedMember.socials.googleScholar} target="_blank" rel="noopener noreferrer">
											<Icon name='google' size='large' />
										</a>
									</div>
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
