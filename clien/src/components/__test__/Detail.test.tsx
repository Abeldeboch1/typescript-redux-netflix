import React from 'react';
import { render, screen } from '@testing-library/react';
import Detail  from '../Detail';


    it('should render same text passed into title prop', () => {
        render(<Detail 
                title='My Header' fetchUrl={''}            />
        );
        const headingElement = screen.getByText(/my heading/i);
        expect(headingElement).toBeInTheDocument();
    });

// it('should render same text passed into title prop', async () => {
//     render(
//         <Detail 
//             title="heading" fetchUrl={''}        />
//     );
//     const h2Element = await screen.findByText(/my heading/i);
//     expect(h2Element).toBeInTheDocument();
// });