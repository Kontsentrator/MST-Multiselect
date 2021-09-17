import { render, screen } from '@testing-library/react';
import Multiselect from './Multiselect';

test('renders learn react link', () => {
  render(<Multiselect />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
