import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Home component to isolate App test
jest.mock('./pages/Home', () => () => <div data-testid="home-mock">Home Component</div>);

describe('App component', () => {
  it('renders the Home component', () => {
    render(<App />);
    expect(screen.getByTestId('home-mock')).toBeInTheDocument();
  });
});
