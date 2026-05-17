import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './Home';

// Mock Layout to simplify DOM output
jest.mock('../components/Layout', () => ({ children }) => <div data-testid="layout-mock">{children}</div>);

describe('Home component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders error message when fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch data'));
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('renders data when fetch is successful', async () => {
    const mockData = [
      {
        file: 'test1.csv',
        lines: [
          { text: 'Some text', number: 42, hex: '2a' }
        ]
      }
    ];

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('test1.csv')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Some text')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('2a')).toBeInTheDocument();
  });

  it('refetches data with fileName filter when a file link is clicked', async () => {
    const mockData = [
      {
        file: 'test2.csv',
        lines: [
          { text: 'Another text', number: 10, hex: '0a' }
        ]
      }
    ];

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    render(<Home />);

    // Wait for the initial load
    await waitFor(() => {
      expect(screen.getByText('test2.csv')).toBeInTheDocument();
    });

    // Clear the mock so we can verify the second call
    global.fetch.mockClear();

    // Mock the response for the filtered fetch
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    // Click the file name
    fireEvent.click(screen.getByText('test2.csv'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Verify it added the fileName parameter
    const fetchUrl = global.fetch.mock.calls[0][0];
    expect(fetchUrl).toContain('fileName=test2.csv');
  });
});
