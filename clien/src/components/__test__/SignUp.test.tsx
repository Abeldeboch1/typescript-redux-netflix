import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import SignUp from '../../pages/SignUp';

 test('should render a text area', () => {
    render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>,);
 
    const textAreaElement = screen.getByText(/Get Started/i);
    expect(textAreaElement).toBeInTheDocument();
 });
    test('render "Get Started" as a text', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );
  const getStartedElement = screen.getByText('Get Started');
  expect(getStartedElement).toBeInTheDocument();
});