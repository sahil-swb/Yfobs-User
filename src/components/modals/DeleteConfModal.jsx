import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteCategoryApi, getAllCategoriesApi } from '../../slices/categoriesSlice';
import { deleteCustomerApi, getAllCustomersApi } from '../../slices/customersSlice';
import { commonDeleteModal } from '../../slices/modalSlice';
import { deleteProductApi, getAllProductsApi } from '../../slices/productsSlice';

//COMPONENT FOR DELETE
const DeleteConfModal = ({ type, del_id, title }) => {
    const { deleteModal } = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    //FUNCTION FOR DELETE
    const handleDeleteConfModal = () => {
        if (type === 'CUSTOMERS') {
            dispatch(deleteCustomerApi({ del_id }));
        } else if (type === 'CATEGORIES') {
            dispatch(deleteCategoryApi({ del_id }));
        } else if (type === 'PRODUCTS') {
            dispatch(deleteProductApi({ del_id }));
        }
        dispatch(commonDeleteModal(false));
    };

    return (
        <Modal
            show={deleteModal}
            onHide={() => {
                dispatch(commonDeleteModal(false));
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="font-weight-bold">
                    Delete Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-weight-bold">Are you sure you want to delete "{title}" ?</Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleDeleteConfModal()} className="btn-icon" variant="info">
                    <i className="feather icon-check f-20" />
                </Button>
                <Button className="btn-icon" variant="primary" onClick={() => dispatch(commonDeleteModal(false))}>
                    <i className="feather icon-x f-20" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfModal;
