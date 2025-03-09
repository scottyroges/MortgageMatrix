import { HousePricePoint } from './housePricePoint'

export interface PriceRangeData {
  min: number
  max: number
  housePrices: HousePricePoint[]
}
