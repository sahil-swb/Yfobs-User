import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import CommonSelect from '../CommonSelect';
import OpenModalButton from '../../View/Pages/OpenModalButton';
import { Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomersApi, getCustomerById } from '../../slices/customersSlice';
import Select from 'react-select';

const LeftColumn = ({ setModalTypeOpen, currencySign, setCurrencySign }) => {
    const [countryId, setCountryId] = useState('');
    const [countryPrefillValue, setCountryPrefillValue] = useState('');
    const { getAllCustomers, createCustomer, getSingleCustomerData } = useSelector((state) => state.customers);
    const { getAllCountries, getAllStates } = useSelector((state) => state.countriesInfoReducer);
    const [countryOptions, setCountryoption] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();

    const handleChangeCustomer = (e) => {
        console.log(e);
        // const id = e.target.value;
        // const payload = {
        //     _id: id
        // };
        // dispatch(getCustomerById({ payload }));
    };

    useEffect(() => {
        getAllCountries.map((val) => {
            if (getSingleCustomerData?.currencyName === val?.currencyName) {
                setCurrencySign(val?.currencySymbol);
                setSelectedOption(val?.countryName);
                setCountryPrefillValue(getSingleCustomerData?.countryName);
            }
        });
    }, [getSingleCustomerData, countryPrefillValue]);

    useEffect(() => {
        dispatch(getAllCustomersApi());
    }, [createCustomer, getSingleCustomerData]);

    useEffect(() => {
        if (getAllCountries) {
            getAllCountries?.map((Itm) => {
                let Value = Itm.countryName;
                let Label = Itm.countryName;
                setCountryoption((result) => [...result, { value: Value, label: Label }]);
            });
        }
    }, [getAllCountries]);

    console.log('getSingleCustomerData----', getSingleCustomerData);

    return (
        <Col>
            <div className="w-50">
                <div className="mb-3">
                    {/* <CommonSelect
                        type="CUSTOMERS"
                        handleChange={handleChangeCustomer}
                        defaultSelectText={'Select Customer'}
                        getAllData={getAllCustomers}
                    /> */}
                    <select onChange={(e) => handleChangeCustomer(e)}>
                        {getAllCustomers.map((val) => {
                            return (
                                <option key={val?.countryName} value={val?._id}>
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
                            <Select
                                defaultValue={getSingleCustomerData?.countryName}
                                onChange={setSelectedOption}
                                options={countryOptions}
                            />
                            {/* <CommonSelect
                                    type="COUNTRIES"
                                    countryPrefillValue={countryPrefillValue}
                                    handleChange={setCountryId}
                                    defaultSelectText={'Select Country'}
                                    getAllData={getAllCountries}
                                /> */}
                        </div>
                    </div>

                    {countryId && (
                        <div className="my-3">
                            <span>State: </span>
                            {/* <CommonSelect
                                type="STATES"
                                handleChange={() => {}}
                                defaultSelectText={'Select State'}
                                getAllData={getAllStates}
                            /> */}
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default LeftColumn;
