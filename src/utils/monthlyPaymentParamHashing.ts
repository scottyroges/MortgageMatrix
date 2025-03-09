/**
 * Utility functions for parameter hashing to create shorter URLs for Monthly Payment Calculator
 */

import type { MonthlyPaymentFormValues } from '../types/monthlyPaymentFormValues'

/**
 * Updates the browser URL with form parameters without reloading the page
 *
 * @param values - The form values
 */
export const updateBrowserUrlForMonthlyPaymentCalculator = (
  values: MonthlyPaymentFormValues,
): void => {
  const hash = generateShortUrlHashForMonthlyPaymentCalculator(values)
  window.history.replaceState({}, '', `${window.location.pathname}?p=${hash}`)
}

/**
 * Encodes form values into a compact hash string
 *
 * @param values - The form values to encode
 * @returns A compact hash string
 */
export const generateShortUrlHashForMonthlyPaymentCalculator = (
  values: MonthlyPaymentFormValues,
): string => {
  // Convert form values to a more compact representation
  // We'll use a binary buffer to store the values efficiently

  // 1. Convert string values to numbers
  const homePrice = parseInt(values.homePrice, 10)
  const downPayment = parseInt(values.downPayment, 10)
  const interestRate = parseFloat(values.interestRate)
  const annualTaxes = parseInt(values.annualTaxes, 10)
  const annualInsurance = parseInt(values.annualInsurance, 10)
  const monthlyHOA = parseInt(values.monthlyHOA, 10)

  // 2. Create a binary buffer to store all values
  // We'll allocate enough bytes for all our values
  // - homePrice: 3 bytes (0-16777215)
  // - downPayment: 3 bytes (0-16777215)
  // - loanTerm: 1 byte (enough for 10, 15, 20, 30 years)
  // - interestRate: 1 byte (scaled by 10 for decimal precision)
  // - annualTaxes: 2 bytes (0-65535)
  // - annualInsurance: 2 bytes (0-65535)
  // - monthlyHOA: 2 bytes (0-65535)
  // Total: 14 bytes
  const buffer = new ArrayBuffer(14)
  const view = new DataView(buffer)

  // 3. Write values to the buffer
  let offset = 0

  // homePrice (3 bytes)
  view.setUint16(offset, homePrice & 0xffff) // Lower 16 bits
  offset += 2
  view.setUint8(offset, (homePrice >> 16) & 0xff) // Upper 8 bits
  offset += 1

  // downPayment (3 bytes)
  view.setUint16(offset, downPayment & 0xffff) // Lower 16 bits
  offset += 2
  view.setUint8(offset, (downPayment >> 16) & 0xff) // Upper 8 bits
  offset += 1

  // loanTerm (1 byte)
  view.setUint8(offset, values.loanTerm)
  offset += 1

  // interestRate (1 byte) - scaled by 10 to preserve one decimal place
  view.setUint8(offset, Math.round(interestRate * 10))
  offset += 1

  // annualTaxes (2 bytes)
  view.setUint16(offset, annualTaxes)
  offset += 2

  // annualInsurance (2 bytes)
  view.setUint16(offset, annualInsurance)
  offset += 2

  // monthlyHOA (2 bytes)
  view.setUint16(offset, monthlyHOA)
  offset += 2

  // 4. Convert buffer to a Base64 string
  const bytes = new Uint8Array(buffer)
  const binary = String.fromCharCode.apply(null, Array.from(bytes))
  const base64 = btoa(binary)

  // 5. Make the Base64 string URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Decodes a hash string back into form values
 *
 * @param hash - The hash string to decode
 * @returns The decoded form values
 */
export const parseShortUrlHashForMonthlyPaymentCalculator = (
  hash: string,
): MonthlyPaymentFormValues => {
  // 1. Convert URL-safe Base64 back to regular Base64
  const base64 = hash.replace(/-/g, '+').replace(/_/g, '/')

  // 2. Add padding if needed
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const paddedBase64 = base64 + padding

  // 3. Decode Base64 to binary
  const binary = atob(paddedBase64)

  // 4. Convert binary to Uint8Array
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  // 5. Create a DataView to read values
  const buffer = bytes.buffer
  const view = new DataView(buffer)

  // 6. Read values from the buffer
  let offset = 0

  // homePrice (3 bytes)
  const homePriceLow = view.getUint16(offset)
  offset += 2
  const homePriceHigh = view.getUint8(offset)
  offset += 1
  const homePrice = (homePriceHigh << 16) | homePriceLow

  // downPayment (3 bytes)
  const downPaymentLow = view.getUint16(offset)
  offset += 2
  const downPaymentHigh = view.getUint8(offset)
  offset += 1
  const downPayment = (downPaymentHigh << 16) | downPaymentLow

  // loanTerm (1 byte)
  const loanTerm = view.getUint8(offset)
  offset += 1

  // interestRate (1 byte) - scaled by 10
  const interestRate = view.getUint8(offset) / 10
  offset += 1

  // annualTaxes (2 bytes)
  const annualTaxes = view.getUint16(offset)
  offset += 2

  // annualInsurance (2 bytes)
  const annualInsurance = view.getUint16(offset)
  offset += 2

  // monthlyHOA (2 bytes)
  const monthlyHOA = view.getUint16(offset)
  offset += 2

  // 7. Return the decoded form values
  return {
    homePrice: homePrice.toString(),
    downPayment: downPayment.toString(),
    loanTerm,
    interestRate: interestRate.toString(),
    annualTaxes: annualTaxes.toString(),
    annualInsurance: annualInsurance.toString(),
    monthlyHOA: monthlyHOA.toString(),
  }
}
