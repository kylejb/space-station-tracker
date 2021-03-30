import { render, screen } from '@testing-library/react';
import Search from './Search';

// Saved for potential reuse after learning more about mocks with Jest
// jest.mock('./Search', () => ({
//   __esModule: true,
//   default: () => {
//     return <div>Hello World</div>;
//   },
// }));

test('renders Search Component', () => {
  render(<Search />);
  const linkElement = screen.getByText(/Search results below/i);
  expect(linkElement).toBeInTheDocument();
});
