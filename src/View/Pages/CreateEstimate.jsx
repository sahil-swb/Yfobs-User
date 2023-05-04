import { Field, FieldArray, Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Badge, Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import CustomersModal from '../../components/modals/CustomersModal';
import ProductsEstimateModal from '../../components/modals/ProductsEstimateModal';
import { getAllCustomersApi, getCustomerById } from '../../slices/customersSlice';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import favicon from '../../assets/images/favicon-32x32.png';
import JoditEditor from 'jodit-react';
import { createEstimateApi, getEstimateById, updateEstimateApi } from '../../slices/estimatesSlice';
import { getAllCountriesApi, getAllStatesApi } from '../../slices/countryDetailSlice';
import { userId } from '../../constants/userData';
import { createProductApi, updateProductApi } from '../../slices/productsSlice';
import CommonAccordion from '../../components/CommonAccordion';
import OpenModalButton from './OpenModalButton';
import CommonSelect from '../../components/CommonSelect';
import RightColumn from '../../components/EstimateAndInvoice/RightColumn';
import LeftColumn from '../../components/EstimateAndInvoice/LeftColumn';

const CreateEstimate = () => {
    const [modalOpenType, setModalTypeOpen] = useState('');
    const [footerText, setFooterText] = useState('');
    const [currencySign, setCurrencySign] = useState('');
    const [countryId, setCountryId] = useState('');

    const { getEstimateProducts, getSingleProduct } = useSelector((state) => state.productsReducer);
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [defaultTotal, setDefaultTotal] = useState(0);
    const [defaultDiscount, setDefaultDiscount] = useState(0);
    const [defaultTax, setDefaultTax] = useState(0);
    const estimateId = useParams();
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);
    const [inputs, setInputs] = useState({ customerName: '', customerCountry: '', customerState: '' });
    const history = useHistory();

    //Array Field
    const dispatch = useDispatch();
    let discountValue = (defaultTotal * defaultDiscount) / 100;
    let discountAmount = defaultTotal - (defaultTotal * defaultDiscount) / 100;
    let taxValue = (discountAmount * defaultTax) / 100;
    let grandTotal = (discountAmount * defaultTax) / 100 + discountAmount;

    const handleSubmit = (values, resetForm) => {
        const payload = {
            businessId: '644777f395efae186a4fe4bd',
            customerId: getSingleCustomerData?._id,
            title: values?.title,
            summary: values?.summary,
            ccMail: values?.ccMail,
            number: values?.number,
            posoNumber: values?.posoNumber,
            date: values?.date,
            expireOn: values?.expireOn,
            discount: defaultDiscount,
            tax: defaultTax,
            subTotal: defaultTotal,
            grandTotal: grandTotal,
            footerNote: footerText,
            productStatus: 'productEstimate',
            customerName: inputs?.customerName,
            customerCountry: inputs?.customerCountry,
            customerState: inputs?.customerState
        };

        if (estimateId?._id) {
            payload._id = estimateId?._id;
            dispatch(updateEstimateApi({ payload })).then((res) => {
                if (res?.payload?._id) {
                    let payload = {
                        _id: getSingleEstimate?.products?.map((val) => val?._id),
                        EstimatesId: res?.payload?._id,
                        userId: userId,
                        product: values.estimateProducts,
                        productStatus: 'productEstimate'
                    };

                    dispatch(updateProductApi({ payload }));
                }
            });
        } else {
            dispatch(createEstimateApi({ payload })).then((res) => {
                if (res?.payload?._id) {
                    let payload = {
                        EstimatesId: res?.payload?._id,
                        userId: userId,
                        product: values.estimateProducts,
                        productStatus: 'productEstimate'
                    };

                    dispatch(createProductApi({ payload }));
                }
            });
        }
        // history.push('/estimates');
    };

    const handleChangeCustomer = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let el = document.querySelector('.customerClassName');
        const option = el.getAttribute('id');
        const payload = {
            _id: option
        };
        setInputs((values) => ({ ...values, [name]: value }));
        dispatch(getCustomerById({ payload }));
    };

    useEffect(() => {
        if (estimateId?._id) {
            let payload = {
                _id: estimateId?._id
            };
            dispatch(getEstimateById({ payload }));
        }
    }, []);

    let productArray = getSingleEstimate?.products?.map((val) => val?.product);
    let addProducts = getEstimateProducts?.map((val) => val?.product.map((val) => val));

    useEffect(() => {
        if (estimateId?._id) {
            setFooterText(getSingleEstimate?.data?.footerNote);
        }
    }, [estimateId?._id]);

    // console.log('addProducts', addProducts[0]);

    return (
        <>
            <Row>
                <Col xl={{ span: 10, offset: 1 }}>
                    <div className="d-flex mb-4" style={{ justifyContent: 'space-between' }}>
                        <h3>{estimateId?._id ? 'Edit Estimate' : 'Create new Estimate'}</h3>
                        <Button as={Link} to="/estimates" variant="outline-primary">
                            All Estimates
                        </Button>
                    </div>
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={
                                estimateId?._id
                                    ? {
                                          title: getSingleEstimate?.data?.title || '',
                                          summary: getSingleEstimate?.data?.summary || '',
                                          ccMail: getSingleEstimate?.data?.ccMail || '',
                                          number: getSingleEstimate?.data?.number || '',
                                          posoNumber: getSingleEstimate?.data?.posoNumber || '',
                                          date: getSingleEstimate?.data?.date || '',
                                          expireOn: getSingleEstimate?.data?.expireOn || '',
                                          estimateProducts: productArray?.[0] || []
                                      }
                                    : {
                                          title: '',
                                          summary: '',
                                          ccMail: '',
                                          number: '',
                                          posoNumber: '',
                                          date: '',
                                          expireOn: '',
                                          estimateProducts: addProducts[0] || []
                                      }
                            }
                            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        >
                            {({ values }) => (
                                <Form>
                                    <CommonAccordion>
                                        <div className="mb-2">
                                            <Field className="form-control border rounded" name="title" type="text" placeholder="Title" />
                                        </div>
                                        <div>
                                            <Field
                                                className="form-control border rounded"
                                                name="summary"
                                                type="text"
                                                placeholder="Summary example: project name, description of estimate"
                                            />
                                        </div>
                                    </CommonAccordion>
                                    <Card>
                                        <Card.Body>
                                            <Row className="mb-4">
                                                <LeftColumn
                                                    setModalTypeOpen={setModalTypeOpen}
                                                    currencySign={currencySign}
                                                    setCurrencySign={setCurrencySign}
                                                    estimateId={estimateId}
                                                    handleChangeCustomer={handleChangeCustomer}
                                                    getSingleEstimate={getSingleEstimate}
                                                    inputs={inputs}
                                                />

                                                <RightColumn />
                                            </Row>
                                            <Row>
                                                <Col lg={{ span: 10, offset: 1 }}>
                                                    <div>
                                                        <Table responsive striped bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th>Item</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <FieldArray
                                                                    name="estimateProducts"
                                                                    render={(arrayHelpers) => (
                                                                        <>
                                                                            {values?.estimateProducts?.map((estimate, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <Field
                                                                                                type="text"
                                                                                                className="form-control border rounded"
                                                                                                name={`estimateProducts[${index}].name`}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field
                                                                                                type="number"
                                                                                                className="form-control border rounded"
                                                                                                name={`estimateProducts[${index}].price`}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field
                                                                                                type="number"
                                                                                                className="form-control border rounded"
                                                                                                name={`estimateProducts[${index}].quantity`}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <div
                                                                                                className="d-flex"
                                                                                                style={{
                                                                                                    alignItems: 'center',
                                                                                                    justifyContent: 'space-between'
                                                                                                }}
                                                                                            >
                                                                                                {currencySign}{' '}
                                                                                                {estimate?.price * estimate?.quantity}
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-primary btn-sm ml-3"
                                                                                                    onClick={() => {
                                                                                                        arrayHelpers.remove(index);
                                                                                                    }}
                                                                                                >
                                                                                                    x
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}

                                                                            {modalOpenType === 'CUSTOMERS' ? (
                                                                                <CustomersModal />
                                                                            ) : modalOpenType === 'PRODUCTS' ? (
                                                                                <ProductsEstimateModal addHelper={arrayHelpers} />
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                />
                                                            </tbody>
                                                        </Table>
                                                        <div onClick={() => setModalTypeOpen('PRODUCTS')}>
                                                            <OpenModalButton modalType={'ADD'} buttonName={'Add an Item'} />
                                                        </div>
                                                    </div>
                                                    <div className="text-right font-weight-bold h5">
                                                        <ListGroup variant="flush">
                                                            <ListGroup.Item>
                                                                <span className="mr-5">Sub Total</span> {currencySign}{' '}
                                                                {values.estimateProducts.reduce((acc, val) => {
                                                                    let subTotalAmount = acc + val.price * val.quantity;
                                                                    setDefaultTotal(subTotalAmount);
                                                                    return subTotalAmount;
                                                                }, 0)}
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <label className="mr-3">Discount in %</label>
                                                                <input
                                                                    className="mr-5 rounded p-1"
                                                                    style={{ width: '50px' }}
                                                                    name="discount"
                                                                    type="number"
                                                                    defaultValue={
                                                                        estimateId?._id
                                                                            ? getSingleEstimate?.data?.discount
                                                                            : defaultDiscount
                                                                    }
                                                                    onChange={(e) => {
                                                                        setDefaultDiscount(e.target.value);
                                                                    }}
                                                                />
                                                                <span>
                                                                    {currencySign} {discountValue.toFixed(2)}
                                                                </span>
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <label className="mr-3">Tax in %</label>
                                                                <input
                                                                    className="mr-5 rounded p-1"
                                                                    style={{ width: '50px' }}
                                                                    name="tax"
                                                                    type="number"
                                                                    defaultValue={
                                                                        estimateId?._id ? getSingleEstimate?.data?.tax : defaultTax
                                                                    }
                                                                    onChange={(e) => setDefaultTax(e.target.value)}
                                                                />
                                                                <span>
                                                                    {currencySign} {taxValue.toFixed(2)}
                                                                </span>
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <span className="mr-5"> Grand Total</span>
                                                                {currencySign} {grandTotal.toFixed(2)}
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Header as="h4">Footer</Card.Header>
                                        <Card.Body>
                                            <JoditEditor value={footerText} onChange={(e) => setFooterText(e)} />
                                        </Card.Body>
                                    </Card>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit">Save Estimate</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default CreateEstimate;
