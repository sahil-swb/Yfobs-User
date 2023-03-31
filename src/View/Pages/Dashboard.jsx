import React from 'react';
import { Card, Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Businesses from '../../components/settingsTabs/Businesses';
import ChangePassword from '../../components/settingsTabs/ChangePassword';
import GenaralSettings from '../../components/settingsTabs/GenaralSettings';
import InvoiceCustomization from '../../components/settingsTabs/InvoiceCustomization';

const Dashboard = () => {
    return (
        <>
            <Row>
                <Col xl={10}>
                    <Tab.Container defaultActiveKey="generalSettings">
                        <Card>
                            <Card.Body>
                                <Nav variant="pills" className="bg-nav-pills nav-justified mb-0">
                                    <Nav.Item>
                                        <Nav.Link eventKey="generalSettings">General Settings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="changePassword">Change Password</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="business">Business</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="invoiceCustomization">Invoice Customization</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>

                        <Tab.Content>
                            <Tab.Pane eventKey="generalSettings">
                                <GenaralSettings />
                            </Tab.Pane>
                            <Tab.Pane eventKey="changePassword">
                                <ChangePassword />
                            </Tab.Pane>
                            <Tab.Pane eventKey="business">
                                <Businesses />
                            </Tab.Pane>
                            <Tab.Pane eventKey="invoiceCustomization">
                                <InvoiceCustomization />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
