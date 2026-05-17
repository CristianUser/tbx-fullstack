import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

// Mock Header to isolate Layout test
jest.mock('./Header', () => () => <div data-testid="header-mock">Header Component</div>);

describe('Layout component', () => {
  it('renders Header and children', () => {
    render(
      <Layout>
        <div data-testid="child-mock">Child Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('child-mock')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
