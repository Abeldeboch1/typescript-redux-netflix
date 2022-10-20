import React from 'react';
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LogIn from '../../pages/LogIn';
import store from '../../store';
// test('render "Login" as a text', () => {
//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <LogIn/>
//       </BrowserRouter>
//     </Provider>,
//   );
//   const viewExerciseList = screen.getByLabelText('Login');
//   expect(viewExerciseList).toBeInTheDocument();
// });

test('should the button have attribute onClick', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    </Provider>,
  );
  const buttonElement = screen.getByTestId('custom-element');
  expect(buttonElement).toBeInTheDocument();
});

test('should the input has a place holder Enter email address..', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    </Provider>,
  );
  const placeHolder = screen.getByPlaceholderText(/password/i);
  expect(placeHolder).toBeInTheDocument();
});
