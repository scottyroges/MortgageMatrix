import { useState, useRef, useEffect } from 'react'

import { Button } from '../../components/Button'
import { calculateAffordableHousePrices } from '../../utils/calculateAffordabilityByDownpayment'
import { InfoSection } from '../../components/InfoSection'
import { InputField } from '../../components/InputField'
import { MinMaxSlider } from '../../components/MinMaxSlider'
import { AffordabilityEstimatorResults } from '../../components/AffordabilityEstimatorResults'
import {
  parseShortUrlHashForAffordabilityEstimator,
  updateBrowserUrlForAffordabilityEstimator,
} from '../../utils/affordabilityParamHashing'
import type { RangeValues } from '../../types/rangeValues'
import type { AffordabilityByDownPayment } from '../../types/affordabilityByDownPayment'
import type { AffordabilityFormValues } from '../../types/affordabilityFormValues'

import styles from './AffordabilityEstimator.module.css'

export const AffordabilityEstimator = () => {
  // Ref for results section
  const resultsRef = useRef<HTMLDivElement>(null)

  // Form state with default values
  const [monthlyPayment, setMonthlyPayment] = useState('2000')
  const [downPayment, setDownPayment] = useState('80000')
  const [interestRateRange, setInterestRateRange] = useState<RangeValues>({
    min: 4,
    max: 6,
  })
  const [propertyTaxRange, setPropertyTaxRange] = useState<RangeValues>({
    min: 5000,
    max: 9000,
  })
  const [insurance, setInsurance] = useState('1000')
  const [hoa, setHoa] = useState('0')

  // Form validation and results visibility
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculationResults, setCalculationResults] =
    useState<AffordabilityByDownPayment | null>(null)

  // Check for URL parameters on component mount
  useEffect(() => {
    const searchParams = window.location.search
    const hashParam = new URLSearchParams(searchParams).get('p')

    let formValues: AffordabilityFormValues | null = null

    // Try to parse from hash parameter first (short URL)
    if (hashParam) {
      try {
        formValues = parseShortUrlHashForAffordabilityEstimator(hashParam)
      } catch (error) {
        console.error('Error parsing hash parameter:', error)
      }
    }

    // If we have form values, update the form state
    if (formValues) {
      setMonthlyPayment(formValues.monthlyPayment)
      setDownPayment(formValues.downPayment)
      setInterestRateRange(formValues.interestRateRange)
      setPropertyTaxRange(formValues.propertyTaxRange)
      setInsurance(formValues.insurance)
      setHoa(formValues.hoa)

      // Trigger calculation after a short delay to ensure state is updated
      setTimeout(() => {
        if (validateForm()) {
          performCalculation({
            monthlyPayment: formValues.monthlyPayment,
            downPayment: formValues.downPayment,
            interestRateRange: formValues.interestRateRange,
            propertyTaxRange: formValues.propertyTaxRange,
            insurance: formValues.insurance,
            hoa: formValues.hoa,
            skipScrolling: true,
          })
        }
      }, 100)
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!monthlyPayment) {
      newErrors.monthlyPayment = 'Monthly payment is required'
    }

    if (!downPayment) {
      newErrors.downPayment = 'Down payment is required'
    }

    if (!insurance) {
      newErrors.insurance = 'Insurance amount is required'
    }

    if (!hoa) {
      newErrors.hoa = 'HOA amount is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Internal calculation function that can be called with the skipScrolling parameter
  const performCalculation = ({
    monthlyPayment,
    downPayment,
    interestRateRange,
    propertyTaxRange,
    insurance,
    hoa,
    skipScrolling = false,
  }: {
    monthlyPayment: string
    downPayment: string
    interestRateRange: RangeValues
    propertyTaxRange: RangeValues
    insurance: string
    hoa: string
    skipScrolling?: boolean
  }) => {
    if (validateForm()) {
      // Parse input values
      const monthlyPaymentValue = parseFloat(monthlyPayment)
      const downPaymentValue = parseFloat(downPayment)
      const insuranceValue = parseFloat(insurance)
      const hoaValue = parseFloat(hoa)

      // Calculate affordable house prices
      const results = calculateAffordableHousePrices(
        monthlyPaymentValue,
        downPaymentValue,
        interestRateRange.min,
        interestRateRange.max,
        propertyTaxRange.min,
        propertyTaxRange.max,
        insuranceValue,
        hoaValue,
      )

      // Store results and show results section
      setCalculationResults(results)

      // Update URL with form parameters
      updateBrowserUrlForAffordabilityEstimator({
        monthlyPayment,
        downPayment,
        interestRateRange,
        propertyTaxRange,
        insurance,
        hoa,
      })

      // Scroll to results after a short delay to ensure the results are rendered
      if (!skipScrolling) {
        setTimeout(() => {
          const element = resultsRef.current
          if (element) {
            const rect = element.getBoundingClientRect()
            const offset = 50
            const scrollPosition =
              document.querySelector('body')?.scrollTop ?? 0
            document.querySelector('body')?.scrollTo({
              top: scrollPosition + rect.top - offset,
              behavior: 'smooth',
            })
          }
        }, 300)
      }
    }
  }

  // Event handler for the Calculate button
  const handleCalculate = () => {
    performCalculation({
      monthlyPayment,
      downPayment,
      interestRateRange,
      propertyTaxRange,
      insurance,
      hoa,
      skipScrolling: false,
    })
  }

  const handleReset = () => {
    setMonthlyPayment('2000')
    setDownPayment('80000')
    setInterestRateRange({ min: 4, max: 6 })
    setPropertyTaxRange({ min: 5000, max: 9000 })
    setInsurance('1000')
    setHoa('0')
    setErrors({})

    // Hide results when reset is clicked
    setCalculationResults(null)

    // Scroll back to the top of the page
    setTimeout(() => {
      document.querySelector('body')?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.title}>Home Affordability Estimator</h2>

        <InputField
          label='Desired monthly payment'
          value={monthlyPayment}
          onChange={setMonthlyPayment}
          error={errors.monthlyPayment}
        />

        <InputField
          label='Down payment'
          value={downPayment}
          onChange={setDownPayment}
          error={errors.downPayment}
        />

        <MinMaxSlider
          rangeMin={1}
          rangeMax={15}
          step={0.5}
          rangeValues={interestRateRange}
          onChange={setInterestRateRange}
          inputLabel='Interest Rate Range'
          minMaxLabelType='percentage'
        />

        <MinMaxSlider
          rangeMin={1000}
          rangeMax={50000}
          step={1000}
          rangeValues={propertyTaxRange}
          onChange={setPropertyTaxRange}
          inputLabel='Property Taxes Annually'
          minMaxLabelType='money'
        />

        <div className={styles.rowInputs}>
          <div className={styles.inputHalf}>
            <InputField
              label='Insurance Annually'
              value={insurance}
              onChange={setInsurance}
              error={errors.insurance}
            />
          </div>
          <div className={styles.inputHalf}>
            <InputField
              label='HOA Monthly'
              value={hoa}
              onChange={setHoa}
              error={errors.downPayment}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button fullWidth onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </div>

      {calculationResults !== null && (
        <div ref={resultsRef}>
          <AffordabilityEstimatorResults
            results={calculationResults}
            onReset={handleReset}
            formValues={{
              monthlyPayment,
              downPayment,
              interestRateRange,
              propertyTaxRange,
              insurance,
              hoa,
            }}
          />
        </div>
      )}

      <InfoSection
        title='How It Works'
        content='Using industry standard amortization formulas and your desired monthly payment, we calculate the home prices in your range.'
        linkText='Learn more about our methodology'
        linkUrl='/how-it-works'
      />
    </div>
  )
}
