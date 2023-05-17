import React from 'react';
import Breadcrumb from '../App/layout/AdminLayout/Breadcrumb';

const AuthLayout = ({ children }) => {
    return (
        <>
            {/* <Breadcrumb /> */}
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-right text-center">
                            <div className="col-md-12">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
