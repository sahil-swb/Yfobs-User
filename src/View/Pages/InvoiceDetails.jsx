import React, { useEffect, useRef } from 'react';
import { Badge, Button, Card, Col, Dropdown, Row, Table } from 'react-bootstrap';
import Template1 from '../../components/invoiceTemplates/Template1';
import '../../assets/css/cardStyle.css';
import { Link, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { commonDeleteModal, commonModalIsOpen } from '../../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { getSingleInvoice } from '../../slices/invoiceSlice';

const InvoiceDetails = () => {
    const { getSingleInvoiceData } = useSelector((state) => state.invoiceReducer);
    const { _id } = useParams();
    const componentRef = useRef();
    const dispatch = useDispatch();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    useEffect(() => {
        let payload = {
            _id: _id
        };
        dispatch(getSingleInvoice({ payload }));
    }, [_id]);
    const location = {
        pathname: `/invoices/edit_invoice/${_id}`,
        state: 'EDIT_INVOICE'
    };
    return (
        <>
            <div className="bg-white p-5 rounded">
                <div className="d-flex justify-content-between align-items-center my-4">
                    <div>
                        <h3>Invoice</h3>
                        <p>Created: 03 Apr 2023</p>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Link to={location}>
                                <Button variant="outline-primary">
                                    {' '}
                                    <i className="icon feather icon-edit"></i> Edit
                                </Button>
                            </Link>
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
                            <Button as={Link} to="/invoices/create_invoices" variant="outline-primary">
                                + New Invoice
                            </Button>
                        </div>
                    </div>
                </div>

                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Customer</th>
                                <th>Amount Due</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Badge className="bg-secondary p-2 text-white">Draft</Badge>
                                </td>
                                <td>Mark</td>
                                <td>€ 945</td>
                                <td>€ 945</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', height: '100%', borderLeft: '5px solid #b2c2cd', left: '30px' }}></div>
                    <Card
                        className="p-2"
                        style={{ background: '#fff8ec', border: '2px dashed #fcc525', borderRadius: '0.5rem', marginTop: '3rem' }}
                    >
                        <Card.Body>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>Draft Invoice</h4>
                                    <Button variant="outline-primary">Approve</Button>
                                </div>
                                <p>
                                    <i className="fa fa-info-circle mr-1" aria-hidden="true"></i>
                                    <b>This is a DRAFT invoice. You can take further actions once you approve it</b>
                                </p>
                                <div>
                                    <b>
                                        Created On: <span>03 Apr 2023</span>
                                    </b>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="invoice-card-div">
                        <Card.Body className="invoice-card-body-div">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="m-0 mb-2">Send invoice</h5>
                                    <h5 className="m-0">Last sent: None</h5>
                                </div>
                                <Button>Approve</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="invoice-card-div">
                        <Card.Body className="invoice-card-body-div">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="m-0">Amount Due: € 945</h5>
                                <Button>Approve</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <Template1 ref={componentRef} type={'Invoice'} />
            </div>
            <DeleteConfModal del_id={getSingleInvoiceData?._id} type={'INVOICES'} title={getSingleInvoiceData?.title} />
        </>
    );
};

export default InvoiceDetails;
