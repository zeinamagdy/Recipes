import React from 'react';
import userImag from '../../assests/users/user.jpg'
import { faHome, faChartPie, faBriefcaseMedical, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classes from './Nav.module.css'

const Nav = () => {
   
    return (
        <nav className={classes.sidebar}>
            <div className={classes.sidebar_user}>
                <div className={classes.sidebar_user__info}>
                    <span className={classes.sidebar_user__name}>
                        محمود الحسيني
                    </span>
                    <span className={classes.sidebar_user__mail}>
                        test@gmail.com
                    </span>
                </div>
                <img className={classes.sidebar_user__img} src={userImag} alt='user-img' />
            </div>
            <ul className={classes.side_nav}>
                <li className={classes.side_nav__item}>
                    <span className={classes.side_nav__link}>
                        التقاير والاحصاييات
                        <FontAwesomeIcon icon={faChartPie} className={classes.margin_10} />
                    </span>
                </li>
                <li className={classes.side_nav__item}>
                    <span className={classes.side_nav__link}>
                        ادارة الصيدليات
                        <FontAwesomeIcon icon={faBriefcaseMedical} className={classes.margin_10} />
                    </span>
                </li>
                <li className={classes.side_nav__item}>
                    <span className={classes.side_nav__link}>
                        الشركات
                        <FontAwesomeIcon icon={faBuilding} className={classes.margin_10} />
                    </span>
                </li>
                <li className={classes.side_nav__item}>
                    <span className={classes.side_nav__link}>
                        الدول والمدن
                        <FontAwesomeIcon icon={faHome} className={classes.margin_10} />
                    </span>
                </li>
            </ul>

        </nav >
    )

}


export default Nav