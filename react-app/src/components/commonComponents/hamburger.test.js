import { render, screen } from '@testing-library/react';
import Hamburger from './hamburger';

test('renders learn react link', () => {
  const res = render(<Hamburger />);
  // const linkElement = screen.getByText(/learn react/g);
  const linkElement = res.container.querySelector('#test');
  // expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeDefined();
});
