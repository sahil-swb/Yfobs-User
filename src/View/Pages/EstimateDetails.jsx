import React, { useEffect, useRef } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../components/invoiceTemplates/Template1';
import Template2 from '../../components/invoiceTemplates/Template2';
import Template4 from '../../components/invoiceTemplates/Template4';
import Template3 from '../../components/invoiceTemplates/Template3';
import { useDispatch, useSelector } from 'react-redux';
import { getEstimateById } from '../../slices/estimatesSlice';
import { commonDeleteModal, commonModalIsOpen, setRowData } from '../../slices/modalSlice';
import EstimateSendModal from '../../components/modals/EstimateSendModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';

const EstimateDetails = () => {
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);

    const { _id } = useParams();
    const dispatch = useDispatch();
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    useEffect(() => {
        let payload = {
            _id: '644a6e97652be6313a8ca304'
        };
        dispatch(getEstimateById({ payload }));
    }, [_id]);
    return (
        <>
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
                                    <Dropdown.Item onClick={() => dispatch(commonModalIsOpen(true))}>Send</Dropdown.Item>
                                    <Dropdown.Item as={Link} target="_blank" to="/estimates_preview">
                                        Preview as a Customer
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            dispatch(commonDeleteModal(true));
                                        }}
                                    >
                                        Delete
                                    </Dropdown.Item>
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
                        <Template1 ref={componentRef} type={'Estimate'} />
                        {/* <Template2 ref={componentRef} /> */}
                        {/* <Template3 ref={componentRef} /> */}
                        {/* <Template4 ref={componentRef} /> */}
                    </Col>
                </Row>
            </div>
            <EstimateSendModal />
            <DeleteConfModal del_id={getSingleEstimate?._id} type={'ESTIMATES'} title={getSingleEstimate?.title} />
        </>
    );
};

export default EstimateDetails;
