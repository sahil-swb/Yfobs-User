import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import Loader from './layout/Loader';
import ScrollToTop from './layout/ScrollToTop';
import routesOnePage from '../route';
import routes from '../routes';
import { useState } from 'react';
import Login from '../View/Pages/Login';
import Config from '../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Register from '../View/Pages/Register';
import ForgotPassword from '../View/Pages/ForgotPassword';
import ChangePassword from '../View/Pages/ChangePassword';
// import EstimatePreview from '../View/Pages/EstimatePreview';
const AdminLayout = lazy(() => import('./layout/AdminLayout'));
const EstimatePreview = lazy(() => import('../View/Pages/EstimatePreview'));
// const SignIn = lazy(() => import('../View/Pages/SignIn1'));

const App = () => {
    const location = useLocation();

    let loginData = localStorage.getItem('authToken');

    return (
        <>
            <ScrollToTop>
                <Suspense fallback={<Loader />}>
                    <Route path={routesOnePage.map((x) => x.path)}>
                        <Switch location={location} key={location.pathname}>
                            {routesOnePage.map((route, index) => {
                                return route.component ? (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        render={(props) => <route.component {...props} />}
                                    />
                                ) : null;
                            })}
                        </Switch>
                    </Route>

                    {/* <Route path="/estimates/estimates_preview">
                        <EstimatePreview />
                    </Route> */}

                    <Route path={routes.map((x) => x.path)}>
                        <AdminLayout />
                    </Route>

                    <Route path="/estimates/estimates_preview/:_id" exact={true} render={EstimatePreview} />
                    {/* <EstimatePreview />
                    </Route> */}
                    {/* <Route path={'/'} exact>
                        <Redirect to={Config.defaultPath} />
                    </Route> */}
                </Suspense>
            </ScrollToTop>
            <div className="backdrop" />
        </>
    );
};
export default App;
