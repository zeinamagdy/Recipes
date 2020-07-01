import React from 'react';
import * as classes from './Header.module.css'
import { faEnvelope, faSearch, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom'
import logo from '../../logo.svg'
import * as Routes from '../../constants/routes'

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.header_left}>
                <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
                <FontAwesomeIcon icon={faBell} className={classes.icon} />
                <NavLink to={Routes.LOGOUT}>
                    <FontAwesomeIcon icon={faSignOutAlt} className={classes.icon} />
                </NavLink>
            </div>
            <div className={classes.header_right}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className="search">
                    <input type="text" className={classes.search__input} placeholder="Search for ...." />
                    <FontAwesomeIcon icon={faSearch} className={classes.iconColor} />
                </div>
            </div>
        </header>
    )
}

export default Header