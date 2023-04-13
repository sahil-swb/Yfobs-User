import React, { useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteInvoice, setGetAllInvoices } from '../../slices/invoiceSlice';

const Invoices = () => {
    const columns = [
        {
            name: 'Status',
            selector: (row) =>
                row?.status === 'expire' ? (
                    <Badge className="bg-danger text-white">{row?.status.toUpperCase()}</Badge>
                ) : (
                    <Badge className="bg-primary text-white">{row?.status.toUpperCase()}</Badge>
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
            name: 'Total',
            selector: (row) => row.grandTotal,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <select name="" id="" className="form-control border" onClick={(e) => handleDeleteInvoice(e, row)}>
                            <option value="">Select</option>
                            <option value="VIEW">View</option>
                            <option value="EDIT">Edit</option>
                            <option value="CONVERT_TO_INVOICE">Convert to Recurring</option>
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

    const { createInvoice, getAllInvoices, updateInvoice, deleteInvoice, getSingleInvoice } = useSelector((state) => state.invoiceReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteInvoice = (e, row) => {
        let optionValue = e.target.value;
        let payload = {
            _id: row?._id
        };

        if (optionValue === 'VIEW' || optionValue === 'PRINT') {
            history.push(`/invoices/invoice_details/${row._id}`);
        } else if (optionValue === 'EDIT') {
            console.log('EDIT');
        } else if (optionValue === 'CONVERT_TO_INVOICE') {
            console.log('CONVERT_TO_INVOICE');
        } else if (optionValue === 'PREVIEW_AS_CUSTOMER') {
            console.log('PREVIEW_AS_CUSTOMER');
            history.push(`/invoices/invoice_preview/${row._id}`);
        } else if (optionValue === 'EXPORT_AS_PDF') {
            console.log('EXPORT_AS_PDF');
        } else if (optionValue === 'DELETE') {
            dispatch(setDeleteInvoice({ payload }));
        } else {
            return;
        }
    };

    useEffect(() => {
        dispatch(setGetAllInvoices());
    }, [deleteInvoice]);

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="m-0 font-weight-bold">All Estimates</Card.Title>
                    <Link to="/invoices/create_invoices">
                        <Button size="sm" className="d-flex align-items-center p-2">
                            <i className="feather icon-plus f-20" />
                            <div>New Estimate</div>
                        </Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <CommonDataTable columns={columns} data={getAllInvoices} />
                </Card.Body>
            </Card>
        </>
    );
};

export default Invoices;
