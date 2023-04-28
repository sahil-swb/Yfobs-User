import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';

const Subscription = () => {
    return (
        <>
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Header as="h5">Subscription</Card.Header>
                        <Card.Body>
                            <ul style={{ listStyle: 'none', padding: '0', lineHeight: '3' }}>
                                <li>
                                    Your subscription: <strong>Starter Plan</strong>
                                </li>
                                <li>
                                    Price: <strong>Starter Plan</strong>
                                </li>
                                <li>
                                    Billing Frequency: <strong>Starter Plan</strong>
                                </li>
                                <li>
                                    Last Billing: <strong>Starter Plan</strong>
                                </li>
                                <li>
                                    Next Billing: <strong>Starter Plan</strong>
                                </li>
                            </ul>
                        </Card.Body>
                        <Card.Footer as="h5">
                            <div className="text-center">Payment status:   Verified</div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Header as="h5">Upgrade Plan</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <div className="text-center d-flex justify-content-center">
                                    <div
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            background: 'red',
                                            borderRadius: '8px',
                                            marginRight: '15px'
                                        }}
                                    ></div>
                                    <div>Monthly</div>
                                </div>
                            </Card.Title>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Starter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Invoices</td>
                                        <td>Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td>Estimates</td>
                                        <td>25</td>
                                    </tr>
                                    <tr>
                                        <td>Customers</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>Business</td>
                                        <td>Ok</td>
                                    </tr>
                                    <tr>
                                        <td>Invoice templates </td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Button size="sm" variant="outline-primary">
                                                Free Plan
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Subscription;
