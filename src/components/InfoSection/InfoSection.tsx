import styles from './InfoSection.module.css'

interface InfoSectionProps {
  title: string
  content: string
  linkText?: string
  linkUrl?: string
}

export const InfoSection = ({
  title,
  content,
  linkText,
  linkUrl,
}: InfoSectionProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      {linkText && linkUrl && (
        <a href={linkUrl} className={styles.link}>
          {linkText}
          <svg
            className={styles.arrow}
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5 10H15'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10 5L15 10L10 15'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
      )}
    </section>
  )
}
