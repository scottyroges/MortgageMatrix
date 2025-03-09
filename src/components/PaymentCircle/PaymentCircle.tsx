import { useMemo } from 'react'
import styles from './PaymentCircle.module.css'

export interface PaymentSegment {
  name: string
  value: number
  percentage: number
  color: string
}

interface PaymentCircleProps {
  segments: PaymentSegment[]
  totalAmount: number
  formatCurrency: (value: number) => string
}

export const PaymentCircle = ({
  segments,
  totalAmount,
  formatCurrency,
}: PaymentCircleProps) => {
  // Generate SVG paths for circle segments
  const circleSegments = useMemo(() => {
    const size = 200 // Circle size
    const outerRadius = size / 2
    const innerRadius = outerRadius - 15 // Make the ring 15px thick
    const center = outerRadius

    let startAngle = -Math.PI / 2 // Start at the top (12 o'clock position)
    const paths = []

    for (const segment of segments) {
      if (segment.percentage <= 0) continue

      // Calculate the angle for this segment
      const angle = (segment.percentage / 100) * (2 * Math.PI)
      const endAngle = startAngle + angle

      // Calculate the outer arc points
      const outerStartX = center + outerRadius * Math.cos(startAngle)
      const outerStartY = center + outerRadius * Math.sin(startAngle)
      const outerEndX = center + outerRadius * Math.cos(endAngle)
      const outerEndY = center + outerRadius * Math.sin(endAngle)

      // Calculate the inner arc points
      const innerStartX = center + innerRadius * Math.cos(endAngle)
      const innerStartY = center + innerRadius * Math.sin(endAngle)
      const innerEndX = center + innerRadius * Math.cos(startAngle)
      const innerEndY = center + innerRadius * Math.sin(startAngle)

      // Determine if the arc should be drawn the long way around
      const largeArcFlag = angle > Math.PI ? 1 : 0

      // Create the SVG path for a ring segment
      const path = `
        M ${outerStartX} ${outerStartY}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
        L ${innerStartX} ${innerStartY}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}
        Z
      `

      paths.push(
        <path key={segment.name} d={path} fill={segment.color} stroke='none' />,
      )

      // Update the start angle for the next segment
      startAngle = endAngle
    }

    return paths
  }, [segments])

  return (
    <div className={styles.paymentCircleContainer}>
      <svg
        className={styles.paymentCircle}
        viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'
      >
        {circleSegments}
      </svg>
      <div className={styles.paymentAmount}>
        {formatCurrency(totalAmount)}
        <div className={styles.perMonth}>per month</div>
      </div>
    </div>
  )
}
