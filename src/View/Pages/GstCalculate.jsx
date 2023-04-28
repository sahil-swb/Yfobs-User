import { Field, Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const GstCalculate = () => {
    const [showGstData, setShowGstData] = useState('');
    const [showInxclusiveGstData, setShowInclusiveGstData] = useState('');

    const initialValues = {
        amount: '',
        tax: ''
    };
    const gstCalculate = (values) => {
        let amount = Number(values.amount);
        let TAXS = Number(values.tax);
        let gst = (amount * TAXS) / 100;

        setShowGstData({
            originalAmount: values.amount,
            gst: gst,
            tax: values.tax,
            cgst: (gst / 2).toFixed(2),
            sgst: (gst / 2).toFixed(2),
            igst: gst.toFixed(2),
            totalAmount: (values.amount + gst).toFixed(2)
        });
        let a = amount * TAXS;
        let b = 100 + TAXS;
        let InGst = a / b;

        setShowInclusiveGstData({
            originalAmount: amount - InGst,
            gst: InGst,
            tax: TAXS,
            cgst: (InGst / 2).toFixed(2),
            sgst: (InGst / 2).toFixed(2),
            igst: InGst.toFixed(2),
            totalAmount: amount.toFixed(2)
        });

        console.log(InGst);
    };
    return (
        <>
            <Row className="font-weight-bold">
                <Col>
                    <Card>
                        <Card.Header>GST Calculate</Card.Header>
                        <Card.Body>
                            <Formik initialValues={initialValues} onSubmit={(values) => gstCalculate(values)}>
                                <Form>
                                    <label className="form-label">
                                        Amount <span className="text-danger">*</span>
                                    </label>
                                    <Field name="amount" type="number" className="form-control mb-2" required />
                                    <label className="form-label">Tax Value</label>
                                    <Field as="select" name="tax" className="form-control mb-4">
                                        <option value="0">0%</option>
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </Field>
                                    <Button type="submit">Calculate</Button>
                                </Form>
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Exclusive Tax</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Original Amount:</span> {showGstData?.originalAmount}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">Tax: </span>{' '}
                                        {showGstData?.tax === '' ? 0 : showGstData?.tax || 0}%
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">CGST Amount: </span> {showGstData?.cgst}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">SGST Amount: </span> {showGstData?.sgst}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">Total Amount: </span> {showGstData?.totalAmount}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Original Amount: </span> {showGstData?.originalAmount}{' '}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">Tax: </span>{' '}
                                        {showGstData?.tax === '' ? 0 : showGstData?.tax || 0}%
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">IGST Amount: </span> {showGstData?.igst}{' '}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className="font-weight-bold">Total Amount: </span> {showGstData?.totalAmount}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Inclusive Tax</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Original Amount: </span>
                                        {showInxclusiveGstData?.originalAmount}
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Tax: </span>
                                        {showInxclusiveGstData?.tax === '' ? 0 : showInxclusiveGstData?.tax || 0} %
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">CGST Amount: </span>
                                        {showInxclusiveGstData?.cgst}
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">SGST Amount: </span>
                                        {showInxclusiveGstData?.sgst}
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Total Amount: </span>
                                        {showInxclusiveGstData?.totalAmount}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Original Amount: </span>
                                        {showInxclusiveGstData?.originalAmount}
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Tax: </span>
                                        {showInxclusiveGstData?.tax === '' ? 0 : showInxclusiveGstData?.tax || 0} %
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">IGST Amount: </span>
                                        {showInxclusiveGstData?.igst}
                                    </Card.Text>
                                    <Card.Text>
                                        {' '}
                                        <span className="font-weight-bold">Total Amount: </span>
                                        {showInxclusiveGstData?.totalAmount}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default GstCalculate;
