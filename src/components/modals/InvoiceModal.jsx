import React from 'react';

const InvoiceModal = () => {
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
                        initialValues={{
                            vendorName: '',
                            amount: '',
                            tax: '',
                            date: '',
                            expenseCategory: '',
                            paymentStatus: '',
                            notes: ''
                        }}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm();
                        }}
                    >
                        <Form>
                            <div className="mt-3">
                                <label>
                                    Payment Date <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="date" name="date" />
                            </div>
                            <div className="mt-3">
                                <label>
                                    Due Date <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="date" name="date" />
                            </div>
                            <div className="mt-3">
                                <label>
                                    Amount <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="date" name="date" />
                            </div>
                            <div className="mt-3">
                                <label>
                                    Payment Status <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" as="select" name="paymentStatus">
                                    <option value="">Select</option>
                                    <option value="bankPayment">Bank Payment</option>
                                    <option value="cash">Cash</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="creditCard">Credit Card</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="others">Others</option>
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>Memo / Notes</label>
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

export default InvoiceModal;
