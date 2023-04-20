import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import '../../assets/scss/style.scss';
import logoDark from '../../assets/images/logo-dark.png';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/authSlice';
import AuthLayout from '../../components/AuthLayout';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../../components/reactPhoneComponent.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Register = () => {
    const { registerData } = useSelector((state) => state.authReducer);
    const [phoneValue, setPhoneValue] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const handleRegister = (values, resetForm) => {
        let payload = {
            name: values.name,
            phone: phoneValue,
            email: values.email,
            password: values.password
        };
        dispatch(registerUser({ payload }));
        resetForm();
        setPhoneValue('');
    };

    const handlePhone = (e) => {
        console.log(e);
        setPhoneValue(e);
    };

    useEffect(() => {
        if (registerData?._id) {
            history.push('/');
        }
    }, [registerData]);
    return (
        <AuthLayout>
            <div className="card-body">
                <img src={logoDark} alt="" className="img-fluid mb-4" />
                <h4 className="mb-3 f-w-400">Sign up</h4>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={(values, { resetForm }) => handleRegister(values, resetForm)}
                >
                    <Form>
                        <div className="form-group fill">
                            <Field type="text" name="name" className="form-control" placeholder="Full Name" />
                        </div>
                        <div className="form-group fill">
                            <Field type="email" name="email" className="form-control" placeholder="Email Address" />
                        </div>
                        <div className="form-group fill">
                            {/* <Field type="phone" name="tel" className="form-control" placeholder="Phone" /> */}
                            <PhoneInput name="phone" placeholder="Enter phone number" value={phoneValue} onChange={(e) => handlePhone(e)} />
                        </div>
                        <div className="form-group fill mb-4">
                            <Field name="password" type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="text-left">
                            <label className="d-flex">
                                <input custom required type="checkbox" id="supported-checkbox" />
                                <span className="mx-2">I agree with Terms of Services.</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Sign up
                        </button>
                    </Form>
                </Formik>
                <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/" className="f-w-400">
                        Login
                    </NavLink>
                </p>
                <p className="font-weight-bold">By clicking Submit, you agree to the Terms of Service and Privacy Policy</p>
            </div>
        </AuthLayout>
    );
};
export default Register;
