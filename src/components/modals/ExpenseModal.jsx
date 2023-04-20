import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { createExpense, updateExpense } from '../../slices/expenseSlice';
import { userId } from '../../constants/userData';

const ExpenseModal = () => {
    const { modalIsOpen, modalType, rowData } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const payload = {
            userId: userId,
            businessId: values?.businessId,
            vendorName: values?.vendorName,
            amount: values?.amount,
            netAmount: values?.netAmount,
            tax: values?.tax,
            date: values?.date,
            expenseCategory: values?.expenseCategory,
            paymentStatus: values?.paymentStatus,
            notes: values?.notes
        };

        if (modalType === 'EDIT') {
            payload._id = rowData?._id;
            dispatch(updateExpense({ payload }));
        } else {
            dispatch(createExpense({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };
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
                        initialValues={
                            modalType === 'EDIT'
                                ? {
                                      vendorName: rowData?.vendorName,
                                      amount: rowData?.amount,
                                      netAmount: rowData?.netAmount,
                                      date: rowData?.date,
                                      tax: rowData?.tax,
                                      expenseCategory: rowData?.expenseCategory,
                                      paymentStatus: rowData?.paymentStatus,
                                      notes: rowData?.notes
                                  }
                                : {
                                      vendorName: '',
                                      amount: '',
                                      netAmount: '',
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
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>
                                    Expense Category <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" as="select" name="expenseCategory">
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
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
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
                                    <option value="paid">cdsf</option>
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
