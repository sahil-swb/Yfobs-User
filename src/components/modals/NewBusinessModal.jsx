import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { Button } from 'react-bootstrap';
import { createBusinessesApi, updateBusiness, uploadLogoApi, uploadUpiQRCodeApi } from '../../slices/settingsSlice';
import '../../assets/css/businessModalStyle.css';
import uploadIcon from '../../assets/images/upload-icon.png';
import { userId } from '../../constants/userData';

const NewBusinessModal = ({ rowData }) => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const { logoData, upiQRData } = useSelector((state) => state.settingsReducer);
    const [logoImage, setLogoImage] = useState('');
    const [upiImage, setUpiImage] = useState('');
    const dispatch = useDispatch();

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

    const handleLogo = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const payloadLogoImage = {
            _id: logoData?._id ? logoData?._id : upiQRData?._id,
            file: base64
        };
        setLogoImage(base64);
        dispatch(uploadLogoApi({ payloadLogoImage }));
    };

    const handleUpi = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const payloadUpiImage = {
            _id: upiQRData?._id ? upiQRData?._id : logoData?._id,
            file: base64
        };
        setUpiImage(base64);
        dispatch(uploadUpiQRCodeApi({ payloadUpiImage }));
    };

    const handleSubmit = (values) => {
        let payload = {
            userId: userId,
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

        if (modalType === 'ADD_NEW_BUSSINESS') {
            if (logoData?._id || upiQRData?._id) {
                payload._id = logoData?._id ? logoData?._id : upiQRData?._id;
                dispatch(updateBusiness({ payload }));
            } else {
                dispatch(createBusinessesApi({ payload }));
            }
        }

        if (modalType === 'EDIT_BUSSINESS') {
            payload._id = rowData?._id;
            dispatch(updateBusiness({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };

    return (
        <>
            <Modal
                size="lg"
                show={modalType === 'ADD_NEW_BUSSINESS' || modalType === 'EDIT_BUSSINESS' ? modalIsOpen : null}
                onHide={() => dispatch(commonModalIsOpen(false))}
            >
                <Formik
                    enableReinitialize
                    initialValues={
                        modalType === 'EDIT_BUSSINESS'
                            ? {
                                  businessName: rowData?.businessName || '',
                                  businessTitle: rowData?.businessTitle || '',
                                  businessNumber: rowData?.businessNumber || '',
                                  amountType: rowData?.amountType || '',
                                  vatCode: rowData?.vatCode || '',
                                  country: rowData?.country || '',
                                  address: rowData?.address || '',
                                  postCode: rowData?.postCode || '',
                                  isRegisteredGst: rowData?.isRegisteredGst || '',
                                  stateId: rowData?.stateId || '',
                                  city: rowData?.city || '',
                                  bankName: rowData?.bankName || '',
                                  accountNumber: rowData?.accountNumber || '',
                                  branchName: rowData?.branchName || '',
                                  bankIfscCode: rowData?.bankIfscCode || '',
                                  gstRegisterDate: rowData?.gstRegisterDate || '',
                                  businessCategory: rowData?.businessCategory || ''
                              }
                            : {
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
                              }
                    }
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <Modal.Header closeButton>{modalType === 'ADD_NEW_BUSSINESS' ? 'Add business' : 'Edit Business'} </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex">
                                <div className="w-50">
                                    <label>Logo</label>
                                    <div className="business-image-main-div">
                                        <img
                                            src={rowData?.logo ? rowData?.logo : logoImage ? logoImage : uploadIcon}
                                            alt=""
                                            className="logoImage"
                                        />
                                    </div>
                                    <input type="file" onChange={(e) => handleLogo(e)} className="w-75" />
                                </div>
                                <div className="w-50">
                                    <label>UPI QR Code</label>
                                    <div className="business-image-main-div">
                                        <img
                                            src={rowData?.upiQRCode ? rowData?.upiQRCode : upiImage ? upiImage : uploadIcon}
                                            alt=""
                                            className="logoImage"
                                        />
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
