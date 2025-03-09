import styles from './Header.module.css'

interface HeaderProps {
  title?: string
  onMenuClick?: () => void
}

export const Header = ({
  title = 'Mortgage Matrix',
  onMenuClick,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <svg
          className={styles.icon}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='3'
            y='3'
            width='18'
            height='18'
            rx='2'
            stroke='#059669'
            strokeWidth='2'
          />
          <path
            d='M7 12H17'
            stroke='#059669'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M7 8H17'
            stroke='#059669'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M7 16H13'
            stroke='#059669'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <button
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label='Menu'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4 6H20'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M4 12H20'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M4 18H20'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </button>
    </header>
  )
}
