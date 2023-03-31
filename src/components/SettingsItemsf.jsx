import React from 'react';
import { useState } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import Select from 'react-select';
import { checkboxes } from '../constants/SettingsCheckbox';
import GenaralSettings from './settingsTabs/GenaralSettings';
import EmailSettings from './EmailSettings';
import ReCaptchaSettings from './ReCaptchaSettings';
import SocialSettings from './SocialSettings';
import TermsSettings from './TermsSettings';
import { Field, Formik, Form } from 'formik';
export const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E', isFixed: true },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' }
];

const SettingsItemsf = () => {
    const [checked, setChecked] = useState([]);

    const preferanceHandler = (e) => {
        let arr = {};
        let sid = e.target.id;
        let svalue = e.target.checked;
        // (e.id =  e.checked);

        const one = { sid: sid, svalue: svalue };
        arr.append(one);
        // for (const id in one) {
        //     console.log(`${id}: ${one[id]}`);
        // }
        // let two = one.keys();
        console.log(arr);
    };

    return (
        <>
            <Row className="btn-page">
                <Col md={6} lg={8}>
                    <Tab.Container defaultActiveKey="gs">
                        <Card>
                            <Card.Body>
                                <Nav variant="pills" className="bg-nav-pills nav-justified mb-0">
                                    <Nav.Item>
                                        <Nav.Link eventKey="gs">General Settings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="es">Email Settings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="rs">reCaptcha Settings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="ss">Social Settings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="ts">Terms of service</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>
                        <Tab.Content>
                            <Tab.Pane eventKey="gs">
                                <GenaralSettings />
                            </Tab.Pane>
                            <Tab.Pane eventKey="es">
                                <EmailSettings />
                            </Tab.Pane>
                            <Tab.Pane eventKey="rs">
                                <ReCaptchaSettings />
                            </Tab.Pane>
                            <Tab.Pane eventKey="ss">
                                <SocialSettings />
                            </Tab.Pane>
                            <Tab.Pane eventKey="ts">
                                <TermsSettings />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
                <Col md={6} lg={4}>
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-2">Preferences</h5>
                        </div>
                        <div className="card-body">
                            <Formik initialValues={{ trialDays: '' }}>
                                <Form>
                                    <label className="form-label">Set trial days</label>
                                    <Field as="select" className="form-control" name="trialDays">
                                        {<option value="smtp">smtp</option>}
                                    </Field>

                                    {/* <input type="checkbox" checked data-toggle="toggle" data-size="xs" /> */}
                                    {checkboxes?.map((item, index) => (
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={item.value}
                                                style={{
                                                    height: '20px',
                                                    width: '20px'
                                                }}
                                                onChange={(e) => preferanceHandler(e)}
                                            />
                                            <label className="custom-control-label" for={item.value}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default SettingsItemsf;
