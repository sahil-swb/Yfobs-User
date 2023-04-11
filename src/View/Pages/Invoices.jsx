import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { useSelector } from 'react-redux';

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
            name: 'Price',
            selector: (row) => row.grandTotal,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <select name="" id="" className="form-control p-2" onClick={(e) => handleDeleteInvoice(e, row)}>
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

    const handleDeleteInvoice = () => {
        console.log('handleDeleteInvoice');
    };

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
        </>
    );
};

export default Invoices;
