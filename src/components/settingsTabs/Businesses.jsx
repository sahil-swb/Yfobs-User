import React, { useEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen, commonModalType, setRowData } from '../../slices/modalSlice';
import NewBusinessModal from '../modals/NewBusinessModal';
import { getAllBusinessesApi } from '../../slices/settingsSlice';

const Businesses = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllBusinessesData, createBusiness, updateBusiness } = useSelector((state) => state.settingsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBusinessesApi());
    }, [createBusiness, updateBusiness]);

    return (
        <>
            {/* <div className="bg-danger d-flex justify-content-center align-items-center flex-column">
                <p>sdfsdvf</p>
            </div> */}
            <div
                className="mb-3 rounded"
                style={{
                    background: '#FBEAEA',
                    textAlign: 'center',
                    padding: '1rem',
                    border: '2px solid #F5D1D1',
                    color: '#7f2121'
                }}
            >
                <p style={{ fontSize: '1rem' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam consectetur pariatur temporibus laudantium recusandae
                    corporis!
                </p>
                <Button>Upgrade Your Plan</Button>
            </div>
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
                            {getAllBusinessesData.map((detail, index) => {
                                return (
                                    <tr key={detail?._id}>
                                        <td>{index + 1}</td>
                                        <td>Mark</td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <span>{detail?.businessName}</span>
                                                <Button size="sm" variant="outline-info">
                                                    Default
                                                </Button>
                                            </div>
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('EDIT_BUSSINESS'));
                                                    dispatch(setRowData(detail?._id));
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <NewBusinessModal />
        </>
    );
};

export default Businesses;
