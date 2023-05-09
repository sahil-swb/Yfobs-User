import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { createExpense, getSingleExpense, updateExpense } from '../../slices/expenseSlice';
import { businessId, userId } from '../../constants/userData';
import { getAllVendors } from '../../slices/vendorsSlice';
import { getAllCategoriesApi } from '../../slices/categoriesSlice';

const ExpenseModal = () => {
    const { modalIsOpen, modalType, ID } = useSelector((state) => state.modalReducer);
    const { getAllVendorData } = useSelector((state) => state.vendorReducer);
    const { getAllData } = useSelector((state) => state.categoriesReducer);
    const { getSingleExpenseData, updateExpenseData } = useSelector((state) => state.expenseReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const payload = {
            userId: userId,
            businessId: businessId,
            vendorName: values?.vendorName,
            amount: values?.amount,
            tax: values?.tax,
            date: values?.date,
            expenseCategory: values?.expenseCategory,
            paymentStatus: values?.paymentStatus,
            notes: values?.notes
        };

        if (modalType === 'EDIT') {
            payload._id = getSingleExpenseData?._id;
            dispatch(updateExpense({ payload }));
        } else {
            dispatch(createExpense({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };

    useEffect(() => {
        dispatch(getAllVendors());
        dispatch(getAllCategoriesApi());
    }, []);

    useEffect(() => {
        if (modalType === 'EDIT') {
            let payload = {
                _id: ID
            };
            dispatch(getSingleExpense({ payload }));
        }
    }, [ID, updateExpenseData]);

    return (
        <>
            <Modal
                show={modalIsOpen}
                onHide={() => {
                    dispatch(commonModalIsOpen(false));
                }}
            >
                <Modal.Header closeButton className="font-weight-bold">
                    {modalType === 'EDIT' ? 'Edit Expense' : 'Add New Expense'}
                </Modal.Header>
                <Modal.Body className="modal-scrollable">
                    <Formik
                        enableReinitialize
                        initialValues={
                            modalType === 'EDIT'
                                ? {
                                      vendorName: getSingleExpenseData?.vendorName || '',
                                      amount: getSingleExpenseData?.amount || '',
                                      date: getSingleExpenseData?.date || '',
                                      tax: getSingleExpenseData?.tax || '',
                                      expenseCategory: getSingleExpenseData?.expenseCategory || '',
                                      paymentStatus: getSingleExpenseData?.paymentStatus || '',
                                      notes: getSingleExpenseData?.notes || ''
                                  }
                                : {
                                      vendorName: '',
                                      amount: '',
                                      tax: '',
                                      date: '',
                                      expenseCategory: '',
                                      paymentStatus: '',
                                      notes: ''
                                  }
                        }
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm();
                        }}
                    >
                        <Form>
                            <div>
                                <label>
                                    Expense Amount <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="number" name="amount" />
                            </div>
                            <div className="mt-3">
                                <label>Tax %</label>
                                <Field className="form-control" type="number" name="tax" />
                            </div>
                            <div className="mt-3">
                                <label>Vendors</label>
                                <Field className="form-control" as="select" name="vendorName">
                                    <option value="">Select</option>

                                    {getAllVendorData &&
                                        getAllVendorData?.map((data) => {
                                            return (
                                                <option key={data?._id} value={data?.vendorName}>
                                                    {data?.vendorName}
                                                </option>
                                            );
                                        })}
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>
                                    Expense Category <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" as="select" name="expenseCategory">
                                    <option value="">Select</option>
                                    {getAllData.map((data) => {
                                        if (data?.type === 'Expense' || data?.type === 'expense') {
                                            return (
                                                <option key={data?._id} value={data?.name}>
                                                    {data?.name}
                                                </option>
                                            );
                                        }
                                    })}
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>
                                    Date <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="date" name="date" />
                            </div>
                            <div className="mt-3">
                                <label>
                                    Payment Status <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" as="select" name="paymentStatus">
                                    <option value="">Select</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>Notes</label>
                                <Field className="form-control" as="textarea" name="notes" />
                            </div>
                            <Button className="mt-3" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ExpenseModal;
