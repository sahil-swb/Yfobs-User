import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { Field, Form, Formik } from 'formik';
import { createVendor, getSingleVendor, updateVendor } from '../../slices/vendorsSlice';
import { userId } from '../../constants/userData';
import '../reactPhoneComponent.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const VendorModal = () => {
    const { getSingleVendorData, updateVendorData } = useSelector((state) => state.vendorReducer);
    const { modalIsOpen, modalType, ID } = useSelector((state) => state.modalReducer);
    const [vendorPhoneNumber, setVendorPhoneNumber] = useState('');
    // const { getSingleBusinessData } = useSelector((state) => state.settingsReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const payload = {
            userId: userId,
            businessId: '644650a8be0b7b4db078d85e',
            vendorName: values?.vendorName,
            phone: vendorPhoneNumber,
            email: values?.email,
            address: values?.address
        };

        if (modalType === 'EDIT_VENDOR') {
            payload._id = getSingleVendorData?._id;
            dispatch(updateVendor({ payload }));
        } else {
            dispatch(createVendor({ payload }));
        }
        setVendorPhoneNumber('');
        dispatch(commonModalIsOpen(false));
    };

    useEffect(() => {
        if (modalType === 'EDIT_VENDOR') {
            setVendorPhoneNumber(getSingleVendorData?.phone);
        } else {
            setVendorPhoneNumber('');
        }
    }, [getSingleVendorData, modalType]);

    useEffect(() => {
        if (modalType === 'EDIT_VENDOR') {
            let payload = {
                _id: ID
            };
            dispatch(getSingleVendor({ payload }));
        }
    }, [modalIsOpen, updateVendorData, ID]);

    return (
        <>
            <Modal
                show={modalIsOpen}
                onHide={() => {
                    dispatch(commonModalIsOpen(false));
                    setVendorPhoneNumber('');
                }}
            >
                <Modal.Header closeButton className="font-weight-bold">
                    {modalType === 'EDIT_VENDOR' ? 'Edit Vendor' : 'Add New Vendor'}
                </Modal.Header>
                <Modal.Body className="modal-scrollable">
                    <Formik
                        enableReinitialize
                        initialValues={
                            modalType === 'EDIT_VENDOR'
                                ? {
                                      vendorName: getSingleVendorData?.vendorName ? getSingleVendorData?.vendorName : '',
                                      email: getSingleVendorData?.email ? getSingleVendorData?.email : '',
                                      address: getSingleVendorData?.address ? getSingleVendorData?.address : ''
                                  }
                                : {
                                      vendorName: '',
                                      email: '',
                                      address: ''
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
                                    Vendor Name <span className="text-danger">*</span>
                                </label>
                                <Field className="form-control" type="text" name="vendorName" />
                            </div>
                            <div className="mt-3">
                                <label>
                                    Phone <span className="text-danger">*</span>
                                </label>
                                {/* <Field className="form-control" name="phone" /> */}
                                <PhoneInput name="phone" value={vendorPhoneNumber} onChange={(e) => setVendorPhoneNumber(e)} />
                            </div>
                            <div className="mt-3">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" />
                            </div>
                            <div className="mt-3">
                                <label>Address</label>
                                <Field className="form-control" as="textarea" name="address" />
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

export default VendorModal;
