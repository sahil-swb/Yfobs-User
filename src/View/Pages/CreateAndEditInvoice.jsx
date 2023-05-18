import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import CustomersModal from '../../components/modals/CustomersModal';
import ProductsEstimateModal from '../../components/modals/ProductsEstimateModal';
import { getAllCustomersApi, getCustomerById } from '../../slices/customersSlice';
import favicon from '../../assets/images/favicon-32x32.png';
import JoditEditor from 'jodit-react';
import { getAllCountriesApi, getAllStatesApi } from '../../slices/countryDetailSlice';
import { businessId, userId } from '../../constants/userData';
import { createProductApi, updateProductApi } from '../../slices/productsSlice';
import OpenModalButton from './OpenModalButton';
import { createInvoice, getSingleInvoice, updateInvoice } from '../../slices/invoiceSlice';

const CreateAndEditInvoice = () => {
    const [content, setContent] = useState('');
    const [modalOpenType, setModalTypeOpen] = useState('');
    const [currencySign, setCurrencySign] = useState('');
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);
    const { getEstimateProducts } = useSelector((state) => state.productsReducer);
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [defaultTotal, setDefaultTotal] = useState(0);
    const [defaultDiscount, setDefaultDiscount] = useState(0);
    const [defaultTax, setDefaultTax] = useState(0);
    const { getSingleInvoiceData } = useSelector((state) => state.invoiceReducer);
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const history = useHistory();
    const updateId = useParams();
    const dispatch = useDispatch();

    //Product Price Calculation
    let discountValue = (defaultTotal * defaultDiscount) / 100;
    let discountAmount = defaultTotal - (defaultTotal * defaultDiscount) / 100;
    let taxValue = (discountAmount * defaultTax) / 100;
    let grandTotal = (discountAmount * defaultTax) / 100 + discountAmount;

    // Jodit Configuration
    const config = {
        readonly: false
    };

    // Customer Prefill Name From Estimate Api
    let prefillCustomerName = getSingleInvoiceData?.data?.customerName;

    // Product Array From Estimate Api
    let productArray = getSingleInvoiceData?.products?.map((val) => val?.product);

    // Product Array created using onClick

    const handleSubmit = (values, resetForm) => {
        const payload = {
            userId: userId,
            businessId: businessId,
            title: values?.title,
            summary: values?.summary,
            customerId: getSingleCustomerData?._id,
            customerName: customerName,
            customerCountry: values?.customerCountry,
            customerState: values?.customerState,
            ccMail: values?.ccMail,
            number: values?.number,
            posoNumber: values?.posoNumber,
            date: values?.date,
            expireOn: values?.expireOn,
            subTotal: defaultTotal,
            discount: defaultDiscount,
            tax: defaultTax,
            grandTotal: Math.round(grandTotal),
            convertTotal: values?.convertTotal,
            footerNote: content,
            productStatus: 'productEstimate'

            // paymentDue: values?.paymentDue,
            // parentId: values?.parentId,
            // expireOn: values?.expireOn,
            // challanNo: values?.challanNo,
            // customer: values?.customer,
            // dueLimit: values?.dueLimit,
            // recurringStart: values?.recurringStart,
            // recurringEnd: values?.recurringEnd,
            // nextPayment: values?.nextPayment,
            // sendMyself: values?.sendMyself,
            // status: values?.status
        };
        if (updateId?._id) {
            payload._id = updateId?._id;
            dispatch(updateInvoice({ payload })).then((res) => {
                if (res?.payload?._id) {
                    let payload = {
                        _id: getSingleInvoiceData?.products?.map((val) => val?._id),
                        EstimatesId: res?.payload?._id,
                        userId: userId,
                        product: values.estimateProducts,
                        productStatus: 'productEstimate'
                    };

                    dispatch(updateProductApi({ payload }));
                }
            });
        } else {
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
        }

        setContent('');
        setCustomerName('');
        setCurrencySign('');
        history.push('/invoices');
    };

    const handleChangeCustomer = (e) => {
        let customerName = e.target.value;
        getAllCustomers.filter((val) => {
            let ID = val.name === customerName && val?._id;
            if (ID !== false) {
                const payload = {
                    _id: ID
                };
                dispatch(getCustomerById({ payload }));
            }
        });
        setCustomerName(customerName);
    };

    useEffect(() => {
        if (updateId?._id) {
            let payload = {
                _id: updateId?._id
            };
            dispatch(getSingleInvoice({ payload }));
        }
    }, []);

    useEffect(() => {
        getAllCountries.map((val) => {
            if (getSingleCustomerData?.currencyName === val?.currencyName) {
                setCurrencySign(val?.currencySymbol);
                setCountryPrefillValue(getSingleCustomerData?.countryName);
            }
        });
    }, [getSingleCustomerData, countryPrefillValue]);

    useEffect(() => {
        let payload = {
            _id: userId
        };
        dispatch(getAllCustomersApi({ payload }));
    }, [createCustomer]);

    useEffect(() => {
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    useEffect(() => {
        setDefaultTax(getSingleInvoiceData?.data?.tax);
        setDefaultDiscount(getSingleInvoiceData?.data?.discount);
    }, [getSingleInvoiceData?.data?.tax, getSingleInvoiceData?.data?.discount]);

    return (
        <>
            <Row>
                <Col xl={{ span: 10, offset: 1 }}>
                    <div className="d-flex mb-4" style={{ justifyContent: 'space-between' }}>
                        <h3>{updateId?._id ? 'Edit Invoice' : 'Create new Invoice'}</h3>
                        <Button as={Link} to="/invoices" variant="outline-primary">
                            All Invoices
                        </Button>
                    </div>
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={
                                updateId?._id
                                    ? {
                                          title: getSingleInvoiceData?.data?.title || '',
                                          summary: getSingleInvoiceData?.data?.summary || '',
                                          ccMail: getSingleInvoiceData?.data?.ccMail || '',
                                          number: getSingleInvoiceData?.data?.number || '',
                                          posoNumber: getSingleInvoiceData?.data?.posoNumber || '',
                                          date: getSingleInvoiceData?.data?.date || '',
                                          expireOn: getSingleInvoiceData?.data?.expireOn || '',
                                          customerCountry: getSingleInvoiceData?.data?.customerCountry || '',
                                          customerState: getSingleInvoiceData?.data?.customerState || '',
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
                                          estimateProducts: []
                                      }
                            }
                            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        >
                            {({ values }) => (
                                <Form>
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

                                    <Card>
                                        <Card.Body>
                                            <Row className="mb-4">
                                                <Col>
                                                    <div className="w-50">
                                                        <div className="mb-3">
                                                            <h5>Select Customer</h5>
                                                            <select
                                                                defaultValue={prefillCustomerName}
                                                                className="form-control border mb-2"
                                                                onChange={(e) => handleChangeCustomer(e)}
                                                            >
                                                                <option value="">-- Select Customer --</option>;
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
                                                                {updateId?._id ? (
                                                                    <div className="my-3">
                                                                        <span>Country: </span>
                                                                        <Field
                                                                            className="form-control border"
                                                                            as="select"
                                                                            name="customerCountry"
                                                                        >
                                                                            <option value="">-- Select Country --</option>
                                                                            {getAllCountries.map((val) => {
                                                                                return (
                                                                                    <option key={val?._id} value={val?.countryName}>
                                                                                        {val?.countryName}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                ) : customerName ? (
                                                                    <div className="my-3">
                                                                        <span>Country: </span>
                                                                        <Field
                                                                            className="form-control border"
                                                                            as="select"
                                                                            name="customerCountry"
                                                                        >
                                                                            <option value="">-- Select Country --</option>
                                                                            {getAllCountries.map((val) => {
                                                                                return (
                                                                                    <option key={val?._id} value={val?.countryName}>
                                                                                        {val?.countryName}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                ) : null}
                                                            </div>

                                                            {updateId?._id ? (
                                                                <div className="my-3">
                                                                    <span>State: </span>
                                                                    <Field className="form-control border" as="select" name="customerState">
                                                                        <option value="">-- Select State --</option>
                                                                        {getAllStates.map((val) => (
                                                                            <option key={val?._id} value={val?.name}>
                                                                                {val?.name}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                </div>
                                                            ) : values?.customerCountry ? (
                                                                <div className="my-3">
                                                                    <span>State: </span>
                                                                    <Field className="form-control border" as="select" name="customerState">
                                                                        <option value="">-- Select State --</option>
                                                                        {getAllStates.map((val) => (
                                                                            <option key={val?._id} value={val?.name}>
                                                                                {val?.name}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col>
                                                    <div className="w-50 mr-0 ml-auto">
                                                        <div>
                                                            <label>Invoice number</label>
                                                            <Field className="form-control border rounded" name="number" type="number" />
                                                        </div>
                                                        <div>
                                                            <label>P.O./S.O. number</label>
                                                            <Field
                                                                className="form-control border rounded"
                                                                name="posoNumber"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>Invoice date</label>
                                                            <Field className="form-control border rounded" name="date" type="date" />
                                                        </div>
                                                        <div>
                                                            <label>Due date</label>
                                                            <Field className="form-control border rounded" name="expireOn" type="date" />
                                                        </div>
                                                    </div>
                                                </Col>
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
                                                                    let subTotalAmount = acc + val?.price * val?.quantity;
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
                                                                        updateId?._id
                                                                            ? getSingleInvoiceData?.data?.discount
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
                                                                        updateId?._id ? getSingleInvoiceData?.data?.tax : defaultTax
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
                                            <JoditEditor
                                                value={getSingleInvoiceData?.data?.footerNote}
                                                config={config}
                                                onBlur={(content) => setContent(content)}
                                            />
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

export default CreateAndEditInvoice;
