import styles from './ContactUs.module.css'

export const ContactUs = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <p>
            We'd love to hear from you! If you have any questions, feedback, or inquiries about
            Mortgage Matrix, please don't hesitate to reach out to us.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Email Us</h2>
          <div className={styles.contact}>
            <p>
              For general inquiries, support, or feedback, please email us at:{' '}
              <a href="mailto:info@mortgagematrix.me" className={styles.email}>
                info@mortgagematrix.me
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
