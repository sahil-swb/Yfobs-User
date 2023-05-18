import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import NewBusinessModal from '../modals/NewBusinessModal';
import { deleteBusiness, getAllBusinessesApi, updateBusiness, updateBusinessStatus } from '../../slices/settingsSlice';
import { userId } from '../../constants/userData';
import Switch from 'react-switch';

const Businesses = () => {
    const [rowData, setRowData] = useState(null);
    const { getAllBusinessesData, createBusiness, updateBusinessData, deleteBusinessData, updateBusinessStatusData } = useSelector(
        (state) => state.settingsReducer
    );

    getAllBusinessesData.filter((val) => val?.isActive === 1 && localStorage.setItem('singleBusinessId', val?._id));
    const dispatch = useDispatch();

    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllBusinessesApi({ payload }));
    }, [createBusiness, updateBusinessData, deleteBusinessData, updateBusinessStatusData]);

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
                                        <td>
                                            <img src={detail?.logo} alt="businessLogo" width={100} />
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <span>{detail?.businessName}</span>
                                                {/* <Button size="sm" variant="outline-info">
                                                    Default
                                                </Button> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <div>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            dispatch(commonModalIsOpen(true));
                                                            dispatch(commonModalType('EDIT_BUSSINESS'));
                                                            setRowData(detail);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                                <div
                                                    aria-disabled="true"
                                                    className="d-flex justify-content-between align-items-center w-50"
                                                >
                                                    <Button
                                                        // disabled={detail?.isActive === 1 ? false : false}
                                                        size="sm"
                                                        variant={detail?.isActive === 1 ? 'outline-success' : 'outline-primary'}
                                                        onClick={(e) => {
                                                            let payload = {
                                                                _id: detail?._id
                                                            };
                                                            dispatch(updateBusiness({ payload }));
                                                            dispatch(updateBusinessStatus({ payload }));
                                                        }}
                                                    >
                                                        {detail?.isActive === 1 ? 'Selected' : 'Unselected'}
                                                    </Button>
                                                    <div>
                                                        {detail?.isActive === 1 ? (
                                                            <i className="fa fa-check f-22 text-c-info" aria-hidden="true" />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <NewBusinessModal rowData={rowData} />
        </>
    );
};

export default Businesses;
