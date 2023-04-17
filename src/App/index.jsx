import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import Loader from './layout/Loader';
import ScrollToTop from './layout/ScrollToTop';
import routesOnePage from '../route';
import routes from '../routes';
// import { userData } from '../constants/userData';
const AdminLayout = lazy(() => import('./layout/AdminLayout'));

const App = () => {
    let data = localStorage.getItem('userData');
    const location = useLocation();
    // const ans = userData;
    // console.log(userData);
    console.log(data);
    console.log(location);
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

                    {data !== null ? (
                        <Route path={routes.map((x) => x.path)}>
                            <AdminLayout data={data} />
                        </Route>
                    ) : (
                        <Redirect from="/" to={'/'} />
                    )}
                </Suspense>
            </ScrollToTop>
            <div className="backdrop" />
        </>
    );
};
export default App;
