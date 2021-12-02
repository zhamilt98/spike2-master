import { render, screen } from '@testing-library/react';
import Profile from './profile';

test('renders learn react link', () => {
  const res = render(<Profile />);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});