import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Header', () => {
  it('renders with default title', () => {
    render(<Header />);
    expect(screen.getByText('Mortgage Matrix')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Header title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
