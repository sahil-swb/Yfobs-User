import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import template1 from '../assets/images/invoiceTemplateImages/template-1.png';
import template2 from '../assets/images/invoiceTemplateImages/template-2.png';
import template3 from '../assets/images/invoiceTemplateImages/template-3.png';
import template4 from '../assets/images/invoiceTemplateImages/template-4.png';
import { commonModalIsOpen } from '../slices/modalSlice';

const TemplateImage = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                size="lg"
                show={
                    modalType === 'INVOICE-1' || modalType === 'INVOICE-2' || modalType === 'INVOICE-3' || modalType === 'INVOICE-4'
                        ? modalIsOpen
                        : null
                }
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
                                ? template1
                                : modalType === 'INVOICE-2'
                                ? template2
                                : modalType === 'INVOICE-3'
                                ? template3
                                : template4
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
