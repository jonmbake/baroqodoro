import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('test renders navbar', () => {
  render(<App />);
  const navigationElement = screen.getByRole("navigation");
  expect(navigationElement).toBeInTheDocument();
});
