import { Button } from '../Button'
import { formatCurrency } from '../../utils/calculateMonthlyPayment'
import styles from './MonthlyPaymentResults.module.css'
import { useMemo } from 'react'
import { PaymentCircle, PaymentSegment } from '../PaymentCircle'

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
  // Calculate payment segments and percentages
  const paymentSegments = useMemo(() => {
    const segments: PaymentSegment[] = [
      {
        name: 'Principal & interest',
        value: principalAndInterest,
        percentage: 0,
        color: '#059669', // Green
      },
      {
        name: 'Property tax',
        value: propertyTax,
        percentage: 0,
        color: '#3B82F6', // Blue
      },
      {
        name: 'Home insurance',
        value: homeInsurance,
        percentage: 0,
        color: '#F59E0B', // Amber/Orange
      },
      {
        name: 'HOA fees',
        value: hoaFees,
        percentage: 0,
        color: '#EF4444', // Red
      },
    ]

    // Calculate percentages
    segments.forEach(segment => {
      segment.percentage = (segment.value / monthlyPayment) * 100
    })

    return segments
  }, [
    principalAndInterest,
    propertyTax,
    homeInsurance,
    hoaFees,
    monthlyPayment,
  ])

  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsContainer}>
        <h3 className={styles.resultsTitle}>Monthly Payment</h3>

        <PaymentCircle
          segments={paymentSegments}
          totalAmount={monthlyPayment}
          formatCurrency={formatCurrency}
        />

        <div className={styles.paymentBreakdown}>
          {paymentSegments.map(segment => (
            <div key={segment.name} className={styles.breakdownItem}>
              <div className={styles.breakdownLabelContainer}>
                <span
                  className={styles.colorIndicator}
                  style={{ backgroundColor: segment.color }}
                />
                <span className={styles.breakdownLabel}>{segment.name}</span>
              </div>
              <span className={styles.breakdownValue}>
                {formatCurrency(segment.value)}
                <span className={styles.percentageValue}>
                  ({segment.percentage.toFixed(1)}%)
                </span>
              </span>
            </div>
          ))}
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
