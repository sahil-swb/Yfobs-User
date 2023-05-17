import React from 'react';
import yfobslogo from '../../assets/images/yfobs-logo.png';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import { Field, Form, Formik } from 'formik';
import { UserChangePassword } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../../components/AuthLayout';
import { useHistory } from 'react-router-dom';
import { userId } from '../../constants/userData';

const ChangePassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleChangePassword = (values) => {
        let payload = {
            _id: userId,
            password: values.password,
            newPassword: values.newPassword
        };
        console.log('payload', payload);
        if (values.newPassword === values.confPassword) {
            dispatch(UserChangePassword({ payload }));
            history.push('/');
        } else {
            alert('Password Not Matched');
        }
    };
    return (
        <AuthLayout>
            <div className="card-body">
                <img src={yfobslogo} alt="" width={100} className="img-fluid mb-4" />
                <h4 className="mb-4 f-w-400">Change your password</h4>
                <Formik
                    initialValues={{ password: '', newPassword: '', confPassword: '' }}
                    onSubmit={(values) => handleChangePassword(values)}
                >
                    <Form>
                        <div className="form-group fill mb-4">
                            <Field name="password" type="password" className="form-control" placeholder="Enter OTP" />
                        </div>
                        <div className="form-group fill mb-4">
                            <Field name="newPassword" type="password" className="form-control" placeholder="New Password" />
                        </div>
                        <div className="form-group fill mb-4">
                            <Field name="confPassword" type="password" className="form-control" placeholder="Confirm New Password" />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary mb-4">
                            Change password
                        </button>
                    </Form>
                </Formik>
            </div>
        </AuthLayout>
    );
};

export default ChangePassword;
