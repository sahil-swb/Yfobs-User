import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';

const Estimates = () => {
    const columns = [
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.date,
            sortable: true
        },
        {
            name: 'HSN Code',
            selector: (row) => row.number,
            sortable: true
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <Button onClick={() => handleEdit(row)} className="btn-icon btn-rounded m-r-10" variant="info">
                            <i className="icon feather icon-edit" aria-hidden="true" />
                        </Button>

                        <Button onClick={() => handleDelete(row)} className="btn-icon btn-rounded" variant="danger">
                            <i className="icon feather icon-trash-2" aria-hidden="true" />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const dispatch = useDispatch();
    const handleEdit = () => {
        console.log('handleEdit');
    };

    const handleDelete = () => {
        console.log('handleDelete');
    };
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="m-0 font-weight-bold">All Products</Card.Title>
                <Button
                    onClick={() => {
                        dispatch(commonModalIsOpen(true));
                        dispatch(commonModalType(!'EDIT'));
                    }}
                    size="sm"
                    className="d-flex align-items-center p-2"
                >
                    <i className="feather icon-plus f-20" />
                    <div>New Product</div>
                </Button>
            </Card.Header>
            <Card.Body>{/* <CommonDataTable columns={columns} data={getAllProducts} /> */}</Card.Body>
        </Card>
    );
};

export default Estimates;
