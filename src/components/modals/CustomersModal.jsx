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
import { getAllCountriesApi, getAllStatesApi } from '../../slices/countryDetailSlice';

//MODAL COMPONENT FOR ADD AND EDIT CUSTOMER
const CustomersModal = ({ data }) => {
    const { modalIsOpen, modalType, rowData } = useSelector((state) => state.modalReducer);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        let payload = {
            name: values.name,
            email: values.email,
            phone: customerPhoneNumber,
            address: values.address,
            countryName: values.countryName,
            state: values.state,
            city: values.city,
            postalCode: values.postalCode,
            currencyName: values.currencyName,
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
    }, []);

    useEffect(() => {
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    console.log(getAllCountries);

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
                                      countryName: rowData?.countryName,
                                      state: rowData?.state,
                                      city: rowData?.city,
                                      postalCode: rowData?.postalCode,
                                      currencyName: rowData?.currencyName,
                                      businessName: rowData?.businessName,
                                      vatCode: rowData?.vatCode
                                  }
                                : {
                                      name: '',
                                      email: '',
                                      address: '',
                                      countryName: '',
                                      state: '',
                                      city: '',
                                      postalCode: '',
                                      currencyName: '',
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
                                                <Field className="form-control" name="countryName" as="select">
                                                    <option>Select Country</option>
                                                    {getAllCountries &&
                                                        getAllCountries?.map((val) => {
                                                            return (
                                                                <option key={val?._id} value={val?.countryName}>
                                                                    {val?.countryName}
                                                                </option>
                                                            );
                                                        })}
                                                </Field>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="mb-2">
                                                <label>State</label>
                                                <Field className="form-control" name="state" as="select">
                                                    <option>Select State</option>
                                                    {getAllStates &&
                                                        getAllStates?.map((val) => {
                                                            return (
                                                                <option key={val?._id} value={val?.name}>
                                                                    {val?.name}
                                                                </option>
                                                            );
                                                        })}
                                                </Field>
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
                                                <Field className="form-control" name="currencyName" as="select">
                                                    <option>Select Currency</option>
                                                    {getAllCountries &&
                                                        getAllCountries?.map((val) => {
                                                            return (
                                                                <option key={val?._id} value={val?.currencyName}>
                                                                    {val?.currencySymbol}
                                                                    &nbsp; &nbsp; &nbsp;
                                                                    {val?.currencyName}
                                                                </option>
                                                            );
                                                        })}
                                                </Field>
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
                                                    value={companyPhoneNumber}
                                                    onChange={(e) => {
                                                        setCompanyPhoneNumber(e);
                                                        console.log(e);
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
