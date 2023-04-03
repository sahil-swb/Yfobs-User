import React, { useEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import NewBusinessModal from '../modals/NewBusinessModal';
import { getAllBusinessesApi } from '../../slices/settingsSlice';

const Businesses = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    // const { getAllBusinessesData, createBusiness, updateBusiness } = useSelector((state) => state.settingsReducer);
    // const getAllBusinesses = useSelector((state) => state.getAllBusinesses.settingsReducer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllBusinessesApi());
    // }, [createBusiness, updateBusiness]);

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>Businesses</h5>
                    <Button
                        onClick={() => {
                            dispatch(commonModalIsOpen(true));
                            dispatch(commonModalType('ADD_NEW_BUSSINESS'));
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
                            {/* {getAllBusinessesData.map((detail) => {
                                return (
                                    <tr key={detail?._id}>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>{detail?.businessName}</td>
                                        <td>
                                            <Button variant="primary" size="sm">
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })} */}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <NewBusinessModal />
        </>
    );
};

export default Businesses;
