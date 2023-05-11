import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { commonDeleteModal, commonModalIsOpen } from '../../slices/modalSlice';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import DraftTab from '../../components/InvoiceTabs/DraftTab';
import RecurringInvoiceTab from '../../components/InvoiceTabs/RecurringInvoiceTab';
import AllInvoiceTab from '../../components/InvoiceTabs/AllInvoiceTab';
import UnpaidTab from '../../components/InvoiceTabs/UnpaidTab';
import { getAllInvoices } from '../../slices/invoiceSlice';
import { userId } from '../../constants/userData';

const Invoices = () => {
    const [rowData, setRowData] = useState();
    const { createInvoiceData, getAllInvoicesData, updateInvoiceData, deleteInvoiceData, getSingleInvoiceData } = useSelector(
        (state) => state.invoiceReducer
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const columns = [
        {
            name: 'Status',
            selector: (row) =>
                row?.status === 'unpaid' ? (
                    <Badge className="bg-danger text-white">{row?.status.toUpperCase()}</Badge>
                ) : (
                    <Badge className="bg-secondary text-white">{row?.status.toUpperCase()}</Badge>
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
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                                dispatch(commonDeleteModal(true));
                                setRowData(row);
                            }}
                        >
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

    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllInvoices({ payload }));
    }, [deleteInvoiceData]);

    const location = {
        pathname: '/invoices/create_invoices',
        state: 'CREATE_INVOICE'
    };

    return (
        <>
            <Row>
                <Col xl={12}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h3>Invoices</h3>
                        <Link to={location}>
                            <Button size="sm" className="d-flex align-items-center p-2">
                                <i className="feather icon-plus f-20" />
                                <div>Create New Invoice</div>
                            </Button>
                        </Link>
                    </div>
                </Col>
                <Col className="mt-4" xl={12}>
                    <Tab.Container defaultActiveKey="allInvoice">
                        <Card>
                            <Card.Body>
                                <Nav variant="pills" className="bg-nav-pills nav-justified mb-0">
                                    <Nav.Item>
                                        <Nav.Link eventKey="allInvoice">All Invoices</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="unpaid">Unpaid</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="draft">Draft</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="recurringInvoice">Recurring Invoice</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>

                        <Tab.Content>
                            <Tab.Pane eventKey="allInvoice">
                                <AllInvoiceTab columns={columns} getAllInvoicesData={getAllInvoicesData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="unpaid">
                                <UnpaidTab columns={columns} getAllInvoicesData={getAllInvoicesData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="draft">
                                <DraftTab columns={columns} getAllInvoicesData={getAllInvoicesData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="recurringInvoice">
                                <RecurringInvoiceTab columns={columns} getAllInvoicesData={getAllInvoicesData} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
            <DeleteConfModal del_id={rowData?._id} type={'INVOICES'} title={rowData?.title} />
        </>
    );
};

export default Invoices;
