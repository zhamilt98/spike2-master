import { render, screen } from '@testing-library/react';
import LoginPage from './loginPage';

test('renders learn react link', () => {
  const res = render(<LoginPage />);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});