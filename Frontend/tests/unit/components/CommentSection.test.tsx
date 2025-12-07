import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

describe('Comment Section', () => {
  test('renders comment list', () => {
    const comments = [
      { id: 1, text: 'Nice post!' },
      { id: 2, text: 'Good job!' }
    ];

    render(
      <div>
        {comments.map((c) => (
          <p key={c.id}>{c.text}</p>
        ))}
      </div>
    );

    expect(screen.getByText('Nice post!')).toBeInTheDocument();
    expect(screen.getByText('Good job!')).toBeInTheDocument();
  });

  test('allows typing a comment', async () => {
    const user = userEvent.setup();

    render(<input placeholder="Write a comment..." />);

    const input = screen.getByPlaceholderText(/write a comment/i);
    await user.type(input, 'My comment');

    expect(input).toHaveValue('My comment');
  });
});
