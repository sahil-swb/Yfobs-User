import React, { useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { Button } from 'react-bootstrap';
import { createBusinessesApi, uploadLogoApi } from '../../slices/settingsSlice';
import '../../assets/css/businessModalStyle.css';
import uploadIcon from '../../assets/images/upload-icon.png';

const NewBusinessModal = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [logoImage, setLogoImage] = useState('');
    const [upiImage, setUpiImage] = useState('');
    const dispatch = useDispatch();

    const handleLogo = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setLogoImage(base64);
    };
    const handleUpi = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setUpiImage(base64);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = (values) => {
        const payload = {
            businessName: values?.businessName,
            businessTitle: values?.businessTitle,
            businessNumber: values?.businessNumber,
            vatCode: values?.vatCode,
            country: values?.country,
            address: values?.address,
            postCode: values?.postCode,
            isRegisteredGst: values?.isRegisteredGst,
            stateId: values?.stateId,
            city: values?.city,
            bankName: values?.bankName,
            accountNumber: values?.accountNumber,
            branchName: values?.branchName,
            bankIfscCode: values?.bankIfscCode,
            gstRegisterDate: values?.gstRegisterDate,
            businessCategory: values?.businessCategory
        };

        const payloadImage = {
            type: 'logo',
            file: logoImage
        };
        dispatch(createBusinessesApi({ payload }));
        dispatch(uploadLogoApi({ payloadImage }));
    };
    return (
        <>
            <Modal size="lg" show={modalType === 'ADD_NEW_BUSSINESS' && modalIsOpen} onHide={() => dispatch(commonModalIsOpen(false))}>
                <Formik
                    initialValues={{
                        businessName: '',
                        businessTitle: '',
                        businessNumber: '',
                        amountType: '',
                        vatCode: '',
                        country: '',
                        address: '',
                        postCode: '',
                        isRegisteredGst: '',
                        stateId: '',
                        city: '',
                        bankName: '',
                        accountNumber: '',
                        branchName: '',
                        bankIfscCode: '',
                        gstRegisterDate: '',
                        businessCategory: ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <Modal.Header closeButton>{modalType === 'ADD_NEW_BUSSINESS' ? 'Add business' : 'Edit Business'} </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex">
                                <div className="w-50">
                                    <label>Logo</label>
                                    <div className="business-image-main-div">
                                        <img src={logoImage === '' ? uploadIcon : logoImage} alt="" className="logoImage" />
                                    </div>
                                    <input type="file" onChange={(e) => handleLogo(e)} className="w-75" />
                                </div>
                                <div className="w-50">
                                    <label>UPI QR Code</label>
                                    <div className="business-image-main-div">
                                        <img src={upiImage === '' ? uploadIcon : upiImage} alt="" className="logoImage" />
                                    </div>
                                    <input type="file" onChange={(e) => handleUpi(e)} className="w-75" />
                                </div>
                            </div>

                            <div className="my-3">
                                <label>Name</label>
                                <Field className="form-control" name="businessName" type="text" />
                            </div>
                            <div className="my-3">
                                <label>Title</label>
                                <Field className="form-control" name="businessTitle" type="text" />
                            </div>
                            <div className="my-3">
                                <label>Business Number ( Licence Number )</label>
                                <Field className="form-control" name="businessNumber" type="text" />
                            </div>
                            <div className="my-3">
                                <div className="mb-2">Is your business registered for GST?</div>
                                <label>
                                    <Field name="isRegisteredGst" type="radio" value="yes" />
                                    Yes
                                </label>
                                <label className="mx-3">
                                    <Field name="isRegisteredGst" type="radio" value="no" />
                                    No
                                </label>
                            </div>
                            <div className="my-3">
                                <label>GST Number ( Maximum 15 digits )</label>
                                <Field className="form-control" type="text" name="vatCode" />
                            </div>
                            <div className="my-3">
                                <label>GST Registered On</label>
                                <Field className="form-control" type="date" name="gstRegisterDate" />
                            </div>
                            <div className="my-3">
                                <label>State</label>
                                <Field className="form-control" name="stateId" as="select">
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
                            <div className="my-3">
                                <label>City</label>
                                <Field className="form-control" type="text" name="city" />
                            </div>
                            <div className="my-3">
                                <label>Category</label>
                                <Field name="businessCategory" className="form-control" type="text" />
                            </div>
                            <div className="my-3">
                                <label>Address</label>
                                <Field name="address" className="form-control" as="textarea" />
                            </div>
                            <div className="my-3">
                                <label>Post-Code *</label>
                                <Field name="postCode" className="form-control" type="number" />
                            </div>
                            <div className="my-3">
                                <label>Bank Name</label>
                                <Field name="bankName" className="form-control" type="text" />
                            </div>
                            <div className="my-3">
                                <label>Account Number</label>
                                <Field name="accountNumber" className="form-control" type="text" />
                            </div>
                            <div className="my-3">
                                <label>Branch Name</label>
                                <Field name="branchName" className="form-control" type="text" />
                            </div>
                            <div>
                                <label>Bank Branch IFSC Code</label>
                                <Field name="bankIfscCode" className="form-control" type="text" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default NewBusinessModal;
