import React, { useEffect } from 'react';

import { Field, Formik, Form } from 'formik';
import { Col, Button, Row, Card } from 'react-bootstrap';
import { getAllGenaralSettings, socialSettings } from '../slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
const SocialSettings = () => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.genaral.socialSettingsData);
    const prefillData = useSelector((state) => state.genaral.allGenaralSettingsData[0]);

    console.log(result, 'result');

    const handlessSubmit = (values) => {
        console.log(values);
        const payload = {
            id: '63a9a0977ed9a103a4b911bb',
            facebook: values.facebook,
            instagram: values.instagram,
            twitter: values.twitter,
            linkedin: values.linkedin,
            googleAnalytics: values.googleAnalytics
        };
        dispatch(socialSettings({ payload }));
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
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    facebook: prefillData?.facebook,
                                    twitter: prefillData?.twitter,
                                    instagram: prefillData?.instagram,
                                    linkedin: prefillData?.linkedin,
                                    googleAnalytics: prefillData?.googleAnalytics
                                }}
                                onSubmit={(values) => handlessSubmit(values)}
                            >
                                <Form>
                                    <label className="form-label">Facebook</label>
                                    <Field name="facebook" className="form-control mb-3" />
                                    <label className="form-label">Twitter</label>
                                    <Field name="twitter" className="form-control mb-3" />
                                    <label className="form-label">Instagram</label>
                                    <Field name="instagram" className="form-control mb-3" />
                                    <label className="form-label">Linkedin</label>
                                    <Field name="linkedin" className="form-control mb-3" />
                                    <label className="form-label">Google Analytics</label>
                                    <Field name="googleAnalytics" className="form-control mb-2 " as="textarea" />
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

export default SocialSettings;
