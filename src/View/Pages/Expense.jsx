import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { commonDeleteModal, commonModalIsOpen, commonModalType, setID, setRowData } from '../../slices/modalSlice';
import CommonDataTable from '../../components/CommonDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExpenses } from '../../slices/expenseSlice';
import ExpenseModal from '../../components/modals/ExpenseModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { userId } from '../../constants/userData';

const Expense = () => {
    const columns = [
        {
            name: '#',
            selector: (row) => row.index,
            sortable: true
        },
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: true
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
            sortable: true
        },
        {
            name: 'Client',
            selector: (row) => row.vendorName,
            sortable: true
        },
        {
            name: 'Category',
            selector: (row) => row.expenseCategory,
            sortable: true
        },
        {
            name: 'Status',
            selector: (row) => row.paymentStatus,
            sortable: true
        },
        {
            name: 'Notes',
            selector: (row) => row.notes,
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

    const { createExpenseData, getAllExpenseData, updateExpenseData, deleteExpenseData } = useSelector((state) => state.expenseReducer);
    const { rowData } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const handleEdit = (row) => {
        dispatch(commonModalIsOpen(true));
        dispatch(commonModalType('EDIT'));
        dispatch(setID(row?._id));
    };
    const handleDelete = (row) => {
        dispatch(commonDeleteModal(true));
        dispatch(setRowData(row));
    };
    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllExpenses({ payload }));
    }, [createExpenseData, updateExpenseData, deleteExpenseData]);
    return (
        <>
            <div>
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="m-0 font-weight-bold">All Expenses</Card.Title>
                        <Button
                            onClick={() => {
                                dispatch(commonModalIsOpen(true));
                                dispatch(commonModalType('ADD'));
                            }}
                            size="sm"
                            className="d-flex align-items-center p-2"
                        >
                            <i className="feather icon-plus f-20" />
                            <div>New Expense</div>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <CommonDataTable columns={columns} data={getAllExpenseData} />
                    </Card.Body>
                </Card>
                <ExpenseModal data={rowData} />
                <DeleteConfModal del_id={rowData?._id} type={'EXPENSE'} title={rowData?.notes} />
            </div>
        </>
    );
};

export default Expense;
