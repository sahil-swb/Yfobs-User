import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Reports = () => {
    return (
        <>
            <div>
                <h3>Reports</h3>
                <Card body>
                    {' '}
                    <Formik initialValues={{ name: '' }} onSubmit={(values) => values}>
                        <Form>
                            <Row>
                                <Col>
                                    <Field as="select" name="tax" className="form-control mb-4">
                                        <option value="0">0%</option>
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </Field>
                                </Col>
                                <Col>
                                    <Field as="select" name="tax" className="form-control mb-4">
                                        <option value="0">0%</option>
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </Field>
                                </Col>
                                <Col>
                                    <Field as="select" name="tax" className="form-control mb-4">
                                        <option value="0">0%</option>
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </Field>
                                </Col>
                            </Row>
                        </Form>
                    </Formik>
                </Card>
                ;
            </div>
        </>
    );
};

export default Reports;
