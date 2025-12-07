import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

describe('Search bar', () => {
  test('renders input', () => {
    render(<input placeholder="Search..." />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  test('allows typing', async () => {
    const user = userEvent.setup();
    render(<input placeholder="Search..." />);

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'hello');

    expect(input).toHaveValue('hello');
  });
});
