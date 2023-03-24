import * as React from 'react';
import history from './history';

const Dashboard = React.lazy(() => import('./View/Pages/Dashboard'));
const Customers = React.lazy(() => import('./View/Pages/Customers'));
const Categories = React.lazy(() => import('./View/Pages/Categories'));
const Products = React.lazy(() => import('./View/Pages/Products'));
const Estimates = React.lazy(() => import('./View/Pages/Estimates'));
const CreateEstimate = React.lazy(() => import('./View/Pages/CreateEstimate'));
const EstimateDetails = React.lazy(() => import('./View/Pages/EstimateDetails'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/customers', exact: true, name: 'Customers', component: Customers },
    { path: '/categories', exact: true, name: 'Categories', component: Categories },
    { path: '/products', exact: true, name: 'Products', component: Products },
    { path: '/estimates', exact: true, name: 'Estimates', component: Estimates },
    { path: '/estimates/create_estimates', exact: true, name: 'CreateEstimate', component: CreateEstimate },
    { path: '/estimates/estimates_details', exact: true, name: 'EstimateDetails', component: EstimateDetails }
];
export default routes;
