import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import NotAvailable from '../NotAvailable';
test('should render a text area', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <NotAvailable />
            </BrowserRouter>
        </Provider>,);

    const textAreaElement = screen.getByText(/No Movies avaialble for the selected genre. Please select a different/i);
    expect(textAreaElement).toBeInTheDocument();
});

// test('render "No Movies avaialble for the selected genre. Please select a different" as a text', () => {
//     render(
//         <Provider store={store}>
//             <BrowserRouter>
//                 <NotAvailable />
//             </BrowserRouter>
//         </Provider>
//     );
//     const getStartedElement = screen.getByText('No Movies avaialble for the selected genre. Please select a different');
//     expect(getStartedElement).toBeInTheDocument();
// });