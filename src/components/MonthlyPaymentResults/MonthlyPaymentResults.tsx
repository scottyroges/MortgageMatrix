import { useState, useMemo } from 'react'
import { Button } from '../Button'
import { formatCurrency } from '../../utils/calculateMonthlyPayment'
import { generateShortUrlHashForMonthlyPaymentCalculator } from '../../utils/monthlyPaymentParamHashing'
import type { MonthlyPaymentFormValues } from '../../types/monthlyPaymentFormValues'
import { PaymentCircle, PaymentSegment } from '../PaymentCircle'

import styles from './MonthlyPaymentResults.module.css'

interface MonthlyPaymentResultsProps {
  monthlyPayment: number
  principalAndInterest: number
  propertyTax: number
  homeInsurance: number
  hoaFees: number
  onReset?: () => void
  formValues?: MonthlyPaymentFormValues
}

export const MonthlyPaymentResults = ({
  monthlyPayment,
  principalAndInterest,
  propertyTax,
  homeInsurance,
  hoaFees,
  onReset,
  formValues,
}: MonthlyPaymentResultsProps) => {
  const [shareButtonText, setShareButtonText] = useState('Share Results')
  const [shareButtonDisabled, setShareButtonDisabled] = useState(false)

  const handleShare = () => {
    if (!formValues) return

    try {
      // Generate a short hash from the form values
      const hash = generateShortUrlHashForMonthlyPaymentCalculator(formValues)

      // Create the shareable URL with the hash parameter
      const url = new URL(window.location.href)
      url.search = `?p=${hash}`

      // Copy the URL to clipboard
      navigator.clipboard
        .writeText(url.toString())
        .then(() => {
          // Update button text to provide feedback
          setShareButtonText('Copied!')
          setShareButtonDisabled(true)

          // Reset button text after 2 seconds
          setTimeout(() => {
            setShareButtonText('Share Results')
            setShareButtonDisabled(false)
          }, 2000)
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err)
          setShareButtonText('Failed to copy')

          // Reset button text after 2 seconds
          setTimeout(() => {
            setShareButtonText('Share Results')
          }, 2000)
        })
    } catch (error) {
      console.error('Error generating shareable URL:', error)
    }
  }
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

      <div className={styles.actionContainer}>
        {formValues && (
          <div className={styles.buttonContainer}>
            <Button
              variant='secondary'
              fullWidth
              onClick={handleShare}
              disabled={shareButtonDisabled}
            >
              {shareButtonText}
            </Button>
          </div>
        )}
        {onReset && (
          <div className={styles.buttonContainer}>
            <Button variant='secondary' fullWidth onClick={onReset}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
