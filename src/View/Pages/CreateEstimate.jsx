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

const CreateEstimate = () => {
    const [modalOpenType, setModalTypeOpen] = useState('');
    const [footerText, setFooterText] = useState('');
    const [currencySign, setCurrencySign] = useState('');
    const [countryId, setCountryId] = useState('');
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const { getEstimateProducts, getSingleProduct } = useSelector((state) => state.productsReducer);
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [defaultTotal, setDefaultTotal] = useState(0);
    const [defaultDiscount, setDefaultDiscount] = useState(0);
    const [defaultTax, setDefaultTax] = useState(0);
    const estimateId = useParams();
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);
    const history = useHistory();

    let defaultQuantity = 1;

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
            productStatus: 'productEstimate'
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
        history.push('/estimates');
    };

    const handleChangeCustomer = (e) => {
        const id = e.target.value;
        const payload = {
            _id: id
        };
        dispatch(getCustomerById({ payload }));
    };

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, [createCustomer, getSingleCustomerData]);

    useEffect(() => {
        if (estimateId?._id) {
            let payload = {
                _id: estimateId?._id
            };
            dispatch(getEstimateById({ payload }));
        }
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    useEffect(() => {
        getAllCountries.map((val) => {
            if (getSingleCustomerData?.currencyName === val?.currencyName) {
                setCurrencySign(val?.currencySymbol);
                setCountryPrefillValue(val?.countryName);
            }
        });
    }, [getSingleCustomerData, countryPrefillValue]);

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
                                          estimateProducts:
                                              productArray?.[0].filter((item) => {
                                                  console.log(item);
                                              }) || []
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
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle className="border-0 p-3 text-left font-weight-bold h4" eventKey="0">
                                                Business address and contact details, title, summary, and logo
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
                                                            <select
                                                                className="form-control mb-3 border rounded"
                                                                onChange={(e) => handleChangeCustomer(e)}
                                                            >
                                                                <option value="">Select Customer</option>
                                                                {getAllCustomers.map((val) => (
                                                                    <option value={val._id} key={val?._id}>
                                                                        {val?.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <Button
                                                                onClick={() => {
                                                                    dispatch(commonModalIsOpen(true));
                                                                    dispatch(commonModalType('ADD'));
                                                                    setModalTypeOpen('CUSTOMERS');
                                                                }}
                                                                variant="outline-primary"
                                                            >
                                                                Add a customer
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <label>Other E-mail Send</label>
                                                            <Field className="form-control border rounded" name="ccMail" type="email" />
                                                        </div>
                                                        <div className="font-weight-bold">
                                                            {getSingleCustomerData?._id && (
                                                                <div>
                                                                    <div className="my-3">
                                                                        <span>
                                                                            Currency: {getSingleCustomerData?.currencyName} - (
                                                                            {currencySign})
                                                                        </span>
                                                                    </div>
                                                                    <div className="my-3">
                                                                        <span>Country: </span>
                                                                        <select
                                                                            className="form-control mb-3 border rounded mt-2"
                                                                            onChange={(e) => setCountryId(e.target.value)}
                                                                        >
                                                                            <option value="">Select Country</option>
                                                                            {getAllCountries?.map((val) => (
                                                                                <option value={val._id} key={val?._id}>
                                                                                    {val?.countryName}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {countryId && (
                                                                <div className="my-3">
                                                                    <span>State: </span>
                                                                    <select className="form-control mb-3 border rounded mt-2">
                                                                        <option value="">Select State</option>
                                                                        {getAllStates?.map((val) => (
                                                                            <option key={val?._id}>{val?.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="w-50 mr-0 ml-auto">
                                                        <div className="">
                                                            <label>Estimate number</label>
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
                                                            <label>Estimate date</label>
                                                            <Field className="form-control border rounded" name="date" type="date" />
                                                        </div>
                                                        <div>
                                                            <label>Expires on</label>
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
                                                                                                {/* <Field
                                                                                                disabled
                                                                                                className="form-control border rounded"
                                                                                                /> */}
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
                                                        <Button
                                                            onClick={() => {
                                                                dispatch(commonModalIsOpen(true));
                                                                dispatch(commonModalType('ADD'));
                                                                setModalTypeOpen('PRODUCTS');
                                                            }}
                                                            variant="outline-primary"
                                                        >
                                                            Add an Item
                                                        </Button>
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
                                                                {currencySign} {grandTotal}
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
