import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import invoiceImage from '../assets/images/widget/AUSTRALIA.jpg';
import invoice from '../assets/images/Screenshot.png';
import { commonModalIsOpen } from '../slices/modalSlice';

const TemplateImage = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                size="lg"
                show={modalIsOpen}
                onHide={() => {
                    dispatch(commonModalIsOpen(false));
                }}
            >
                <Modal.Header closeButton className="font-weight-bold">
                    {modalType === 'INVOICE-1'
                        ? 'Invoice template - 1'
                        : modalType === 'INVOICE-2'
                        ? 'Invoice template - 2'
                        : modalType === 'INVOICE-3'
                        ? 'Invoice template - 3'
                        : 'Invoice template - 4'}
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={
                            modalType === 'INVOICE-1'
                                ? invoiceImage
                                : modalType === 'INVOICE-2'
                                ? invoice
                                : modalType === 'INVOICE-3'
                                ? invoiceImage
                                : invoiceImage
                        }
                        width={'100%'}
                        alt=""
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TemplateImage;
