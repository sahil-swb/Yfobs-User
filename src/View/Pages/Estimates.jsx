import React, { useEffect } from 'react';
import { Badge, Button, ButtonGroup, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import CommonDataTable from '../../components/CommonDataTable';
import { deleteEstimateApi, getAllEstimatesApi } from '../../slices/estimatesSlice';
import { commonDeleteModal, commonModalIsOpen, commonModalType, setRowData } from '../../slices/modalSlice';
import EstimateSendModal from '../../components/modals/EstimateSendModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { userId } from '../../constants/userData';

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
                    </div>
                );
            }
        }
    ];

    const { rowData } = useSelector((state) => state.modalReducer);
    const { getAllEstimates, createEstimate, deleteEstimate, updateEstimate } = useSelector((state) => state.estimateReducer);
    const dispatch = useDispatch();

    const handleDeleteEstimate = (row) => {
        dispatch(commonDeleteModal(true));
        dispatch(setRowData(row));
    };

    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllEstimatesApi({ payload }));
    }, [createEstimate, deleteEstimate, updateEstimate]);

    const location = {
        pathname: `/estimates/create_estimates`,
        state: 'CREATE_ESTIMATE'
    };

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="m-0 font-weight-bold">All Estimates</Card.Title>
                    <Link to={location}>
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
            <DeleteConfModal del_id={rowData?._id} type={'ESTIMATES'} title={rowData?.title} />
        </>
    );
};

export default Estimates;
