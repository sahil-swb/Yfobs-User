import * as React from 'react';
import history from './history';

const Dashboard = React.lazy(() => import('./View/Pages/Dashboard'));
const Customers = React.lazy(() => import('./View/Pages/Customers'));
const Categories = React.lazy(() => import('./View/Pages/Categories'));
const Products = React.lazy(() => import('./View/Pages/Products'));
const Estimates = React.lazy(() => import('./View/Pages/Estimates'));
const CreateEstimate = React.lazy(() => import('./View/Pages/CreateEstimate'));
const EstimateDetails = React.lazy(() => import('./View/Pages/EstimateDetails'));
const Invoices = React.lazy(() => import('./View/Pages/Invoices'));
const InvoiceDetails = React.lazy(() => import('./View/Pages/InvoiceDetails'));
const Expense = React.lazy(() => import('./View/Pages/Expense'));
const Vendors = React.lazy(() => import('./View/Pages/Vendors'));
const Reports = React.lazy(() => import('./View/Pages/Reports'));
const Subscription = React.lazy(() => import('./View/Pages/Subscription'));
const ChangePassword = React.lazy(() => import('./components/settingsTabs/ChangePassword'));
const GstCalulate = React.lazy(() => import('./View/Pages/GstCalculate'));

// const EstimatePreview = React.lazy(() => import('../src/View/Pages/EstimatePreview'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/customers', exact: true, name: 'Customers', component: Customers },
    { path: '/categories', exact: true, name: 'Categories', component: Categories },
    { path: '/products', exact: true, name: 'Products', component: Products },
    { path: '/estimates', exact: true, name: 'Estimates', component: Estimates },
    { path: '/estimates/create_estimates', exact: true, name: 'CreateEstimate', component: CreateEstimate },
    { path: '/invoices/create_invoices', exact: true, name: 'CreateInvoice', component: CreateEstimate },
    { path: '/estimates/estimates_details/:_id', exact: true, name: 'EstimateDetails', component: EstimateDetails },
    { path: '/estimates/edit_estimates/:_id', exact: true, name: 'EditEstimate', component: CreateEstimate },
    { path: '/invoices', exact: true, name: 'Invoices', component: Invoices },
    { path: '/invoices/invoice_details/:_id', exact: true, name: 'InvoiceDetails', component: InvoiceDetails },
    { path: '/expense', exact: true, name: 'Expense', component: Expense },
    { path: '/vendors', exact: true, name: 'Vendors', component: Vendors },
    { path: '/reports', exact: true, name: 'Reports', component: Reports },
    { path: '/subscription', exact: true, name: 'Subscription', component: Subscription },
    { path: '/user_change_password', exact: true, name: 'ChangePassword', component: ChangePassword },
    { path: '/gst_calculate', exact: true, name: 'GstCalulate', component: GstCalulate }
    // { path: '/estimates/estimates_preview/:_id', exact: true, name: 'EstimatePreview', component: EstimatePreview }
];
export default routes;
