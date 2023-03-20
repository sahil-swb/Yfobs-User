import React from 'react';

import { Field, Formik, Form } from 'formik';
import { Col, Button, Row, Card } from 'react-bootstrap';

const ReCaptchaSettings = () => {
    const handlersSubmit = (values) => {
        console.log(values);
    };
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-2">Update Settings</h5>
                        </Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={{
                                    captchaSitekey: '',
                                    captchaSecretkey: ''
                                }}
                                onSubmit={(values) => handlersSubmit(values)}
                            >
                                <Form>
                                    <label className="form-label">Captcha Site key</label>
                                    <Field name="captchaSitekey" className="form-control mb-3" />
                                    <label className="form-label">Captcha Secret key</label>
                                    <Field name="captchaSecretkey" className="form-control mb-3" />
                                    <Button type="submit">Save Changes</Button>
                                </Form>
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ReCaptchaSettings;
