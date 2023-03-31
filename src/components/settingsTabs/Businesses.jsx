import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import BusinessModal from '../modals/BusinessModal';

const Businesses = () => {
    const dispatch = useDispatch();
    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>Businesses</h5>
                    <Button
                        onClick={() => {
                            dispatch(commonModalIsOpen(true));
                            dispatch(commonModalType('ADD'));
                        }}
                    >
                        ADD BUSINESS
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>Informations</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <BusinessModal />
        </>
    );
};

export default Businesses;
