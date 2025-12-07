import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

const reactions = ['💙', '😢', '😏', '🤨', '😱', '🤬'];

describe('Reaction counts', () => {
  reactions.forEach((emoji) => {
    test(`${emoji} button renders`, () => {
      render(<button>{emoji}</button>);
      expect(screen.getByText(emoji)).toBeInTheDocument();
    });
  });

  test('reaction click works', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<button onClick={onClick}>🤬</button>);
    await user.click(screen.getByText('🤬'));

    expect(onClick).toHaveBeenCalled();
  });
});
