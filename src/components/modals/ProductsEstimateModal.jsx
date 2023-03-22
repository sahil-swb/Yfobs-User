import React, { useEffect } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { getAllProductsApi } from '../../slices/productsSlice';

const ProductsEstimateModal = () => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllProducts } = useSelector((state) => state.productsReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProductsApi());
    }, []);
    return (
        <Modal
            show={modalIsOpen}
            onHide={() => {
                dispatch(commonModalIsOpen(false));
            }}
        >
            <Modal.Header closeButton className="font-weight-bold">
                Add Item
            </Modal.Header>
            <Modal.Body className="modal-scrollable">
                <ListGroup>
                    <input className="form-control border-secondary border rounded mb-3" type="text" placeholder="Search Product" />
                    {getAllProducts.map((val) => {
                        return (
                            <ListGroup.Item>
                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                    <div>
                                        <div>
                                            {val.name} [{val.hsnCode}]
                                        </div>
                                        <div>{val.details}</div>
                                    </div>
                                    <div>{val.price}.00</div>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default ProductsEstimateModal;
