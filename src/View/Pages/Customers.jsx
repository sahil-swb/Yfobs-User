//REACT IMPORTS
import React, { useState } from 'react';
import { useEffect } from 'react';
//PACKAGE IMPORTS
import { Button, Card } from 'react-bootstrap';
// REDUX-TOOLKIT IMPORTS
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//CUSTOM OR COMPONENTS IMPORTS
import CommonDataTable from '../../components/CommonDataTable';
import CustomersModal from '../../components/modals/CustomersModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { getAllCustomersApi } from '../../slices/customersSlice';
import { commonDeleteModal, commonModalIsOpen, commonModalType, setID, setRowData } from '../../slices/modalSlice';
import { userId } from '../../constants/userData';
import { Link } from 'react-router-dom';

const Customers = () => {
    //COLUMNS FOR CUSTOMER TABLE
    const columns = [
        {
            name: '#',
            selector: (row) => row.index,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <i
                            onClick={() => handleEdit(row)}
                            className="icon feather icon-edit f-22 text-c-blue mr-3"
                            role="button"
                            aria-hidden="true"
                        />

                        <i
                            onClick={() => handleDelete(row)}
                            className="icon feather icon-trash-2 f-22 text-c-red"
                            role="button"
                            aria-hidden="true"
                        />
                    </div>
                );
            }
        }
    ];

    //STATES
    const { getAllCustomers, createCustomer, deleteCustomer, updateCustomer } = useSelector((state) => state.customers);
    const [rowData, setRowData] = useState({});

    const dispatch = useDispatch();

    //FUNCTION FOR DELETE CUSTOMER
    const handleDelete = (row) => {
        dispatch(commonDeleteModal(true));
        setRowData(row);
    };

    // FUNCTION FOR EDIT CUSTOMER
    const handleEdit = (row) => {
        dispatch(commonModalIsOpen(true));
        dispatch(commonModalType('EDIT'));
        setRowData(row);
    };

    //APICALL ON PAGE LOAD
    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllCustomersApi({ payload }));
    }, [createCustomer, deleteCustomer, updateCustomer]);

    return (
        <div>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="m-0 font-weight-bold">All Customers</Card.Title>
                    <div className="d-flex justify-content-between">
                        <Link to="/customers/import" className="mr-3">
                            <Button variant="outline-primary">Import</Button>
                        </Link>
                        <Button
                            onClick={() => {
                                dispatch(commonModalIsOpen(true));
                                dispatch(commonModalType('ADD'));
                            }}
                            size="sm"
                            className="d-flex align-items-center p-2"
                        >
                            <i className="feather icon-plus f-20" />
                            New Customer
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <CommonDataTable columns={columns} data={getAllCustomers} />
                </Card.Body>
            </Card>
            <CustomersModal rowData={rowData} />
            <DeleteConfModal del_id={rowData?._id} type={'CUSTOMERS'} title={rowData?.name} />
        </div>
    );
};

export default Customers;
