import React from 'react';
import { render, screen } from '@testing-library/react';
import Row from '../Row';

describe('Row', () => {
    it('should render same text passed into title prop', () => {
        render(
            <Row 
                title='my heading' fetchUrl={''}            />
        );
        const h2Element = screen.getByText(/my heading/i);
        expect(h2Element).toBeInTheDocument();
    });
})
it('should render same text passed into title prop', async () => {
    render(
        <Row 
            title="heading" fetchUrl={''}        />
    );
    const h2Element = await screen.findByText(/my heading/i);
    expect(h2Element).toBeInTheDocument();
});