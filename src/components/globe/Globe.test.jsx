import { render, screen } from '@testing-library/react';
import Globe from 'components/globe';

test('renders Globe Component', () => {
  render(<Globe />);
  const linkElement = screen.getByText(/Globe Component/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders ISS marker', () => {
  render(<Globe />);
  const linkElement = screen.getByText(/ISS/i);
  expect(linkElement).toBeInTheDocument();
});
