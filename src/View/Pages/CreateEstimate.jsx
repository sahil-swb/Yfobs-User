import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Accordion, Badge, Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomersModal from '../../components/modals/CustomersModal';
import ProductsEstimateModal from '../../components/modals/ProductsEstimateModal';
import { getAllCustomersApi } from '../../slices/customersSlice';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import favicon from '../../assets/images/favicon-32x32.png';
import JoditEditor from 'jodit-react';
import { createEstimateApi } from '../../slices/estimatesSlice';

const CreateEstimate = () => {
    const [modalOpenType, setModalTypeOpen] = useState('');
    const [footerText, setFooterText] = useState('');
    const { getAllCustomers, createCustomer } = useSelector((state) => state.customers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, [createCustomer]);

    const handleFooterText = (e) => {
        const fText = e;
        setFooterText(fText);
    };

    const handleSubmit = (values, resetForm) => {
        const payload = {
            businessId: values?.businessId,
            title: values?.title,
            summary: values?.summary,
            ccMail: values?.ccMail,
            number: values?.number,
            posoNumber: values?.posoNumber,
            date: values?.date,
            expireOn: values?.expireOn,
            subTotal: values?.subTotal
        };

        dispatch(createEstimateApi({ payload }));
        resetForm({ payload: '' });
    };

    console.log(footerText);
    return (
        <>
            <Row>
                <Col xl={{ span: 10, offset: 1 }}>
                    <div className="d-flex mb-4" style={{ justifyContent: 'space-between' }}>
                        <h3>Create new Estimate</h3>
                        <Button as={Link} to="/estimates" variant="outline-primary">
                            All Estimates
                        </Button>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                businessId: '',
                                title: '',
                                summary: '',
                                select_customer: '',
                                ccMail: '',
                                number: '',
                                posoNumber: '',
                                date: '',
                                expireOn: '',
                                subTotal: ''
                            }}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        >
                            <Form>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Accordion.Toggle className="border-0 p-3 text-left font-weight-bold h4" eventKey="0">
                                            Business address and contact details, title, summary, and logo
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Col>
                                                        <div>
                                                            <img src={favicon} width={40} alt="Company Logo" />
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
                                                        <Field
                                                            className="form-control mb-3 border rounded"
                                                            name="select_customer"
                                                            as="select"
                                                        >
                                                            <option>Select Customer</option>
                                                            {getAllCustomers.map((val) => (
                                                                <option key={val?._id}>{val?.name}</option>
                                                            ))}
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
                                                    <div>{/* <h3>{}</h3> */}</div>
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
                                                        <Field className="form-control border rounded" name="posoNumber" type="number" />
                                                    </div>
                                                    <div>
                                                        <label>Estimate date</label>
                                                        <Field className="form-control border rounded" name="date" type="date" />
                                                    </div>
                                                    <div>
                                                        <label>Expires on</label>
                                                        <Field className="form-control border rounded" name="expireOn" type="date" />
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
                                                <div className="text-right font-weight-bold h5">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item>
                                                            <span className="mr-5">Sub Total</span> 0
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <label className="mr-3">Discount in %</label>
                                                            <Field
                                                                className="mr-5 rounded p-1"
                                                                style={{ width: '40px' }}
                                                                name="discount"
                                                                type="number"
                                                            />
                                                            <span>0</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <label className="mr-3">Tax in %</label>
                                                            <Field
                                                                className="mr-5 rounded p-1"
                                                                style={{ width: '40px' }}
                                                                name="tax"
                                                                type="number"
                                                            />
                                                            <span>0</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <span className="mr-5"> Grand Total</span> 0
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header as="h4">Footer</Card.Header>
                                    <Card.Body>
                                        <JoditEditor value={footerText} onChange={handleFooterText} />
                                    </Card.Body>
                                </Card>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="submit">Save Estimate</Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {modalOpenType === 'CUSTOMERS' ? <CustomersModal /> : modalOpenType === 'PRODUCTS' ? <ProductsEstimateModal /> : null}
                </Col>
            </Row>
        </>
    );
};

export default CreateEstimate;
