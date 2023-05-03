import React from 'react';
import favicon from '../assets/images/favicon-32x32.png';
import { Accordion, Card, Col, Row } from 'react-bootstrap';

const CommonAccordion = ({ children }) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle className="border-0 p-3 text-left font-weight-bold h4" eventKey="0">
                    Business address and contact details, title, summary, and logo,
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <div>
                                    <img src={favicon} width={40} alt="Company Logo" />
                                </div>
                                <div>
                                    <strong>SilverWebbuzz</strong>, india
                                </div>
                            </Col>
                            <Col>{children}</Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default CommonAccordion;
