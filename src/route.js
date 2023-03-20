import * as React from 'react';
const Login = React.lazy(() => import('../src/View/Pages/Login'));
const Register = React.lazy(() => import('../src/View/Pages/Register'));
const ForgotPassword = React.lazy(() => import('../src/View/Pages/ForgotPassword'));
const ChangePassword = React.lazy(() => import('../src/View/Pages/ChangePassword'));

const route = [
    { path: '/', exact: true, name: 'Login', component: Login },
    { path: '/register', exact: true, name: 'Register', component: Register },
    { path: '/forgot_password', exact: true, name: 'ForgotPassword', component: ForgotPassword },
    { path: '/change_password', exact: true, name: 'ChangePassword', component: ChangePassword }
];
export default route;
