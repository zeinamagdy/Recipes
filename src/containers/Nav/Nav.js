import React from 'react';
import userImag from '../../assests/users/user.jpg'
import { NavLink } from 'react-router-dom'
import { faHome, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classes from './Nav.module.css'

const Nav = () => {
    const user = {
        user_name: 'Zeinab Mohamed',
        email: 'zainab@test.com',
        img: userImag
    }
    const navItems = [
        { name: 'Propducts', icon: faChartPie, path: '/' },
        { name: 'Users', icon: faHome, path: '/auth' }
    ]
    const items = navItems.map(item =>
        <li className={classes.side_nav__item} key={item.name}>
            <FontAwesomeIcon icon={item.icon} className={classes.margin_10} />
            <NavLink className={classes.side_nav__link} to={item.path}>
                {item.name}
            </NavLink>
        </li>)
    return (
        <nav className={classes.sidebar}>
            <div className={classes.sidebar_user}>
                <div className={classes.sidebar_user__info}>
                    <img className={classes.sidebar_user__img} src={user.img} alt='user-img' />
                    <span className={classes.sidebar_user__name}>
                        {user.user_name}
                    </span>
                </div>
            </div>
            <ul className={classes.side_nav}>
                {items}
            </ul>

        </nav >
    )

}


export default Nav