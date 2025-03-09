/**
 * Utility functions for parameter hashing to create shorter URLs
 */

import type { AffordabilityFormValues } from '../types/affordabilityFormValues'

/**
 * Updates the browser URL with form parameters without reloading the page
 *
 * @param values - The form values
 */
export const updateBrowserUrlForAffordabilityEstimator = (
  values: AffordabilityFormValues,
): void => {
  const hash = generateShortUrlHashForAffordabilityEstimator(values)
  window.history.replaceState({}, '', `${window.location.pathname}?p=${hash}`)
}

/**
 * Encodes form values into a compact hash string
 *
 * @param values - The form values to encode
 * @returns A compact hash string
 */
export const generateShortUrlHashForAffordabilityEstimator = (
  values: AffordabilityFormValues,
): string => {
  // Convert form values to a more compact representation
  // We'll use a binary buffer to store the values efficiently

  // 1. Convert string values to numbers
  const monthlyPayment = parseInt(values.monthlyPayment, 10)
  const downPayment = parseInt(values.downPayment, 10)
  const insurance = parseInt(values.insurance, 10)
  const hoa = parseInt(values.hoa, 10)

  // 2. Create a binary buffer to store all values
  // We'll allocate enough bytes for all our values
  // - monthlyPayment: 2 bytes (0-65535)
  // - downPayment: 3 bytes (0-16777215)
  // - interestRateMin: 1 byte (0-255, scaled by 10)
  // - interestRateMax: 1 byte (0-255, scaled by 10)
  // - propertyTaxMin: 2 bytes (0-65535)
  // - propertyTaxMax: 2 bytes (0-65535)
  // - insurance: 2 bytes (0-65535)
  // - hoa: 2 bytes (0-65535)
  // Total: 15 bytes
  const buffer = new ArrayBuffer(15)
  const view = new DataView(buffer)

  // 3. Write values to the buffer
  let offset = 0

  // monthlyPayment (2 bytes)
  view.setUint16(offset, monthlyPayment)
  offset += 2

  // downPayment (3 bytes)
  view.setUint16(offset, downPayment & 0xffff) // Lower 16 bits
  offset += 2
  view.setUint8(offset, (downPayment >> 16) & 0xff) // Upper 8 bits
  offset += 1

  // interestRateRange (2 bytes)
  view.setUint8(offset, Math.round(values.interestRateRange.min * 10))
  offset += 1
  view.setUint8(offset, Math.round(values.interestRateRange.max * 10))
  offset += 1

  // propertyTaxRange (4 bytes)
  view.setUint16(offset, values.propertyTaxRange.min)
  offset += 2
  view.setUint16(offset, values.propertyTaxRange.max)
  offset += 2

  // insurance (2 bytes)
  view.setUint16(offset, insurance)
  offset += 2

  // hoa (2 bytes)
  view.setUint16(offset, hoa)
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
export const parseShortUrlHashForAffordabilityEstimator = (
  hash: string,
): AffordabilityFormValues => {
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

  // monthlyPayment (2 bytes)
  const monthlyPayment = view.getUint16(offset)
  offset += 2

  // downPayment (3 bytes)
  const downPaymentLow = view.getUint16(offset)
  offset += 2
  const downPaymentHigh = view.getUint8(offset)
  offset += 1
  const downPayment = (downPaymentHigh << 16) | downPaymentLow

  // interestRateRange (2 bytes)
  const interestRateMin = view.getUint8(offset) / 10
  offset += 1
  const interestRateMax = view.getUint8(offset) / 10
  offset += 1

  // propertyTaxRange (4 bytes)
  const propertyTaxMin = view.getUint16(offset)
  offset += 2
  const propertyTaxMax = view.getUint16(offset)
  offset += 2

  // insurance (2 bytes)
  const insurance = view.getUint16(offset)
  offset += 2

  // hoa (2 bytes)
  const hoa = view.getUint16(offset)
  offset += 2

  // 7. Return the decoded form values
  return {
    monthlyPayment: monthlyPayment.toString(),
    downPayment: downPayment.toString(),
    interestRateRange: {
      min: interestRateMin,
      max: interestRateMax,
    },
    propertyTaxRange: {
      min: propertyTaxMin,
      max: propertyTaxMax,
    },
    insurance: insurance.toString(),
    hoa: hoa.toString(),
  }
}
