import React, { useEffect, useState } from 'react';
import { Badge, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen } from '../../slices/modalSlice';
import { getAllProductsApi, getSingleProductApi } from '../../slices/productsSlice';
import { getCustomerById } from '../../slices/customersSlice';

const ProductsEstimateModal = ({ addHelper }) => {
    const { modalIsOpen, modalType } = useSelector((state) => state.modalReducer);
    const { getAllProducts, getSingleProduct, getEstimateProducts } = useSelector((state) => state.productsReducer);
    const [itemName, setItemName] = useState('');
    const [foundItems, setFoundItems] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = (_id) => {
        const payload = {
            _id: _id
        };
        dispatch(getSingleProductApi({ payload }));
    };

    const handleChange = (e) => {
        let keyword = e;
        let filtArray = [];
        if (keyword !== '') {
            getAllProducts.map((val) =>
                val.product.filter((fVal) => {
                    let ans = fVal?.name?.toLowerCase().startsWith(keyword.toLowerCase());
                    if (ans) {
                        filtArray.push(val);
                    }
                })
            );
            setFoundItems(filtArray);
        } else {
            setFoundItems(getAllProducts);
        }
        setItemName(keyword);
    };

    // const searchFilterFunction = (text) => {
    //     if (text) {
    //         const newData = getAllProducts.filter(function (item) {
    //             const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         });
    //         console.log('newData---', newData);
    //         setFoundItems(newData);
    //         setItemName(text);
    //     } else {
    //         console.log('getAllProducts---', getAllProducts);
    //         setFoundItems(getAllProducts);
    //         setItemName(text);
    //     }
    // };

    useEffect(() => {
        if (getSingleProduct?._id) {
            addHelper?.push({
                name: getSingleProduct?.product?.map((val) => val?.name),
                price: parseInt(getSingleProduct?.product?.map((val) => val?.price)),
                quantity: 1
            });
        }
    }, [getSingleProduct?.product]);

    useEffect(() => {
        dispatch(getAllProductsApi());
    }, []);

    console.log('getAllProducts--', getAllProducts);

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
                        onChange={(e) => handleChange(e.target.value)}
                        value={itemName}
                        className="form-control border-secondary border rounded mb-3"
                        type="text"
                        placeholder="Search Product"
                    />
                    <div className="text-right my-4">
                        <Badge pill variant="primary" className="p-2 px-3">
                            <h5 className="text-white m-0">Search results: {foundItems.length}</h5>
                        </Badge>
                    </div>
                    {foundItems && foundItems.length > 0 ? (
                        foundItems.map((val, index) => {
                            return (
                                <ListGroup.Item action variant="light" key={index} onClick={() => handleSubmit(val._id)}>
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
