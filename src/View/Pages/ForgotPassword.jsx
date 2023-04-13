import React from 'react';
import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import { NavLink, useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, UserForgotPassword } from '../../slices/authSlice';
import AuthLayout from '../../components/AuthLayout';

const ForgotPassword = () => {
    const { forgotPasswordData } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleForgotPassword = (values) => {
        let payload = {
            email: values.email
        };
        dispatch(UserForgotPassword({ payload }));
        history.push('/change_password');
    };
    console.log(forgotPasswordData);
    return (
        <AuthLayout>
            <div className="card-body">
                <img src={logoDark} alt="" className="img-fluid mb-4" />
                <h4 className="mb-3 f-w-400">Reset your password</h4>
                <Formik initialValues={{ email: '' }} onSubmit={(values) => handleForgotPassword(values)}>
                    <Form>
                        <div className="form-group fill">
                            <Field name="email" type="email" className="form-control" placeholder="Email Address" />
                        </div>

                        <button className="btn btn-block btn-primary mb-4" type="submit">
                            Reset password
                        </button>
                    </Form>
                </Formik>
                <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/register" className="f-w-400">
                        Signup
                    </NavLink>
                </p>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
