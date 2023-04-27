import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonDeleteModal, commonModalIsOpen, commonModalType, setID, setRowData } from '../../slices/modalSlice';
import { getAllVendors } from '../../slices/vendorsSlice';
import { Button, Card } from 'react-bootstrap';
import CommonDataTable from '../../components/CommonDataTable';
import VendorModal from '../../components/modals/VendorModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';

const Vendors = () => {
    const columns = [
        {
            name: '#',
            selector: (row) => row.index,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.vendorName,
            sortable: true
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => row.email,
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

    const { createVendorData, getAllVendorData, updateVendorData, deleteVendorData, getSingleVendorData } = useSelector(
        (state) => state.vendorReducer
    );
    const { rowData, ID } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const handleEdit = (row) => {
        dispatch(commonModalIsOpen(true));
        dispatch(commonModalType('EDIT_VENDOR'));
        dispatch(setID(row?._id));
    };
    const handleDelete = (row) => {
        dispatch(commonDeleteModal(true));
        dispatch(setRowData(row));
    };
    useEffect(() => {
        dispatch(getAllVendors());
    }, [createVendorData, updateVendorData, deleteVendorData]);

    console.log('ID', ID);

    return (
        <>
            <div>
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="m-0 font-weight-bold">All Vendors</Card.Title>
                        <Button
                            onClick={() => {
                                dispatch(commonModalIsOpen(true));
                                dispatch(commonModalType('ADD'));
                            }}
                            size="sm"
                            className="d-flex align-items-center p-2"
                        >
                            <i className="feather icon-plus f-20" />
                            <div>New Vendor</div>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <CommonDataTable columns={columns} data={getAllVendorData} />
                    </Card.Body>
                </Card>
                <VendorModal />
                <DeleteConfModal del_id={rowData?._id} type={'VENDORS'} title={rowData?.vendorName} />
            </div>
        </>
    );
};

export default Vendors;
