import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryApi, getAllCategoriesApi, updateCategoryApi } from '../../slices/categoriesSlice';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { businessId, userId } from '../../constants/userData';

const CategoriesModal = ({ data }) => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        let payload = {
            userId: userId,
            businessId: businessId,
            name: values.name,
            type: values.type
        };
        if (modalType === 'EDIT') {
            payload.id = data?._id;
            dispatch(updateCategoryApi({ payload }));
        } else {
            dispatch(createCategoryApi({ payload }));
        }
        dispatch(commonModalIsOpen(false));
    };
    return (
        <Modal
            show={modalIsOpen}
            onHide={() => {
                dispatch(commonModalIsOpen(false));
            }}
        >
            <Modal.Header closeButton className="font-weight-bold">
                {modalType === 'EDIT' ? 'Edit Category' : 'Add New Category'}
            </Modal.Header>
            <Modal.Body className="modal-scrollable">
                <Formik
                    initialValues={modalType === 'EDIT' ? { name: data?.name, type: data?.type } : { name: '', type: '' }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <div className="mb-3">
                            <label className="font-weight-bold">Category Name</label>
                            <Field className="form-control" type="text" name="name" />
                        </div>

                        <div role="group">
                            <label className="mx-4">
                                <Field type="radio" name="type" value="Income" />
                                Income
                            </label>
                            <label>
                                <Field type="radio" name="type" value="Expense" />
                                Expense
                            </label>
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

export default CategoriesModal;
