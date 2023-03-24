import React, { useEffect } from 'react';
import { Button, ButtonGroup, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { getAllEstimatesApi } from '../../slices/estimatesSlice';
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
            name: 'Estimate No',
            selector: (row) => row.number,
            sortable: true
        },
        {
            name: 'Price',
            selector: (row) => row.grandTotal,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <Link to="/estimates/estimates_details">
                            <Button>View</Button>
                        </Link>
                    </div>
                );
            }
        }
    ];

    const { getAllEstimates, createEstimate } = useSelector((state) => state.estimateReducer);
    const dispatch = useDispatch();
    const handleEdit = () => {
        console.log('handleEdit');
    };

    const handleDelete = () => {
        console.log('handleDelete');
    };

    useEffect(() => {
        dispatch(getAllEstimatesApi());
    }, []);
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="m-0 font-weight-bold">All Estimates</Card.Title>
                <Link to="/estimates/create_estimates">
                    <Button size="sm" className="d-flex align-items-center p-2">
                        <i className="feather icon-plus f-20" />
                        <div>New Estimate</div>
                    </Button>
                </Link>
            </Card.Header>
            <Card.Body>
                <CommonDataTable columns={columns} data={getAllEstimates} />
            </Card.Body>
        </Card>
    );
};

export default Estimates;
