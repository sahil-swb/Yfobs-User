import React from 'react';
import logoDark from '../../assets/images/logo-dark.png';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import { Field, Form, Formik } from 'formik';
import { UserChangePassword } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import AuthLayout from '../../components/AuthLayout';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const handleChangePassword = (values) => {
        let payload = {
            _id: '63c4f7c4274cbea3a36918e4',
            password: values.password,
            newPassword: values.newPassword
        };
        if (values.newPassword === values.confPassword) {
            dispatch(UserChangePassword({ payload }));
        } else {
            alert('Password Not Matched');
        }
    };
    return (
        <AuthLayout>
            <div className="card-body">
                <img src={logoDark} alt="" className="img-fluid mb-4" />
                <h4 className="mb-4 f-w-400">Change your password</h4>
                <Formik
                    initialValues={{ password: '', newPassword: '', confPassword: '' }}
                    onSubmit={(values) => handleChangePassword(values)}
                >
                    <Form>
                        <div className="form-group fill mb-4">
                            <Field name="password" type="password" className="form-control" placeholder="Old Password" />
                        </div>
                        <div className="form-group fill mb-4">
                            <Field name="newPassword" type="password" className="form-control" placeholder="New Password" />
                        </div>
                        <div className="form-group fill mb-4">
                            <Field name="confPassword" type="password" className="form-control" placeholder="Re-Type New Password" />
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
