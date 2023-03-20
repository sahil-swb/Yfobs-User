import * as React from 'react';

const Dashboard = React.lazy(() => import('./View/Pages/Dashboard'));
const Customers = React.lazy(() => import('./View/Pages/Customers'));
const Categories = React.lazy(() => import('./View/Pages/Categories'));
const Products = React.lazy(() => import('./View/Pages/Products'));
const Estimates = React.lazy(() => import('./View/Pages/Estimates'));
// const Login = React.lazy(() => import('./View/Pages/Login'));
// const Register = React.lazy(() => import('./View/Pages/Register'));

const routes = [
    // { path: '/', exact: true, name: 'Login_Page', component: Login },
    // { path: '/register_page', exact: true, name: 'Register_Page', component: Register },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/customers', exact: true, name: 'Customers', component: Customers },
    { path: '/categories', exact: true, name: 'Categories', component: Categories },
    { path: '/products', exact: true, name: 'Products', component: Products },
    { path: '/estimates', exact: true, name: 'Estimates', component: Estimates }
];
export default routes;
