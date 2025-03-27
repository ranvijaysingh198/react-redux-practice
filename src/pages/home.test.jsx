import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Home from './home';

test('renders home component', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText(/Posts/i)).toBeInTheDocument();
});