import * as React from 'react';
import { useSelector } from 'react-redux';
import DEMO from '../../../../../../store/constant';
import NavItem from '../NavItem';
import NavBadge from './../NavBadge';
import NavIcon from './../NavIcon';
import LoopNavCollapse from './index';
const NavCollapse = (props) => {
    const layout = useSelector((state) => state.able.layout);

    let navItems = '';
    if (props.collapse.children) {
        const collapses = props.collapse.children;
        navItems = Object.keys(collapses).map((key) => {
            const item = collapses[parseInt(key)];
            switch (item.type) {
                case 'collapse':
                    return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
                case 'item':
                    return <NavItem layout={layout} key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }
    let itemTitle = props.collapse.title;
    if (props.collapse.icon) {
        itemTitle = <span className="pcoded-mtext">{props.collapse.title}</span>;
    }
    let navLinkClass = ['nav-link'];
    let navItemClass = ['nav-item', 'pcoded-hasmenu'];

    const currentIndex = document.location.pathname
        .toString()
        .split('/')
        .findIndex((id) => id === props.collapse.id);
    if (currentIndex > -1) {
        navItemClass = [...navItemClass, 'active'];
        if (layout !== 'horizontal') {
            navLinkClass = [...navLinkClass, 'active'];
        }
    }
    const subContent = (
        <>
            <a href={DEMO.BLANK_LINK} className={navLinkClass.join(' ')}>
                <NavIcon items={props.collapse} />
                {itemTitle}
                <NavBadge layout={layout} items={props.collapse} />
            </a>
            <ul className="pcoded-submenu">{navItems}</ul>
        </>
    );

    return (
        <>
            <li className={navItemClass.join(' ')}>{subContent}</li>
        </>
    );
};
export default NavCollapse;
