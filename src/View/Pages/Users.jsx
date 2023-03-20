import * as React from 'react';
import { Row, Col, Card, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import CommonDataTable from '../../components/CommonDataTable';
import { names } from '../../constants/FakeData';

const Users = () => {
    const columns = [
        {
            name: '#',
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: 'Avatar',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => row.position,
            sortable: true
        },
        {
            name: 'Business',
            selector: (row) => row.position,
            sortable: true
        },
        {
            name: 'Package',
            selector: (row) => row.office,
            sortable: true
        },
        {
            name: 'Payment Status',
            selector: (row) => row.position,
            sortable: true
        },
        {
            name: 'Join',
            selector: (row) => row.office,
            sortable: true
        },
        {
            name: 'Expire',
            selector: (row) => row.office,
            sortable: true
        },
        {
            name: 'Action',
            cell: () => {
                return (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                <i className="fa fa-times mr-3" aria-hidden="true" />
                                Deactivate
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                <i className="fa fa-check mr-3" aria-hidden="true" />
                                Custom Template
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                <i className="fa fa-trash mr-3" aria-hidden="true" />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                );
            }
        }
    ];
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">All Users</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <ButtonGroup className="my-3">
                                <Button disabled>Export</Button>
                                <Button>CSV</Button>
                                <Button>Excel</Button>
                                <Button>PDF</Button>
                                <Button>Print</Button>
                            </ButtonGroup>
                            <CommonDataTable columns={columns} data={names} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default Users;
