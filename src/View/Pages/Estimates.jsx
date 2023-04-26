import React, { useEffect } from 'react';
import { Badge, Button, ButtonGroup, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { deleteEstimateApi, getAllEstimatesApi } from '../../slices/estimatesSlice';
import { commonDeleteModal, commonModalIsOpen, commonModalType, setRowData } from '../../slices/modalSlice';
import EstimateSendModal from '../../components/modals/EstimateSendModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';

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
                        <Button size="sm" className="mr-1" as={Link} to={`/estimates/estimates_details/${row._id}`}>
                            View
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteEstimate(row)}>
                            Delete
                        </Button>
                        {/* <select name="" id="" className="form-control" onClick={(e) => handleDeleteEstimate(e, row)}>
                            <option value="">Select</option>
                            <option value="VIEW">View</option>
                            <option value="SEND">Send</option>
                            <option value="CONVERT_TO_INVOICE">Convert to Invoice</option>
                            <option value="PREVIEW_AS_CUSTOMER">Preview as Customer</option>
                            <option value="PRINT">Print</option>
                            <option value="EXPORT_AS_PDF">Expor t as PDF</option>
                            <option value="DELETE">Delete</option>
                        </select> */}

                        {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu onClick={(e) => handleDeleteEstimate(e, row)} style={{ overflowY: 'scroll' }}>
                                <Dropdown.Item as={Link} to={`/estimates/estimates_details/${row._id}`}>
                                    View
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => dispatch(commonModalIsOpen(true))}>Send</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Convert to Invoice</Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/estimates/estimates_preview/${row._id}`}>
                                    Preview as Customer
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Print</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Export as PDF</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        let payload = {
                                            _id: row?._id
                                        };
                                        dispatch(deleteEstimateApi({ payload }));
                                    }}
                                >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                );
            }
        }
    ];

    const { rowData } = useSelector((state) => state.modalReducer);
    const { getAllEstimates, createEstimate, deleteEstimate, updateEstimate } = useSelector((state) => state.estimateReducer);
    const dispatch = useDispatch();

    // const handleDeleteEstimate = (e, row) => {
    //     let optionValue = e.target.value;
    //     let payload = {
    //         _id: row?._id
    //     };

    //     if (optionValue === 'VIEW' || optionValue === 'PRINT') {
    //         history.push(`/estimates/estimates_details/${row._id}`);
    //     } else if (optionValue === 'SEND') {
    //         console.log('SEND');
    //         dispatch(commonModalIsOpen(true));
    //     } else if (optionValue === 'CONVERT_TO_INVOICE') {
    //         console.log('CONVERT_TO_INVOICE');
    //     } else if (optionValue === 'PREVIEW_AS_CUSTOMER') {
    //         console.log('PREVIEW_AS_CUSTOMER');
    //         history.push(`/estimates/estimates_preview/${row._id}`);
    //     } else if (optionValue === 'EXPORT_AS_PDF') {
    //         console.log('EXPORT_AS_PDF');
    //     } else if (optionValue === 'DELETE') {
    //         dispatch(deleteEstimateApi({ payload }));
    //     } else {
    //         return;
    //     }
    // };

    const handleDeleteEstimate = (row) => {
        dispatch(commonDeleteModal(true));
        dispatch(setRowData(row));
    };

    console.log(rowData);

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
            <DeleteConfModal del_id={rowData?._id} type={'ESTIMATES'} title={rowData?.title} />
        </>
    );
};

export default Estimates;
