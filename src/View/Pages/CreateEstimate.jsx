import { Field, FieldArray, Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Badge, Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomersModal from '../../components/modals/CustomersModal';
import ProductsEstimateModal from '../../components/modals/ProductsEstimateModal';
import { getAllCustomersApi, getCustomerById } from '../../slices/customersSlice';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import favicon from '../../assets/images/favicon-32x32.png';
import JoditEditor from 'jodit-react';
import { createEstimateApi } from '../../slices/estimatesSlice';
import { getAllCountriesApi, getAllStatesApi } from '../../slices/countryDetailSlice';

const CreateEstimate = () => {
    const [modalOpenType, setModalTypeOpen] = useState('');
    const [footerText, setFooterText] = useState('');
    const [currencySign, setCurrencySign] = useState('');
    const [countryId, setCountryId] = useState('');
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const { getEstimateProducts } = useSelector((state) => state.productsReducer);
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const dispatch = useDispatch();
    // const formik = useFormik();
    // const { values, submitForm, setFieldValue } = useFormikContext();
    const handleSubmit = (values, resetForm) => {
        const payload = {
            businessId: values?.businessId,
            title: values?.title,
            summary: values?.summary,
            ccMail: values?.ccMail,
            number: values?.number,
            posoNumber: values?.posoNumber,
            date: values?.date,
            expireOn: values?.expireOn,
            subTotal: values?.subTotal
        };

        dispatch(createEstimateApi({ payload }));
        resetForm({ payload: '' });
    };

    const handleChangeCustomer = (e) => {
        const id = e.target.value;
        console.log(id);
        const payload = {
            _id: id
        };
        dispatch(getCustomerById({ payload }));
    };

    const handleCountryChange = (e) => {
        setCountryId(e.target.value);
    };

    const handleFooterText = (e) => {
        const fText = e;
        setFooterText(fText);
    };

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, [createCustomer, getSingleCustomerData]);

    useEffect(() => {
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    useEffect(() => {
        if (getEstimateProducts) {
            // setFieldValue('estimateProducts', getEstimateProducts);
        }
    }, [getEstimateProducts]);

    useEffect(() => {
        getAllCountries.map((val) => {
            if (getSingleCustomerData?.currencyName === val?.currencyName) {
                setCurrencySign(val?.currencySymbol);
                setCountryPrefillValue(val?.countryName);
            }
        });
    }, [getSingleCustomerData, countryPrefillValue]);

    return (
        <>
            <Row>
                <Col xl={{ span: 10, offset: 1 }}>
                    <div className="d-flex mb-4" style={{ justifyContent: 'space-between' }}>
                        <h3>Create new Estimate</h3>
                        <Button as={Link} to="/estimates" variant="outline-primary">
                            All Estimates
                        </Button>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                businessId: '',
                                title: '',
                                summary: '',
                                ccMail: '',
                                number: '',
                                posoNumber: '',
                                date: '',
                                expireOn: '',
                                subTotal: '',
                                estimateProducts: []
                            }}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        >
                            {({ values }) => (
                                <Form>
                                    {/* {console.log(values?.estimateProducts)} */}
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
                                                                            onChange={(e) => handleCountryChange(e)}
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
                                            <Row className="">
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
                                                                {/* {getEstimateProducts?.map((val) => (
                                                                    <tr>
                                                                        <td>
                                                                            <input
                                                                                className="form-control border rounded"
                                                                                type="text"
                                                                                defaultValue={val.name}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                className="form-control border rounded"
                                                                                type="number"
                                                                                defaultValue={val.price}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input className="form-control border rounded" type="number" />
                                                                        </td>
                                                                        <td></td>
                                                                    </tr>
                                                                ))} */}
                                                                <FieldArray
                                                                    name="estimateProducts"
                                                                    render={(arrayHelpers) => (
                                                                        <div>
                                                                            {values &&
                                                                                values?.estimateProducts.map((estimate, index) => (
                                                                                    <div key={index}>
                                                                                        {/** both these conventions do the same */}
                                                                                        <Field
                                                                                            className="form-control border rounded"
                                                                                            name={`estimate[${index}].name`}
                                                                                        />
                                                                                        <Field
                                                                                            className="form-control border rounded"
                                                                                            name={`estimate.${index}.price`}
                                                                                        />
                                                                                        <Field
                                                                                            className="form-control border rounded"
                                                                                            name={`estimate[${index}].que`}
                                                                                        />
                                                                                        <Field
                                                                                            className="form-control border rounded"
                                                                                            name={`estimate.${index}.total`}
                                                                                        />

                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                                        >
                                                                                            X
                                                                                        </button>
                                                                                    </div>
                                                                                ))}
                                                                            {/* <button
                                                                                type="button"
                                                                                onClick={() => arrayHelpers.push({ name: '', age: '' })}
                                                                            >
                                                                                +
                                                                            </button> */}
                                                                        </div>
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
                                                                <span className="mr-5">Sub Total</span> {currencySign} .00
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <label className="mr-3">Discount in %</label>
                                                                <Field
                                                                    className="mr-5 rounded p-1"
                                                                    style={{ width: '40px' }}
                                                                    name="discount"
                                                                    type="number"
                                                                />
                                                                <span>{currencySign} 0</span>
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <label className="mr-3">Tax in %</label>
                                                                <Field
                                                                    className="mr-5 rounded p-1"
                                                                    style={{ width: '40px' }}
                                                                    name="tax"
                                                                    type="number"
                                                                />
                                                                <span>{currencySign} 0</span>
                                                            </ListGroup.Item>
                                                            <ListGroup.Item>
                                                                <span className="mr-5"> Grand Total</span>
                                                                {currencySign} .00
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
                                            <JoditEditor value={footerText} onChange={handleFooterText} />
                                        </Card.Body>
                                    </Card>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit">Save Estimate</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {modalOpenType === 'CUSTOMERS' ? <CustomersModal /> : modalOpenType === 'PRODUCTS' ? <ProductsEstimateModal /> : null}
                </Col>
            </Row>
        </>
    );
};

export default CreateEstimate;
