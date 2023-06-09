import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import '../../assets/scss/style.scss';
import logoDark from '../../assets/images/logo-dark.png';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setIsLogin } from '../../slices/authSlice';
import AuthLayout from '../../components/AuthLayout';
import history from '../../history';
// import history from '../../history';

const Login = () => {
    const { loginData, isLogin } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        console.log(values);
        let payload = {
            email: values.email,
            password: values.password
        };
        console.log(payload);
        dispatch(setIsLogin(true));
        dispatch(loginUser({ payload }));
        // history.push('/dashboard');
    };

    return (
        <>
            <AuthLayout>
                <div className="card-body">
                    <img src={logoDark} alt="" className="img-fluid mb-4" />
                    <h4 className="mb-3 f-w-400">Signin</h4>
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => handleLogin(values)}>
                        <Form>
                            <div className="form-group fill">
                                <Field name="email" type="email" className="form-control" placeholder="Email Address" />
                            </div>
                            <div className="form-group fill mb-4">
                                <Field name="password" type="password" className="form-control" placeholder="Password" />
                            </div>

                            <Button type="submit" className="btn btn-block btn-primary mb-4">
                                Signin
                            </Button>
                        </Form>
                    </Formik>
                    <p className="mb-2 text-muted">
                        Forgot password?{' '}
                        <NavLink to="/forgot_password" className="f-w-400">
                            Reset
                        </NavLink>
                    </p>
                    <p className="mb-0 text-muted">
                        Don’t have an account?{' '}
                        <NavLink to="/register" className="f-w-400">
                            SignUp
                        </NavLink>
                    </p>
                </div>
            </AuthLayout>
        </>
    );
};
export default Login;
