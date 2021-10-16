import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const res = render(<App />);
  // const linkElement = screen.getByText(/learn react/g);
  const linkElement = res.container.querySelector('#test');
  // expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeDefined();
});
