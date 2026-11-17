import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import App from './App';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

describe('Little Lemon Application & Accessibility Tests', () => {
  it('renders the Little Lemon Hero heading on the Home page', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /Little Lemon/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('has no automated WCAG accessibility violations on the Home page', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('navigates to the Menu page and filters dishes using the search bar', () => {
    render(<App />);
    const menuButtons = screen.getAllByText(/^Menu$/i);
    fireEvent.click(menuButtons[0]);

    const searchInput = screen.getByPlaceholderText(/Search dishes/i);
    fireEvent.change(searchInput, { target: { value: 'Baklava' } });

    expect(screen.getByText(/Baklava/i)).toBeInTheDocument();
    expect(screen.queryByText(/Greek Salad/i)).not.toBeInTheDocument();
  });

  it('shows validation errors on Contact form when submitted empty', () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
  });

  it('shows validation errors on Checkout page when submitted empty', () => {
    render(<Checkout cartItems={[{ id: 1, name: 'Greek Salad', price: 12.99, quantity: 1 }]} />);
    const payButton = screen.getByRole('button', { name: /Confirm & Pay/i });
    fireEvent.click(payButton);

    expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Street address is required/i)).toBeInTheDocument();
  });
});
