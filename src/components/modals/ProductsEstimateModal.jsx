import React, { useEffect, useState } from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { getAllProductsApi } from '../../slices/productsSlice';
import { userId } from '../../constants/userData';

const ProductsEstimateModal = ({ addHelper }) => {
    const { modalIsOpen } = useSelector((state) => state.modalReducer);
    const { getAllProducts } = useSelector((state) => state.productsReducer);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (val) => {
        val?.product.map((val) =>
            addHelper?.push({
                name: val?.name,
                price: val?.price,
                quantity: 1
            })
        );
    };

    useEffect(() => {
        let payload = {
            _id: userId,
            payload: { keyword: searchValue }
        };
        dispatch(getAllProductsApi({ payload }));
    }, [searchValue]);

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
            <Modal.Body className="modal-scrollable overflow-auto" style={{ maxHeight: '500px' }}>
                <ListGroup variant="flush">
                    <input
                        className="form-control border"
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <div className="text-right my-4">
                        <Badge pill variant="primary" className="p-2 px-3">
                            <h5 className="text-white m-0">Search results: {getAllProducts.length}</h5>
                        </Badge>
                    </div>
                    {getAllProducts && getAllProducts.length > 0 ? (
                        getAllProducts.map((val, index) => {
                            return (
                                <ListGroup.Item action variant="light" key={index} onClick={() => handleSubmit(val)}>
                                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                        <div>
                                            <div className="font-weight-bold h5 text-dark">
                                                {val?.product?.map((val) => val?.name)} [{val?.hsnCode}]
                                            </div>
                                            <div>{val?.details}</div>
                                        </div>
                                        <div>{val?.product?.map((val) => val?.price)}.00</div>
                                    </div>
                                </ListGroup.Item>
                            );
                        })
                    ) : (
                        <h3>No results found!</h3>
                    )}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default ProductsEstimateModal;
