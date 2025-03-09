import { ReactNode, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Navigation } from '../../components/Navigation';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header onMenuClick={handleMenuToggle} />
      <Navigation isOpen={isMenuOpen} onClose={handleMenuClose} />
      <main className={styles.container}>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};
