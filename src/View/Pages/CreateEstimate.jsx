import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomersModal from '../../components/modals/CustomersModal';
import ProductsEstimateModal from '../../components/modals/ProductsEstimateModal';
import { getAllCustomersApi } from '../../slices/customersSlice';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';

const CreateEstimate = () => {
    const [modalOpenType, setModalTypeOpen] = useState('');
    const { getAllCustomers } = useSelector((state) => state.customers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, []);
    console.log(getAllCustomers);
    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        isBankDetails: '',
                        isAttchPdf: '',
                        businessId: '',
                        title: '',
                        type: '',
                        recurring: '',
                        summary: '',
                        number: '',
                        posoNumber: '',
                        isBankdetails: '',
                        date: '',
                        discount: '',
                        footerNote: '',
                        subTotal: '',
                        tax: '',
                        grandTotal: '',
                        convertTotal: '',
                        status: '',
                        ccMail: '',
                        isAttchpdf: '',
                        isSent: '',
                        isCompleted: '',
                        frequencyCount: '',
                        autoSend: '',
                        customers: ''
                    }}
                >
                    <Form>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle className="border-0 p-3 text-left font-weight-bold" eventKey="0">
                                    Business address and contact details, title, summary, and logo
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Col>
                                                <div>
                                                    <img src="" alt="Company Logo" />
                                                </div>
                                                <div>
                                                    <strong>SilverWebbuzz</strong>, india
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="mb-2">
                                                    <Field
                                                        className="form-control border rounded"
                                                        name="title"
                                                        type="text"
                                                        placeholder="Title"
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        className="form-control border rounded"
                                                        name="summary"
                                                        type="text"
                                                        placeholder="Summary example: project name, description of estimate"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <Card>
                            <Card.Body>
                                <Row className="mb-4">
                                    <Col>
                                        <div className="w-50">
                                            <div className="mb-3">
                                                <Field className="form-control mb-3 border rounded" name="customers" as="select">
                                                    {getAllCustomers.map((val) => {
                                                        return <option key={val?._id}>{val?.name}</option>;
                                                    })}
                                                </Field>
                                                <Button
                                                    onClick={() => {
                                                        dispatch(commonModalIsOpen(true));
                                                        dispatch(commonModalType('ADD'));
                                                        setModalTypeOpen('CUSTOMERS');
                                                    }}
                                                    variant="outline-primary"
                                                >
                                                    Add a customer
                                                </Button>
                                            </div>
                                            <div>
                                                <label>Other E-mail Send</label>
                                                <Field className="form-control border rounded" name="ccMail" type="email" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="w-50 mr-0 ml-auto">
                                            <div className="">
                                                <label>Estimate number</label>
                                                <Field className="form-control border rounded" name="number" type="number" />
                                            </div>
                                            <div>
                                                <label>P.O./S.O. number</label>
                                                <Field className="form-control border rounded" name="number" type="number" />
                                            </div>
                                            <div>
                                                <label>Estimate date</label>
                                                <Field className="form-control border rounded" name="number" type="number" />
                                            </div>
                                            <div>
                                                <label>Expires on</label>
                                                <Field className="form-control border rounded" name="number" type="number" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col lg={{ span: 10, offset: 1 }}>
                                        <div>
                                            <Table responsive striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('ADD'));
                                                    setModalTypeOpen('PRODUCTS');
                                                }}
                                                variant="outline-primary"
                                            >
                                                Add an Item
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form>
                </Formik>
            </div>
            {modalOpenType === 'CUSTOMERS' ? <CustomersModal /> : modalOpenType === 'PRODUCTS' ? <ProductsEstimateModal /> : null}
        </>
    );
};

export default CreateEstimate;
