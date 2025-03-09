import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
}

export const Navigation = ({ isOpen, onClose }: NavigationProps) => {
  return (
    <nav className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.menu}>
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label='Close menu'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <ul className={styles.links}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={onClose}
            >
              Home Affordability Estimator
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/monthly-payment-calculator'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={onClose}
            >
              Monthly Payment Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/how-it-works'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={onClose}
            >
              How It Works
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
