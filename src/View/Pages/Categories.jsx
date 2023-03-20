import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CommonDataTable from '../../components/CommonDataTable';
import CategoriesModal from '../../components/modals/CategoriesModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { getAllCategoriesApi } from '../../slices/categoriesSlice';
import { commonDeleteModal, commonModalIsOpen, commonModalType } from '../../slices/modalSlice';

const Categories = () => {
    const columns = [
        {
            name: '#',
            selector: (row) => row.index,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Type',
            selector: (row) =>
                row.type === 'Income' ? (
                    <Badge className="bg-info text-white p-2">{row.type}</Badge>
                ) : (
                    <Badge className="bg-primary text-white p-2">{row.type}</Badge>
                ),
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

    const [rowData, setRowData] = useState(null);
    const { getAllCategories } = useSelector((state) => state.categoriesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesApi());
    }, []);

    const handleDelete = (row) => {
        setRowData(row);
        dispatch(commonDeleteModal(true));
    };

    const handleEdit = (row) => {
        dispatch(commonModalIsOpen(true));
        dispatch(commonModalType('EDIT'));
        setRowData(row);
    };

    return (
        <div>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="m-0 font-weight-bold">All Categories</Card.Title>
                    <Button
                        onClick={() => {
                            dispatch(commonModalIsOpen(true));
                            dispatch(commonModalType(!'EDIT'));
                        }}
                        size="sm"
                        className="d-flex align-items-center"
                    >
                        <i className="feather icon-plus f-20" />
                        <div>New Category</div>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <CommonDataTable columns={columns} data={getAllCategories} />
                </Card.Body>
            </Card>
            <CategoriesModal data={rowData} />
            <DeleteConfModal del_id={rowData?._id} type={'CATEGORIES'} title={rowData?.name} />
        </div>
    );
};

export default Categories;
