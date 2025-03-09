import styles from './MonthlyPaymentCalculator.module.css';

export const MonthlyPaymentCalculator = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monthly Payment Calculator</h1>
      <div className={styles.content}>
        <p>
          Calculate your monthly mortgage payment based on your loan amount, interest rate, and loan term.
        </p>
        
        <div className={styles.placeholder}>
          <p className={styles.placeholderText}>
            Monthly Payment Calculator coming soon!
          </p>
          <p>
            This calculator will help you determine your monthly mortgage payments
            based on home price, down payment, interest rate, and loan term.
          </p>
        </div>
      </div>
    </div>
  );
};
