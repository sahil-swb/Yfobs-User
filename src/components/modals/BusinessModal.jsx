import { Field, Formik } from 'formik';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';

const BusinessModal = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <Modal
            show={modalIsOpen}
            onHide={() => {
                dispatch(commonModalIsOpen(false));
            }}
        >
            <Modal.Header closeButton className="font-weight-bold">
                {modalType === 'EDIT' ? 'Edit Business' : 'Add New Business'}
            </Modal.Header>
            <Modal.Body className="modal-scrollable">
                <Formik initialValues={{ name: '', type: '' }} onSubmit={(values) => handleSubmit(values)}>
                    <Form>
                        <div className="mb-3">
                            <label className="font-weight-bold">Category Name</label>
                            <Field className="form-control" type="text" name="name" />
                        </div>

                        <div role="group">
                            <label className="mx-4">
                                <Field type="radio" name="type" value="Income" />
                                Income
                            </label>
                            <label>
                                <Field type="radio" name="type" value="Expense" />
                                Expense
                            </label>
                        </div>

                        <Button className="mt-3" type="submit">
                            Save
                        </Button>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default BusinessModal;
