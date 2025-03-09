import { Button } from '../Button'
import { formatCurrency } from '../../utils/calculateMonthlyPayment'
import styles from './MonthlyPaymentResults.module.css'

interface MonthlyPaymentResultsProps {
  monthlyPayment: number
  principalAndInterest: number
  propertyTax: number
  homeInsurance: number
  hoaFees: number
  onReset?: () => void
}

export const MonthlyPaymentResults = ({
  monthlyPayment,
  principalAndInterest,
  propertyTax,
  homeInsurance,
  hoaFees,
  onReset,
}: MonthlyPaymentResultsProps) => {
  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsContainer}>
        <h3 className={styles.resultsTitle}>Monthly Payment</h3>
        
        <div className={styles.paymentCircle}>
          <div className={styles.paymentAmount}>
            {formatCurrency(monthlyPayment)}
            <div className={styles.perMonth}>per month</div>
          </div>
        </div>
        
        <div className={styles.paymentBreakdown}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Principal & interest</span>
            <span className={styles.breakdownValue}>{formatCurrency(principalAndInterest)}</span>
          </div>
          
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Property tax</span>
            <span className={styles.breakdownValue}>{formatCurrency(propertyTax)}</span>
          </div>
          
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Home insurance</span>
            <span className={styles.breakdownValue}>{formatCurrency(homeInsurance)}</span>
          </div>
          
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>HOA fees</span>
            <span className={styles.breakdownValue}>{formatCurrency(hoaFees)}</span>
          </div>
        </div>
      </div>

      {onReset && (
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Button variant='secondary' fullWidth onClick={onReset}>
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
