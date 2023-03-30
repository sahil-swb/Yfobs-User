import React from 'react';
import { Card, Col } from 'react-bootstrap';
import invoiceImage from '../assets/images/widget/AUSTRALIA.jpg';

const InvoicesPreview = ({ children }) => {
    return (
        <div className="position-relative cursor-pointer">
            <div className="image-div eye-position-center">
                <i className="fa fa-eye" aria-hidden="true" />
            </div>
            {children}
        </div>
    );
};

export default InvoicesPreview;
