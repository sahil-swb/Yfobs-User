import React, { useEffect, useRef } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../components/invoiceTemplates/Template1';
import Template2 from '../../components/invoiceTemplates/Template2';
import Template4 from '../../components/invoiceTemplates/Template4';
import Template3 from '../../components/invoiceTemplates/Template3';
import { useDispatch } from 'react-redux';
import { getEstimateById } from '../../slices/estimatesSlice';

const EstimateDetails = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    console.log(_id);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    useEffect(() => {
        let payload = {
            _id: _id
        };
        dispatch(getEstimateById({ payload }));
    }, []);
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
                                <Dropdown.Item as={Link} target="_blank" to="/estimates_preview">
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
                    {/* <Template2 ref={componentRef} /> */}
                    {/* <Template3 ref={componentRef} /> */}
                    {/* <Template4 ref={componentRef} /> */}
                </Col>
            </Row>
        </div>
    );
};

export default EstimateDetails;
