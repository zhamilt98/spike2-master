import { render, screen } from '@testing-library/react';
import SearchBar from './searchBar';

test('renders learn react link', () => {
  const res = render(<SearchBar />);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});