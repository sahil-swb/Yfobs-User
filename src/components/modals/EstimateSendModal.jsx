import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { sendEstimateMessage } from '../../slices/estimatesSlice';
import { businessId, userId } from '../../constants/userData';

const EstimateSendModal = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const handleSendMessage = (values) => {
        console.log(values);
        const payload = {
            userId: userId,
            businessId: businessId,
            email: values?.email,
            message: values?.message
        };
        dispatch(sendEstimateMessage({ payload }));
    };

    return (
        <>
            <Modal
                show={modalIsOpen}
                onHide={() => {
                    dispatch(commonModalIsOpen(false));
                }}
            >
                <Formik initialValues={{ email: '', message: '', isChecked: '' }} onSubmit={(values) => handleSendMessage(values)}>
                    <Form>
                        <Modal.Header closeButton className="font-weight-bold">
                            Send Estimate
                        </Modal.Header>
                        <Modal.Body className="modal-scrollable">
                            <div>
                                <label className="font-weight-bold">To</label>
                                <Field className="form-control" type="email" name="email" />
                            </div>
                            <div className="my-3">
                                <label className="font-weight-bold">Message</label>
                                <Field className="form-control" as="textarea" name="message" />
                            </div>
                            <div>
                                <label>
                                    <Field type="checkbox" name="isChecked" />
                                    <span className="mx-1 font-weight-bold"> Send a copy to myself at ....</span>
                                </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Send</Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default EstimateSendModal;
