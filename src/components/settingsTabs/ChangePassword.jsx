import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userId } from '../../constants/userData';
import { getSingleUser, UserChangePassword } from '../../slices/authSlice';
import { errorPNotify } from '../alertMsg';

const ChangePassword = () => {
    const { getDataById } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const payload = {
            _id: getDataById?._id,
            password: values?.password,
            newPassword: values?.newPassword
        };
        if (values?.confirmNewPassword === values?.newPassword) {
            dispatch(UserChangePassword({ payload }));
        } else {
            errorPNotify('Password Not Matched');
        }
    };

    useEffect(() => {
        const payload = {
            _id: userId
        };
        dispatch(getSingleUser({ payload }));
    }, []);
    return (
        <>
            <Card>
                <Formik
                    enableReinitialize
                    initialValues={{
                        password: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <Card.Header>Change Password</Card.Header>
                        <Card.Body>
                            <div>
                                <label>Old Password</label>
                                <Field className="form-control" type="password" name="password" />
                            </div>
                            <div className="mt-3">
                                <label>New Password</label>
                                <Field className="form-control" type="password" name="newPassword" />
                            </div>
                            <div className="mt-3">
                                <label>Confirm New Password</label>
                                <Field className="form-control" type="password" name="confirmNewPassword" />
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit">Submit</Button>
                        </Card.Footer>
                    </Form>
                </Formik>
            </Card>
        </>
    );
};

export default ChangePassword;