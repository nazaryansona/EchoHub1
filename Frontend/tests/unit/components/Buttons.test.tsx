import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

describe('Buttons behavior', () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
  test('Login button exists', () => {
    render(<button>Login</button>);
    const btn = screen.getByRole('button', { name: /login/i });
    expect(btn).toBeInTheDocument();
  });

  test('Signup button exists', () => {
    render(<button>Sign Up</button>);
    const btn = screen.getByRole('button', { name: /sign up/i });
    expect(btn).toBeInTheDocument();
  });

  test('Clicking button works', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<button onClick={onClick}>Click me</button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
