import { render, screen } from '@testing-library/react'

import { Header } from './Header'
import { describe, expect, it } from 'vitest'

describe('Header', () => {
  it('renders with default title', () => {
    render(<Header />)
    expect(screen.getByText('Mortgage Matrix')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<Header title='Custom Title' />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })
})
