import React, { useRef } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../components/invoiceTemplates/Template1';

const EstimateDetails = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <div>
            {/* <h1>invoicePage</h1> */}
            <Row className="mb-5">
                <Col xl={{ span: 10, offset: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button variant="outline-primary">
                            {' '}
                            <i className="icon feather icon-edit"></i> Edit
                        </Button>
                        <Dropdown className="mx-4">
                            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                <i className="feather icon-settings"></i> Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handlePrint}>Print</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Convert to Invoice</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Export as PDF</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Send</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/estimates/estimates_preview">
                                    Preview as a Customer
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button as={Link} to="/estimates/create_estimates" variant="outline-primary">
                            + New Estimate
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Template1 ref={componentRef} />
                </Col>
            </Row>
        </div>
    );
};

export default EstimateDetails;
