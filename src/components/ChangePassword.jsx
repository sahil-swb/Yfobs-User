import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const ChangePassword = () => {
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <>
            <Card>
                <Card.Header>Change Password</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            password: '',
                            newPassword: '',
                            confirmNewPassword: ''
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <div>
                                <label>Old Password</label>
                                <Field className="form-control" type="password" name="password" />
                            </div>
                            <div className="mt-3">
                                <label>New Password</label>
                                <Field className="form-control" type="password" name="newPassword" />
                            </div>
                            <div className="mt-3">
                                <label>Confirm New Password</label>
                                <Field className="form-control" type="password" name="confirmNewPassword" />
                            </div>
                        </Form>
                    </Formik>
                </Card.Body>
                <Card.Footer>
                    <Button type="submit">Submit</Button>
                </Card.Footer>
            </Card>
        </>
    );
};

export default ChangePassword;
