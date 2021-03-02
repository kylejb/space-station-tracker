import { render, screen } from '@testing-library/react';
import Earth from 'components/earth';

test('renders Earth Component', () => {
  render(<Earth />);
  const linkElement = screen.getByText(/Earth Component/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders ISS marker', () => {
  render(<Earth />);
  const linkElement = screen.getByText(/ISS/i);
  expect(linkElement).toBeInTheDocument();
});
