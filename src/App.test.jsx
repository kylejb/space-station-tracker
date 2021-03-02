import { render, screen } from '@testing-library/react';
import MockApp from '__mock__/App';

test('renders App Component', () => {
  render(<MockApp />);
  const linkElement = screen.getByText(/App Component/i);
  expect(linkElement).toBeInTheDocument();
});
