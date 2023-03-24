//REACT IMPORTS
import React, { useState } from 'react';
import { useEffect } from 'react';
//PACKAGE IMPORTS
import { Field, Form, Formik } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
// REDUX-TOOLKIT IMPORTS
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//CUSTOM OR COMPONENTS IMPORTS
import { createCustomerApi, getAllCustomersApi, updateCustomerApi } from '../../slices/customersSlice';
import { commonModalIsOpen } from '../../slices/modalSlice';
import 'react-phone-number-input/style.css';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import '../reactPhoneComponent.css';

//MODAL COMPONENT FOR ADD AND EDIT CUSTOMER
const CustomersModal = ({ data }) => {
    const { modalIsOpen, modalType, rowData } = useSelector((state) => state.modalReducer);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        let payload = {
            name: values.name,
            email: values.email,
            phone: customerPhoneNumber,
            address: values.address,
            country: values.country,
            state: values.state,
            city: values.city,
            postalCode: values.postalCode,
            currency: values.currency,
            businessName: values.businessName,
            businessNumber: companyPhoneNumber,
            vatCode: values.vatCode
        };
        if (modalType === 'EDIT') {
            payload.id = rowData?._id;
            dispatch(updateCustomerApi({ payload }));
        } else {
            dispatch(createCustomerApi({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };

    useEffect(() => {
        if (modalType === 'EDIT') {
            setCustomerPhoneNumber(rowData?.phone);
            setCompanyPhoneNumber(rowData?.businessNumber);
        } else {
            setCustomerPhoneNumber('');
            setCompanyPhoneNumber('');
        }
    });

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
                    {modalType === 'EDIT' ? 'Edit Customer' : 'Add New Customer'}
                </Modal.Header>
                <Modal.Body className="modal-scrollable">
                    <Formik
                        initialValues={
                            modalType === 'EDIT'
                                ? {
                                      name: rowData?.name,
                                      email: rowData?.email,
                                      address: rowData?.address,
                                      country: rowData?.country,
                                      state: rowData?.state,
                                      city: rowData?.city,
                                      postalCode: rowData?.postalCode,
                                      currency: rowData?.currency,
                                      businessName: rowData?.businessName,
                                      vatCode: rowData?.vatCode
                                  }
                                : {
                                      name: '',
                                      email: '',
                                      address: '',
                                      country: '',
                                      state: '',
                                      city: '',
                                      postalCode: '',
                                      currency: '',
                                      businessName: '',
                                      vatCode: ''
                                  }
                        }
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <Row>
                                <Col>
                                    <div className="mb-2">
                                        <label>Customer Name</label>
                                        <Field required className="form-control" name="name" type="text" />
                                    </div>
                                    <div className="mb-2">
                                        <label>Email</label>
                                        <Field className="form-control" name="email" type="email" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <div className="mb-2">
                                                <label>Phone</label>
                                                <PhoneInput
                                                    reset
                                                    placeholder="Enter phone number"
                                                    name="phone"
                                                    // value={customerPhoneNumber && formatPhoneNumberIntl(customerPhoneNumber)}
                                                    value={customerPhoneNumber}
                                                    onChange={(e) => {
                                                        setCustomerPhoneNumber(e);
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="mb-2">
                                                <label>City</label>
                                                <Field required className="form-control" name="city" type="text" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="mb-2">
                                        <label>Address</label>
                                        <Field className="form-control" name="address" as="textarea" />
                                    </div>

                                    <Row>
                                        <Col>
                                            <div className="mb-2">
                                                <label>Country</label>
                                                <Field className="form-control" name="country" as="select" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="mb-2">
                                                <label>State</label>
                                                <Field className="form-control" name="state" as="select" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <div className="mb-2">
                                                <label>Postal / Zip code</label>
                                                <Field className="form-control" name="postalCode" type="number" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="mb-2">
                                                <label>Currency</label>
                                                <Field className="form-control" name="currency" as="select" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="mb-2">
                                        <label>Business / Company Name</label>
                                        <Field className="form-control" name="businessName" type="text" />
                                    </div>
                                    <Row>
                                        <Col>
                                            <div className="mb-2">
                                                <label>Business / Company Number</label>
                                                <PhoneInput
                                                    placeholder="Enter phone number"
                                                    name="businessNumber"
                                                    value={companyPhoneNumber && formatPhoneNumberIntl(companyPhoneNumber)}
                                                    onChange={(e) => {
                                                        setCompanyPhoneNumber(e);
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="mb-2">
                                                <label>GST Number</label>
                                                <Field className="form-control" name="vatCode" type="text" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button className="mt-3" type="submit">
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CustomersModal;
