import { Field, Form, Formik } from 'formik';
import JoditEditor from 'jodit-react';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import invoiceImage from '../assets/images/widget/AUSTRALIA.jpg';
import '../assets/css/invoiceCustomStyle.css';
import EditorJoditWYSIWYG from './EditorJoditWYSIWYG';
import InvoicesPreview from './InvoicesPreview';
import { useDispatch } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../slices/modalSlice';
import TemplateImage from './TemplateImage';

const InvoiceCustomization = () => {
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <Card>
                <Card.Header>Invoice Customization</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            template: ''
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <div>
                                <Row>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-1'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={invoiceImage} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="template" value="template1" />
                                                    <span>Template 1</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-2'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={invoiceImage} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="template" value="template2" />
                                                    <span>Template 2</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-3'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={invoiceImage} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="template" value="template3" />
                                                    <span>Template 3</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-4'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={invoiceImage} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="template" value="template4" />
                                                    <span>Template 4</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mt-3">
                                <label>Change Invoice Template Color</label>
                                <Field className="form-control" type="text" name="newPassword" />
                            </div>
                            <div className="mt-3">
                                <label>Set default footer note for invoice</label>
                                <JoditEditor />
                            </div>
                        </Form>
                    </Formik>
                </Card.Body>
                <Card.Footer>
                    <Button type="submit">Submit</Button>
                </Card.Footer>
            </Card>
            <TemplateImage />
        </>
    );
};

export default InvoiceCustomization;
