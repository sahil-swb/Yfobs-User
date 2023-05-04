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
import { createInvoice, updateInvoice } from '../../slices/invoiceSlice';

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
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const history = useHistory();

    const location = useLocation();

    //Array Field
    const dispatch = useDispatch();
    let discountValue = (defaultTotal * defaultDiscount) / 100;
    let discountAmount = defaultTotal - (defaultTotal * defaultDiscount) / 100;
    let taxValue = (discountAmount * defaultTax) / 100;
    let grandTotal = (discountAmount * defaultTax) / 100 + discountAmount;

    const handleSubmit = (values, resetForm) => {
        if (location.state === 'CREATE_INVOICE') {
            var payload = {
                userId: userId,
                businessId: '644777f395efae186a4fe4bd',
                parentId: values?.parentId,
                challanNo: values?.challanNo,
                title: values?.title,
                summary: values?.summary,
                number: values?.number,
                posoNumber: values?.posoNumber,
                customer: values?.customer,
                paymentDue: values?.paymentDue,
                expireOn: values?.expireOn,
                date: values?.date,
                dueLimit: values?.dueLimit,
                discount: values?.discount,
                footerNote: values?.footerNote,
                subTotal: values?.subTotal,
                tax: values?.tax,
                grandTotal: values?.grandTotal,
                convertTotal: values?.convertTotal,
                ccMail: values?.ccMail,
                recurringStart: values?.recurringStart,
                recurringEnd: values?.recurringEnd,
                nextPayment: values?.nextPayment,
                sendMyself: values?.sendMyself,
                status: values?.status
            };
        } else {
            var payload = {
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
                customerName: customerName,
                customerCountry: values?.customerCountry,
                customerState: values?.customerState
            };
        }

        if (estimateId?._id) {
            payload._id = estimateId?._id;
            if (location.state === 'CREATE_INVOICE') {
                dispatch(updateInvoice({ payload })).then((res) => {
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
            }
        } else {
            if (location.state === 'CREATE_INVOICE') {
                dispatch(createInvoice({ payload })).then((res) => {
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
        }
        // history.push('/estimates');
    };

    const handleChangeCustomer = (e) => {
        let customerName = e.target.value;
        getAllCustomers.filter((val) => {
            let ID = val.name === customerName && val?._id;
            if (ID !== false) {
                const payload = {
                    _id: ID
                };
                console.log(payload);
                dispatch(getCustomerById({ payload }));
            }
        });
        setCustomerName(customerName);
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
        getAllCountries.map((val) => {
            if (getSingleCustomerData?.currencyName === val?.currencyName) {
                setCurrencySign(val?.currencySymbol);
                setCountryPrefillValue(getSingleCustomerData?.countryName);
            }
        });
    }, [getSingleCustomerData, countryPrefillValue]);

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, [createCustomer, getSingleCustomerData]);

    useEffect(() => {
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    useEffect(() => {
        if (estimateId?._id) {
            setFooterText(getSingleEstimate?.data?.footerNote);
        }
    }, [estimateId?._id]);

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
                                          customerCountry: getSingleEstimate?.data?.customerCountry || '',
                                          customerState: getSingleEstimate?.data?.customerState || '',
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
                                          customerCountry: '',
                                          customerState: '',
                                          estimateProducts: addProducts[0] || []
                                      }
                            }
                            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        >
                            {({ values }) => (
                                <Form>
                                    {/* <CommonAccordion> */}
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle className="border-0 p-3 text-left font-weight-bold h4" eventKey="0">
                                                Business address and contact details, title, summary, and logo,
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <Row className="d-flex align-items-center">
                                                        <Col>
                                                            <div>
                                                                <img src={favicon} width={40} alt="Company Logo" />
                                                            </div>
                                                            <div>
                                                                <strong>SilverWebbuzz</strong>, india
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-2">
                                                                <Field
                                                                    className="form-control border rounded"
                                                                    name="title"
                                                                    type="text"
                                                                    placeholder="Title"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Field
                                                                    className="form-control border rounded"
                                                                    name="summary"
                                                                    type="text"
                                                                    placeholder="Summary example: project name, description of estimate"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>

                                    {/* </CommonAccordion> */}
                                    <Card>
                                        <Card.Body>
                                            <Row className="mb-4">
                                                <Col>
                                                    <div className="w-50">
                                                        <div className="mb-3">
                                                            <select
                                                                className="form-control border"
                                                                onChange={(e) => handleChangeCustomer(e)}
                                                            >
                                                                {getAllCustomers.map((val) => {
                                                                    return (
                                                                        <option key={val?._id} value={val?.name}>
                                                                            {val?.name}{' '}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>

                                                            <div onClick={() => setModalTypeOpen('CUSTOMERS')}>
                                                                <OpenModalButton modalType={'ADD'} buttonName={'Add a customer'} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label>Other E-mail Send</label>
                                                            <Field className="form-control border rounded" name="ccMail" type="email" />
                                                        </div>
                                                        <div className="font-weight-bold">
                                                            <div>
                                                                <div className="my-3">
                                                                    <span>
                                                                        Currency: {getSingleCustomerData?.currencyName} - ({currencySign})
                                                                    </span>
                                                                </div>
                                                                {customerName.length > 0 && (
                                                                    <div className="my-3">
                                                                        <span>Country: </span>
                                                                        <Field
                                                                            className="form-control border"
                                                                            as="select"
                                                                            name="customerCountry"
                                                                        >
                                                                            {getAllCountries.map((val) => {
                                                                                return (
                                                                                    <option key={val?._id} value={val?.countryName}>
                                                                                        {val?.countryName}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {values.customerCountry.length > 0 && (
                                                                <div className="my-3">
                                                                    <span>State: </span>
                                                                    <Field className="form-control border" as="select" name="customerState">
                                                                        <option value={''}>Select State</option>
                                                                        {getAllStates.map((val) => (
                                                                            <option key={val?._id} value={val?.name}>
                                                                                {val?.name}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>

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
