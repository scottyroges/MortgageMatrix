import { useRef, useState, useEffect } from 'react'
import { Button } from '../../components/Button'
import { InfoSection } from '../../components/InfoSection'
import { InputField } from '../../components/InputField'
import { MonthlyPaymentResults } from '../../components/MonthlyPaymentResults'
import { TermSelector } from '../../components/TermSelector'
import { calculateMonthlyPayment } from '../../utils/calculateMonthlyPayment'
import {
  parseShortUrlHashForMonthlyPaymentCalculator,
  updateBrowserUrlForMonthlyPaymentCalculator,
} from '../../utils/monthlyPaymentParamHashing'
import type { MonthlyPaymentFormValues } from '../../types/monthlyPaymentFormValues'

import styles from './MonthlyPaymentCalculator.module.css'

export const MonthlyPaymentCalculator = () => {
  // Form state
  const [homePrice, setHomePrice] = useState('300000')
  const [downPayment, setDownPayment] = useState('75000')
  const downPaymentPercentCalculated =
    (Number(downPayment) / Number(homePrice)) * 100
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    downPaymentPercentCalculated.toFixed(2),
  )
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState('7')
  const [annualTaxes, setAnnualTaxes] = useState('9000')
  const [annualInsurance, setAnnualInsurance] = useState('1000')
  const [monthlyHOA, setMonthlyHOA] = useState('0')

  // Form validation and results visibility
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [monthlyPaymentResults, setMonthlyPaymentResults] = useState<
    number | null
  >(null)
  const [principalAndInterest, setPrincipalAndInterest] = useState<number>(0)
  const [propertyTax, setPropertyTax] = useState<number>(0)
  const [homeInsurance, setHomeInsurance] = useState<number>(0)
  const [hoaFees, setHoaFees] = useState<number>(0)

  // Ref for results section
  const resultsRef = useRef<HTMLDivElement>(null)

  // Check for URL parameters on component mount
  useEffect(() => {
    const searchParams = window.location.search
    const hashParam = new URLSearchParams(searchParams).get('p')

    let formValues: MonthlyPaymentFormValues | null = null

    // Try to parse from hash parameter (short URL)
    if (hashParam) {
      try {
        formValues = parseShortUrlHashForMonthlyPaymentCalculator(hashParam)
      } catch (error) {
        console.error('Error parsing hash parameter:', error)
      }
    }

    // If we have form values, update the form state
    if (formValues) {
      setHomePrice(formValues.homePrice)
      setDownPayment(formValues.downPayment)
      setLoanTerm(formValues.loanTerm)
      setInterestRate(formValues.interestRate)
      setAnnualTaxes(formValues.annualTaxes)
      setAnnualInsurance(formValues.annualInsurance)
      setMonthlyHOA(formValues.monthlyHOA)

      // Update down payment percentage
      updateDownPaymentPercent(formValues.downPayment, formValues.homePrice)

      // Trigger calculation after a short delay to ensure state is updated
      setTimeout(() => {
        if (validateForm()) {
          performCalculation({
            homePrice: formValues.homePrice,
            downPayment: formValues.downPayment,
            loanTerm: formValues.loanTerm,
            interestRate: formValues.interestRate,
            annualTaxes: formValues.annualTaxes,
            annualInsurance: formValues.annualInsurance,
            monthlyHOA: formValues.monthlyHOA,
            skipScrolling: true,
          })
        }
      }, 100)
    }
  }, [])

  // Update down payment percentage when down payment or home price changes
  const updateDownPaymentPercent = (
    downPaymentValue: string,
    homePriceValue: string,
  ) => {
    if (downPaymentValue && homePriceValue) {
      const downPaymentNum = parseFloat(downPaymentValue)
      const homePriceNum = parseFloat(homePriceValue)

      if (homePriceNum > 0) {
        const percent = (downPaymentNum / homePriceNum) * 100
        setDownPaymentPercent(percent.toFixed(2))
      }
    }
  }

  // Update down payment amount when percentage or home price changes
  const updateDownPaymentAmount = (
    percentValue: string,
    homePriceValue: string,
  ) => {
    if (percentValue && homePriceValue) {
      const percentNum = parseFloat(percentValue)
      const homePriceNum = parseFloat(homePriceValue)

      const amount = (percentNum / 100) * homePriceNum
      setDownPayment(amount.toFixed(0))
    }
  }

  // Handle home price change
  const handleHomePriceChange = (value: string) => {
    setHomePrice(value)
    updateDownPaymentAmount(downPaymentPercent, value)
  }

  // Handle down payment change
  const handleDownPaymentChange = (value: string) => {
    setDownPayment(value)
    updateDownPaymentPercent(value, homePrice)
  }

  // Handle down payment percentage change
  const handleDownPaymentPercentChange = (value: string) => {
    setDownPaymentPercent(value)
    updateDownPaymentAmount(value, homePrice)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!homePrice) {
      newErrors.homePrice = 'Home price is required'
    }

    if (!downPayment) {
      newErrors.downPayment = 'Down payment is required'
    }

    if (!interestRate) {
      newErrors.interestRate = 'Interest rate is required'
    }

    if (!annualTaxes) {
      newErrors.annualTaxes = 'Annual taxes are required'
    }

    if (!annualInsurance) {
      newErrors.annualInsurance = 'Annual insurance is required'
    }

    if (!monthlyHOA) {
      newErrors.monthlyHOA = 'HOA fees are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Internal calculation function that can be called with the skipScrolling parameter
  const performCalculation = ({
    homePrice,
    downPayment,
    loanTerm,
    interestRate,
    annualTaxes,
    annualInsurance,
    monthlyHOA,
    skipScrolling = false,
  }: {
    homePrice: string
    downPayment: string
    loanTerm: number
    interestRate: string
    annualTaxes: string
    annualInsurance: string
    monthlyHOA: string
    skipScrolling?: boolean
  }) => {
    if (validateForm()) {
      // Parse input values
      const homePriceValue = parseFloat(homePrice)
      const downPaymentValue = parseFloat(downPayment)
      const interestRateValue = parseFloat(interestRate)
      const annualTaxesValue = parseFloat(annualTaxes)
      const annualInsuranceValue = parseFloat(annualInsurance)
      const monthlyHOAValue = parseFloat(monthlyHOA)

      // Calculate loan amount
      const loanAmount = homePriceValue - downPaymentValue

      // Convert annual interest rate to monthly rate (percentage to decimal)
      const monthlyRate = interestRateValue / 100 / 12

      // Calculate number of payments
      const numberOfPayments = loanTerm * 12

      // Calculate principal and interest payment
      let principalAndInterestValue = 0

      // Handle edge case where interest rate is 0
      if (monthlyRate === 0) {
        principalAndInterestValue = loanAmount / numberOfPayments
      } else {
        // Use the mortgage payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
        principalAndInterestValue =
          (loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      }

      // Calculate monthly taxes and insurance
      const monthlyTaxesValue = annualTaxesValue / 12
      const monthlyInsuranceValue = annualInsuranceValue / 12

      // Set the individual payment components
      setPrincipalAndInterest(principalAndInterestValue)
      setPropertyTax(monthlyTaxesValue)
      setHomeInsurance(monthlyInsuranceValue)
      setHoaFees(monthlyHOAValue)

      // Calculate total monthly payment
      const payment = calculateMonthlyPayment(
        homePriceValue,
        downPaymentValue,
        interestRateValue,
        loanTerm,
        annualTaxesValue,
        annualInsuranceValue,
        monthlyHOAValue,
      )

      setMonthlyPaymentResults(payment)

      // Update URL with form parameters
      updateBrowserUrlForMonthlyPaymentCalculator({
        homePrice,
        downPayment,
        loanTerm,
        interestRate,
        annualTaxes,
        annualInsurance,
        monthlyHOA,
      })

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
      homePrice,
      downPayment,
      loanTerm,
      interestRate,
      annualTaxes,
      annualInsurance,
      monthlyHOA,
      skipScrolling: false,
    })
  }

  const handleReset = () => {
    setHomePrice('300000')
    setDownPayment('75000')
    setDownPaymentPercent('25.00')
    setLoanTerm(30)
    setInterestRate('7')
    setAnnualTaxes('9000')
    setAnnualInsurance('1000')
    setMonthlyHOA('0')
    setMonthlyPaymentResults(null)
    setErrors({})

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
        <h2 className={styles.title}>Monthly Payment Calculator</h2>
        <InputField
          label='Home price'
          value={homePrice}
          onChange={handleHomePriceChange}
          error={errors.homePrice}
        />

        <div className={styles.rowInputs}>
          <div className={styles.inputHalf}>
            <InputField
              label='Down payment'
              value={downPayment}
              onChange={handleDownPaymentChange}
              error={errors.downPayment}
            />
          </div>
          <div className={styles.inputHalf}>
            <InputField
              label=''
              value={downPaymentPercent}
              onChange={handleDownPaymentPercentChange}
              prefix='%'
              error={errors.downPaymentPercent}
            />
          </div>
        </div>

        <TermSelector
          label='Length of loan'
          options={[30, 20, 15, 10]}
          value={loanTerm}
          onChange={setLoanTerm}
        />

        <div className={styles.rowInputs}>
          <div className={styles.inputHalf}>
            <InputField
              label='Interest rate'
              value={interestRate}
              onChange={setInterestRate}
              prefix='%'
              error={errors.interestRate}
            />
          </div>
          <div className={styles.inputHalf}>
            <InputField
              label='Taxes Annually'
              value={annualTaxes}
              onChange={setAnnualTaxes}
              error={errors.annualTaxes}
            />
          </div>
        </div>

        <div className={styles.rowInputs}>
          <div className={styles.inputHalf}>
            <InputField
              label='Insurance Annually'
              value={annualInsurance}
              onChange={setAnnualInsurance}
              error={errors.annualInsurance}
            />
          </div>
          <div className={styles.inputHalf}>
            <InputField
              label='HOA Monthly'
              value={monthlyHOA}
              onChange={setMonthlyHOA}
              error={errors.monthlyHOA}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button fullWidth onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </div>

      {monthlyPaymentResults !== null && (
        <div ref={resultsRef}>
          <MonthlyPaymentResults
            monthlyPayment={monthlyPaymentResults}
            principalAndInterest={principalAndInterest}
            propertyTax={propertyTax}
            homeInsurance={homeInsurance}
            hoaFees={hoaFees}
            onReset={handleReset}
            formValues={{
              homePrice,
              downPayment,
              loanTerm,
              interestRate,
              annualTaxes,
              annualInsurance,
              monthlyHOA,
            }}
          />
        </div>
      )}

      <InfoSection
        title='How It Works'
        content='Using industry standard amortization formulas, we calculate your monthly mortgage payment based on your home price, down payment, interest rate, and loan term.'
        linkText='Learn more about our methodology'
        linkUrl='/how-it-works'
      />
    </div>
  )
}
