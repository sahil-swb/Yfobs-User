import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { Field, Form, Formik } from 'formik';
import { createVendor, getSingleVendor, updateVendor } from '../../slices/vendorsSlice';
import { userId } from '../../constants/userData';

const VendorModal = () => {
    const { getSingleVendorData } = useSelector((state) => state.vendorReducer);
    const { modalIsOpen, modalType, ID } = useSelector((state) => state.modalReducer);
    // const { getSingleBusinessData } = useSelector((state) => state.settingsReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const payload = {
            userId: userId,
            businessId: '64425f6f462fed333aeedfad',
            vendorName: values?.vendorName,
            phone: values?.phone,
            email: values?.email,
            address: values?.address
        };

        if (modalType === 'EDIT_VENDOR') {
            payload._id = getSingleVendorData?._id;
            dispatch(updateVendor({ payload }));
        } else {
            console.log('payload', payload);
            dispatch(createVendor({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };

    useEffect(() => {
        if (modalType === 'EDIT_VENDOR') {
            let payload = {
                _id: ID
            };
            dispatch(getSingleVendor({ payload }));
        }
    }, [ID]);

    console.log(getSingleVendorData);
    return (
        <>
            <Modal
                show={modalIsOpen}
                onHide={() => {
                    dispatch(commonModalIsOpen(false));
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
                                      phone: getSingleVendorData?.phone ? getSingleVendorData?.phone : '',
                                      email: getSingleVendorData?.email ? getSingleVendorData?.email : '',
                                      address: getSingleVendorData?.address ? getSingleVendorData?.address : ''
                                  }
                                : {
                                      vendorName: '',
                                      phone: '',
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
                                <Field className="form-control" name="phone" />
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
