import { render, screen } from '@testing-library/react';
import LikesPage from './liked-recipe-page';

test('renders learn react link', () => {
  const res = render(<LikesPage />);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});
