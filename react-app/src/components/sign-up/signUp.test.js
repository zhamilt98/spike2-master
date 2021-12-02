import { render, screen } from '@testing-library/react';
import SignUp from './signUp';

test('renders learn react link', () => {
  const res = render(<SignUp />);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});