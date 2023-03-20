//react and bootstrap imports
import React, { useEffect } from 'react';
import { Col, Button, Card, Row } from 'react-bootstrap';
//package imports
import { Field, Formik, Form } from 'formik';
//custom imports
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenaralSettings, mailSettings } from '../slices/settingsSlice';
//component for email setting use in genaral settings
const EmailSettings = () => {
    //states
    const dispatch = useDispatch();
    const result = useSelector((state) => state.genaral.mailSettingsData);
    const prefillData = useSelector((state) => state.genaral.allGenaralSettingsData[0]);

    console.log(result, 'result');

    //submit function for email setting
    const handleESubmit = (values) => {
        console.log(values);
        const payload = {
            id: '63a9a0977ed9a103a4b911bb',
            mail_protocol: values.mailProtocol,
            mail_host: values.mailHost,
            mail_port: values.mailPort,
            mail_username: values.emailUsername,
            mail_password: values.mailPassword,
            mail_title: values.mailTitle
        };
        dispatch(mailSettings({ payload }));
    };
    //initial value for form
    const emailInitialValues = {
        mailProtocol: prefillData?.mailProtocol,
        mailTitle: prefillData?.mailTitle,
        mailHost: prefillData?.mailHost,
        mailPort: prefillData?.mailPort,
        emailUsername: prefillData?.mailUsername,
        mailPassword: prefillData?.mailPassword
    };

    useEffect(() => {
        dispatch(getAllGenaralSettings());
    }, []);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-2">Update Settings</h5>
                        </Card.Header>
                        <Card.Body>
                            <Formik enableReinitialize initialValues={emailInitialValues} onSubmit={(values) => handleESubmit(values)}>
                                <Form>
                                    <label className="form-label">Mail Protocol</label>

                                    <Field as="select" className="form-control" name="mailProtocol">
                                        <option value="smtp">smtp</option>
                                        <option value="mail">mail</option>
                                    </Field>
                                    <label className="form-label">Mail title</label>
                                    <Field name="mailTitle" className="form-control mb-3" />
                                    <label className="form-label">Mail host</label>
                                    <Field name="mailHost" className="form-control mb-3" />
                                    <label className="form-label">Mail port</label>
                                    <Field name="mailPort" className="form-control mb-3" />
                                    <label className="form-label">Mail username</label>
                                    <Field name="emailUsername" type="email" className="form-control mb-3" />
                                    <label className="form-label">Mail password</label>
                                    <Field name="mailPassword" type="password" className="form-control mb-3" />
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

export default EmailSettings;
