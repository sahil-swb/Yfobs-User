import * as React from 'react';
import { useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from '../Loader';
import routes from '../../../routes';
import useWindowSize from '../../../hooks/useWindowSize';
import * as actionTypes from '../../../store/actions';
//import '../../../app.scss';
const AdminLayout = ({ storageObject }) => {
    const { windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const collapseMenu = useSelector((state) => state.able.collapseMenu);

    useEffect(() => {
        if (windowWidth > 992 && windowWidth <= 1024) {
            dispatch({ type: actionTypes.COLLAPSE_MENU });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const mobileOutClickHandler = () => {
        if (windowWidth < 992 && collapseMenu) {
            dispatch({ type: actionTypes.COLLAPSE_MENU });
        }
    };

    return (
        <>
            <Navigation />
            <NavBar />
            <div className="pcoded-main-container" onClick={() => mobileOutClickHandler}>
                <div>
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            <Breadcrumb />
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <Suspense fallback={<Loader />}>
                                        <Switch>
                                            {routes.map((route, index) => {
                                                return route.component ? (
                                                    <Route
                                                        key={index}
                                                        path={route.path}
                                                        exact={route.exact}
                                                        render={(props) => <route.component {...props} />}
                                                    />
                                                ) : null;
                                            })}

                                            {/* <Redirect from="/" to={'/'} /> */}
                                        </Switch>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdminLayout;
