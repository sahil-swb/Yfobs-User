import React, { useEffect } from 'react';
import { Badge, Button, ButtonGroup, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { deleteEstimateApi, getAllEstimatesApi } from '../../slices/estimatesSlice';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import EstimateSendModal from '../../components/modals/EstimateSendModal';

const Estimates = () => {
    const history = useHistory();
    const columns = [
        {
            name: 'Status',
            selector: (row) =>
                row?.status === '1' ? (
                    <Badge className="bg-danger text-white">Expired</Badge>
                ) : (
                    <Badge className="bg-primary text-white">Save</Badge>
                ),
            sortable: true
        },
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: true
        },
        {
            name: 'Estimate No',
            selector: (row) => row.number,
            sortable: true
        },
        {
            name: 'Customer',
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
                        <select name="" id="" className="form-control" onClick={(e) => handleDeleteEstimate(e, row)}>
                            <option value="">Select</option>
                            <option value="VIEW">View</option>
                            <option value="SEND">Send</option>
                            <option value="CONVERT_TO_INVOICE">Convert to Invoice</option>
                            <option value="PREVIEW_AS_CUSTOMER">Preview as Customer</option>
                            <option value="PRINT">Print</option>
                            <option value="EXPORT_AS_PDF">Export as PDF</option>
                            <option value="DELETE">Delete</option>
                        </select>
                    </div>
                );
            }
        }
    ];

    const { getAllEstimates, createEstimate, deleteEstimate, updateEstimate } = useSelector((state) => state.estimateReducer);
    const dispatch = useDispatch();

    const handleDeleteEstimate = (e, row) => {
        let optionValue = e.target.value;
        let payload = {
            _id: row?._id
        };

        if (optionValue === 'VIEW' || optionValue === 'PRINT') {
            history.push(`/estimates/estimates_details/${row._id}`);
        } else if (optionValue === 'SEND') {
            console.log('SEND');
            dispatch(commonModalIsOpen(true));
        } else if (optionValue === 'CONVERT_TO_INVOICE') {
            console.log('CONVERT_TO_INVOICE');
        } else if (optionValue === 'PREVIEW_AS_CUSTOMER') {
            console.log('PREVIEW_AS_CUSTOMER');
            history.push(`/estimates/estimates_preview/${row._id}`);
        } else if (optionValue === 'EXPORT_AS_PDF') {
            console.log('EXPORT_AS_PDF');
        } else if (optionValue === 'DELETE') {
            dispatch(deleteEstimateApi({ payload }));
        } else {
            return;
        }
    };

    useEffect(() => {
        dispatch(getAllEstimatesApi());
    }, [createEstimate, deleteEstimate, updateEstimate]);
    return (
        <>
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
            <EstimateSendModal />
        </>
    );
};

export default Estimates;
