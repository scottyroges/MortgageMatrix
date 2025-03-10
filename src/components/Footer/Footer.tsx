import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to='/privacy-policy' className={styles.link}>
          Privacy Policy
        </Link>
        <Link to='/terms-of-service' className={styles.link}>
          Terms of Service
        </Link>
        <Link to='/contact-us' className={styles.link}>
          Contact Us
        </Link>
      </div>
      <div className={styles.copyright}>
        © 2025 Mortgage Matrix. All rights reserved.
      </div>
    </footer>
  )
}
