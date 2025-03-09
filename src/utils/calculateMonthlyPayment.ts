/**
 * Calculates the monthly mortgage payment
 *
 * @param homePrice - The price of the home
 * @param downPayment - The down payment amount
 * @param interestRate - The annual interest rate (as a percentage)
 * @param loanTermYears - The loan term in years
 * @param annualTaxes - The annual property taxes
 * @param annualInsurance - The annual insurance amount
 * @param monthlyHOA - The monthly HOA fee
 * @returns The total monthly payment
 */
export const calculateMonthlyPayment = (
  homePrice: number,
  downPayment: number,
  interestRate: number,
  loanTermYears: number,
  annualTaxes: number,
  annualInsurance: number,
  monthlyHOA: number,
): number => {
  // Calculate loan amount
  const loanAmount = homePrice - downPayment

  // Convert annual interest rate to monthly rate (percentage to decimal)
  const monthlyRate = interestRate / 100 / 12

  // Calculate number of payments
  const numberOfPayments = loanTermYears * 12

  // Calculate principal and interest payment
  let principalAndInterest = 0

  // Handle edge case where interest rate is 0
  if (monthlyRate === 0) {
    principalAndInterest = loanAmount / numberOfPayments
  } else {
    // Use the mortgage payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    principalAndInterest =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }

  // Calculate monthly taxes and insurance
  const monthlyTaxes = annualTaxes / 12
  const monthlyInsurance = annualInsurance / 12

  // Calculate total monthly payment
  const totalMonthlyPayment =
    principalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHOA

  return totalMonthlyPayment
}

/**
 * Formats a number as currency
 *
 * @param value - The number to format
 * @returns A formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formats a number as a percentage
 *
 * @param value - The number to format
 * @returns A formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`
}
