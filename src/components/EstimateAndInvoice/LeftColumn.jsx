import React from 'react';
import { Col } from 'react-bootstrap';
import CommonSelect from '../CommonSelect';
import OpenModalButton from '../../View/Pages/OpenModalButton';
import { Field } from 'formik';

const LeftColumn = () => {
    return (
        <Col>
            <div className="w-50">
                <div className="mb-3">
                    <CommonSelect
                        type="CUSTOMERS"
                        handleChange={handleChangeCustomer}
                        defaultSelectText={'Select Customer'}
                        getAllData={getAllCustomers}
                    />

                    <div onClick={() => setModalTypeOpen('CUSTOMERS')}>
                        <OpenModalButton modalType={'ADD'} buttonName={'Add a customer'} />
                    </div>
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
                                    Currency: {getSingleCustomerData?.currencyName} - ({currencySign})
                                </span>
                            </div>
                            <div className="my-3">
                                <span>Country: </span>
                                <CommonSelect
                                    type="COUNTRIES"
                                    handleChange={setCountryId}
                                    defaultSelectText={'Select Country'}
                                    getAllData={getAllCountries}
                                />
                            </div>
                        </div>
                    )}
                    {countryId && (
                        <div className="my-3">
                            <span>State: </span>
                            <CommonSelect
                                type="STATES"
                                handleChange={() => {}}
                                defaultSelectText={'Select State'}
                                getAllData={getAllStates}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default LeftColumn;
