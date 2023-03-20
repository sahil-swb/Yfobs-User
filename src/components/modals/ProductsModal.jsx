import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesApi } from '../../slices/categoriesSlice';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { createProductApi, getAllProductsApi, updateProductApi } from '../../slices/productsSlice';

const ProductsModal = ({ data }) => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllCategories } = useSelector((state) => state.categories);
    const [showIncome, setShowIncome] = useState(false);
    const [showExpense, setShowExpense] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        let payload = {
            userId: '63aa96e2e58e3b08f1746b39',
            name: values.name,
            hsnCode: values.hsnCode,
            price: values.price,
            details: values.details,
            isSell: values?.isSell === false ? '0' : '1',
            isBuy: values?.isBuy === false ? '0' : '1',
            incomeCategory: data?.incomeCategory,
            expenseCategory: data?.expenseCategory
        };
        if (modalType === 'EDIT') {
            payload.id = data?._id;
            dispatch(updateProductApi({ payload }));
        } else {
            dispatch(createProductApi({ payload }));
        }
        dispatch(commonModalIsOpen(false));
        setTimeout(() => {
            dispatch(getAllProductsApi());
        }, 1000);
    };

    useEffect(() => {
        dispatch(getAllCategoriesApi());
    }, []);

    return (
        <Modal
            show={modalIsOpen}
            onHide={() => {
                dispatch(commonModalIsOpen(false));
            }}
        >
            <Modal.Header closeButton className="font-weight-bold">
                {modalType === 'EDIT' ? 'Edit Product' : 'Add New Product'}
            </Modal.Header>
            <Modal.Body className="modal-scrollable">
                <Formik
                    initialValues={
                        modalType === 'EDIT'
                            ? {
                                  name: data?.name,
                                  hsnCode: data?.hsnCode,
                                  price: data?.price,
                                  details: data?.details,
                                  isSell: data?.isSell === '0' ? false : true,
                                  isBuy: data?.isBuy === '0' ? false : true,
                                  incomeCategory: data?.incomeCategory,
                                  expenseCategory: data?.expenseCategory
                              }
                            : {
                                  name: '',
                                  hsnCode: '',
                                  price: '',
                                  details: '',
                                  checked: '',
                                  isSell: '',
                                  isBuy: '',
                                  incomeCategory: '',
                                  expenseCategory: ''
                              }
                    }
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <div className="mb-3">
                            <label className="font-weight-bold">Product Name</label>
                            <Field className="form-control" type="text" name="name" />
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold">Price</label>
                            <Field className="form-control" type="number" name="hsnCode" />
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold">HSN Code</label>
                            <Field className="form-control" type="number" name="price" />
                        </div>

                        <div className="mb-3">
                            <label>
                                <Field onClick={() => setShowIncome(!showIncome)} type="checkbox" name="isSell" />
                                <span className="mx-1 font-weight-bold">Sell this</span>
                            </label>
                            <p>Allow this product or service to be added to Invoices</p>

                            {showIncome === !false ? (
                                <div>
                                    <label className="font-weight-bold">Income Category</label>
                                    <Field className="form-control" name="incomeCategory" as="select">
                                        {getAllCategories &&
                                            getAllCategories?.map((val) => {
                                                if (val.type === 'Income') {
                                                    return <option key={val?._id}>{val?.name}</option>;
                                                }
                                            })}
                                    </Field>
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label>
                                <Field onClick={() => setShowExpense(!showExpense)} type="checkbox" name="isBuy" />
                                <span className="mx-1 font-weight-bold">Buy this</span>
                            </label>
                            <p>Allow this product or service to be added to Bills.</p>
                            {showExpense === !false ? (
                                <div>
                                    <label className="font-weight-bold">Expense Category</label>
                                    <Field className="form-control" name="expenseCategory" as="select">
                                        {getAllCategories &&
                                            getAllCategories?.map((val) => {
                                                if (val.type === 'Expense') {
                                                    return <option key={val?._id}>{val?.name}</option>;
                                                }
                                            })}
                                    </Field>
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className="font-weight-bold">Product Details</label>
                            <Field className="form-control" as="textarea" name="details" />
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

export default ProductsModal;
