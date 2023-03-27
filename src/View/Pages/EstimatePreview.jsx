import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../components/invoiceTemplates/Template1';

const EstimatePreview = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <Row>
            <Col md={{ span: 10, offset: 1 }}>
                <Template1 ref={componentRef} />
            </Col>
        </Row>
    );
};

export default EstimatePreview;
