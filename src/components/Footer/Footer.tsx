import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href='#' className={styles.link}>
          Privacy Policy
        </a>
        <a href='#' className={styles.link}>
          Terms of Service
        </a>
        <a href='#' className={styles.link}>
          Contact Us
        </a>
      </div>
      <div className={styles.copyright}>
        © 2025 Mortgage Matrix. All rights reserved.
      </div>
    </footer>
  )
}
