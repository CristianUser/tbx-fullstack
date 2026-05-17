import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders the branding text', () => {
    render(<Header />);
    const brandElement = screen.getByText(/React Test App/i);
    expect(brandElement).toBeInTheDocument();
  });
});
