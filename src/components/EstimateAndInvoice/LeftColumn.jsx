import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import OpenModalButton from '../../View/Pages/OpenModalButton';
import { Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomersApi, getCustomerById } from '../../slices/customersSlice';
import { getAllCountriesApi, getAllStatesApi } from '../../slices/countryDetailSlice';

const LeftColumn = ({ setModalTypeOpen, currencySign, setCurrencySign, handleChangeCustomer, estimateId, getSingleEstimate, inputs }) => {
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const dispatch = useDispatch();

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

    console.log('getSingleCustomerData-', getSingleEstimate?.data?.customerName);

    return (
        <Col>
            <div className="w-50">
                <div className="mb-3">
                    <select
                        // defaultValue={estimateId ? getSingleEstimate?.data?.customerName : inputs?.customerName}
                        value={inputs?.customerName}
                        onChange={(e) => handleChangeCustomer(e)}
                        name="customerName"
                    >
                        {getAllCustomers.map((val) => {
                            return (
                                <option className="customerClassName" id={val._id} key={val?._id} value={val?.name}>
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
                        <div className="my-3">
                            <span>Country: </span>
                            <select
                                // defaultValue={estimateId ? getSingleEstimate?.data?.customerCountry : getSingleCustomerData.countryName}
                                value={inputs?.customerCountry}
                                onChange={(e) => handleChangeCustomer(e)}
                                name="customerCountry"
                            >
                                {getAllCountries.map((val) => {
                                    return (
                                        <option key={val?._id} value={val?.countryName}>
                                            {val?.countryName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {getSingleCustomerData?._id && (
                        <div className="my-3">
                            <span>State: </span>
                            <select
                                // defaultValue={estimateId ? getSingleEstimate?.data?.customerState : getSingleCustomerData.state}
                                value={inputs?.customerState}
                                onChange={(e) => handleChangeCustomer(e)}
                                name="customerState"
                            >
                                {getAllStates.map((val) => (
                                    <option key={val?._id} value={val?.name}>
                                        {val?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default LeftColumn;
