import type { ReactNode } from 'react'

import { Header } from '../../components/Header'

import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
