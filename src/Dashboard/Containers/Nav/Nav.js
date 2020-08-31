import React, { useEffect, useState } from 'react';
import defaultUserImg from '../../../assests/users/user.png'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { withFirebase } from '../../../common/Firebase'
import { faHome, faChartPie, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as classes from './Nav.module.css'

const Nav = props => {
    const [user, setUser] = useState({})
    const [img, setImg] = useState(defaultUserImg)
    let history = useHistory();

    useEffect(() => {
        props.firebase.user(props.userId).once('value', snapshot => {
            const userObject = snapshot.val();
            setUser(userObject)
            let img = userObject.img
            props.firebase.getImg(img).then(url => {
                setImg(url)
            })
        });
    }, [props.userId, props.firebase])
    const updateUSer = () => {
        history.push({ pathname: '/profile', state: { userInfo: user } })
    }
    const navItems = [
        { name: 'Products', icon: faChartPie, path: '/' },
        { name: 'Users', icon: faHome, path: '/users' },
        {name:'Charts', icon: faHome,path:'/charts'}
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
                    <img className={classes.sidebar_user__img} src={img} alt='user-img' />
                    <span className={classes.sidebar_user__name}>
                        {user.username}
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            className={classes.side_nav__edit_icon}
                            onClick={updateUSer} />
                    </span>

                </div>
            </div>
            <ul className={classes.side_nav}>
                {items}
            </ul>

        </nav >
    )
}
const stateMapToProps = state => {
    return {
        userId: state.authReducer.userId,

    }
}

export default withFirebase(connect(stateMapToProps)(Nav))