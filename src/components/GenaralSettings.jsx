import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../slices/authSlice';
import { getAllCountriesApi, getAllStatesApi } from '../slices/countryDetailSlice';

const GenaralSettings = () => {
    const { getDataById } = useSelector((state) => state.authReducer);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log(values);
    };

    useEffect(() => {
        const userData = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
        const userId = JSON.parse(userData).userId;
        const payload = {
            _id: userId
        };
        dispatch(getSingleUser({ payload }));
        dispatch(getAllCountriesApi());
        dispatch(getAllStatesApi());
    }, []);

    return (
        <>
            <Card>
                <Card.Header>Personal Information</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: getDataById?.name,
                            email: getDataById?.email,
                            country_name: '',
                            state: '',
                            city: '',
                            postcode: '',
                            address: ''
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <div>
                                <label>Name</label>
                                <Field className="form-control" type="text" name="name" />
                            </div>
                            <div className="mt-3">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" />
                            </div>
                            <div className="mt-3">
                                <label>Country</label>
                                <Field className="form-control" as="select" name="country_name">
                                    {getAllCountries &&
                                        getAllCountries?.map((val) => {
                                            return (
                                                <option key={val?._id} value={val?.countryName}>
                                                    {val?.countryName}
                                                </option>
                                            );
                                        })}
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>State</label>
                                <Field className="form-control" name="state" as="select">
                                    <option>Select State</option>
                                    {getAllStates &&
                                        getAllStates?.map((val) => {
                                            return (
                                                <option key={val?._id} value={val?.name}>
                                                    {val?.name}
                                                </option>
                                            );
                                        })}
                                </Field>
                            </div>
                            <div className="mt-3">
                                <label>City</label>
                                <Field className="form-control" type="text" name="city" />
                            </div>
                            <div className="mt-3">
                                <label>Postcode</label>
                                <Field className="form-control" type="text" name="postcode" />
                            </div>
                            <div className="mt-3">
                                <label>Adderss</label>
                                <Field className="form-control" type="text" name="address" />
                            </div>
                        </Form>
                    </Formik>
                </Card.Body>
                <Card.Footer>
                    <Button type="submit">Submit</Button>
                </Card.Footer>
            </Card>
        </>
    );
};

export default GenaralSettings;
