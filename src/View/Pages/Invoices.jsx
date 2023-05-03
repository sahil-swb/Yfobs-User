import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteInvoice, setGetAllInvoices } from '../../slices/invoiceSlice';
import { commonDeleteModal, commonModalIsOpen } from '../../slices/modalSlice';
import DeleteConfModal from '../../components/modals/DeleteConfModal';

const Invoices = () => {
    const [rowData, setRowData] = useState({});
    const { createInvoice, getAllInvoices, updateInvoice, deleteInvoice, getSingleInvoice } = useSelector((state) => state.invoiceReducer);
    const dispatch = useDispatch();
    const history = useHistory();

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
                        <Button size="sm" className="mr-1" as={Link} to={`/invoices/invoice_details/${row._id}`}>
                            View
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteModal(row)}>
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    ];
    // const handleDeleteInvoice = (e, row) => {
    //     let optionValue = e.target.value;
    //     let payload = {
    //         _id: row?._id
    //     };

    //     if (optionValue === 'VIEW' || optionValue === 'PRINT') {
    //         history.push(`/invoices/invoice_details/${row._id}`);
    //     } else if (optionValue === 'EDIT') {
    //         console.log('EDIT');
    //     } else if (optionValue === 'CONVERT_TO_INVOICE') {
    //         console.log('CONVERT_TO_INVOICE');
    //     } else if (optionValue === 'PREVIEW_AS_CUSTOMER') {
    //         console.log('PREVIEW_AS_CUSTOMER');
    //         history.push(`/invoices/invoice_preview/${row._id}`);
    //     } else if (optionValue === 'EXPORT_AS_PDF') {
    //         console.log('EXPORT_AS_PDF');
    //     } else if (optionValue === 'DELETE') {
    //         dispatch(setDeleteInvoice({ payload }));
    //     } else {
    //         return;
    //     }
    // };

    const handleDeleteModal = (row) => {
        commonDeleteModal(true);
        setRowData(row);
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
            <DeleteConfModal del_id={rowData?._id} type={'INVOICES'} title={rowData?.title} />
        </>
    );
};

export default Invoices;
