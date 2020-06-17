import React from 'react';
import * as classes from './Header.module.css'
import { faEnvelope, faSearch, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../../logo.svg'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header_right}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className="search">
                    <input type="text" className={classes.search__input} placeholder="ابحث" />
                    <FontAwesomeIcon icon={faSearch} className={classes.iconColor} />
                </div>
            </div>
            <div className={classes.header_left}>
                <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
                <FontAwesomeIcon icon={faBell} className={classes.icon} />
                <FontAwesomeIcon icon={faCog} className={classes.icon} />
            </div>
        </header>
    )
}

export default Header