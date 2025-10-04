import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <img style={{cursor: 'pointer', height: '64px'}} onClick={() => window.open('https://www.sabanciuniv.edu/', '_blank')} src="/images/logos/sabanci-logo.png" alt="sabanci-logo" />
                <div className={styles.centerSection}>
                    <p style={{fontSize: '16px', marginBottom: '12px'}}>
                      This project is being developed by the VRL Lab at the Sabancı University.
                    </p>
                    <div className={styles.feedbackLinks}>
                        <span 
                            className={styles.feedbackLink}
                            onClick={() => window.open('https://forms.gle/V9cKoCchUnrW14Pw7', '_blank')}
                        >
                            Give Feedback
                        </span>
                        <span 
                            className={styles.feedbackLink}
                            onClick={() => window.open('https://forms.gle/fag4snp4XBhhAFM38', '_blank')}
                        >
                            Report Bug
                        </span>
                    </div>
                </div>
                <img style={{cursor: 'pointer', height: '64px'}} onClick={() => window.open('https://varollab.com/', '_blank')} src="/images/logos/vrllab-logo.png" alt="vrllab-logo" />
            </div>
        </footer>
    )
}

export default Footer 