import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card } from 'react-bootstrap';
import NavGroup from './NavGroup';
import DEMO from '../../../../../store/constant';
import { Link } from 'react-router-dom';

const NavContent = (props) => {
    const navItems = props.navigation.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} group={item} />;
            default:
                return false;
        }
    });

    return (
        <div className="navbar-content next-scroll">
            <PerfectScrollbar options={{ wheelSpeed: 2, swipeEasing: true }}>
                <ul className="nav pcoded-inner-navbar" id="nav-ps-next">
                    {navItems}
                    <li>
                        <Card className="text-center">
                            <Card.Body>
                                <i className="feather icon-sunset f-40" />
                                <h6 className="mt-3">Help?</h6>
                                <p>Please contact us on our email for need any support</p>
                                <Link to={DEMO.BLANK_LINK} rel="noopener noreferrer" className="btn btn-primary btn-sm text-white m-0">
                                    Support
                                </Link>
                            </Card.Body>
                        </Card>
                    </li>
                </ul>
            </PerfectScrollbar>
        </div>
    );
};
export default NavContent;
