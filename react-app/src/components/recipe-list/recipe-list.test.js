import { render, screen } from '@testing-library/react';
import RecipeList from './recipe-list';

test('renders learn react link', () => {
  const res = render(<RecipeList recipes={{}}/>);
  const linkElement = res.container.querySelector('#test');
  expect(linkElement).toBeDefined();
});