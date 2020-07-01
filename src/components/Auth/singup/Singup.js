import React, { useState } from 'react'
import { authSuccess } from '../../../store/actions/auth';
import { withFirebase } from '../../../components/Firebase';
import Button from '../../UI/Button/Button'
import * as Routes from '../../../constants/routes'
import * as classes from '../Auth.module.css'




const Singup = (props) => {
    const intialState = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: '',
    }
    const [controls, setControls] = useState(intialState)

    const isInvalid =
        controls.passwordOne !== controls.passwordTwo ||
        controls.passwordOne === '' ||
        controls.email === '' ||
        controls.username === '';
    console.log('isInvailid', isInvalid)
    const onChange = event => {
        setControls({ ...controls, [event.target.name]: event.target.value });
    };
    const onSubmit = event => {
        event.preventDefault();

        const { username, email, passwordOne } = controls;
        console.log('data', { username, email, passwordOne })
        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                console.log('authUser', authSuccess)
                props.history.push(Routes.ADMIN)
                setControls(intialState)
            })
            .catch(error => {
                setControls({ error })
            });


    };
    return (
        <div className={classes.auth} >
            <form onSubmit={(e) => onSubmit(e)} className={classes.auth_form} >
                <span className={classes.auth_Header}>Singup</span>
                <input
                    name="username"
                    className={classes.auth_input}
                    value={controls.username}
                    onChange={(e) => onChange(e)}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    className={classes.auth_input}
                    value={controls.email}
                    onChange={(e) => onChange(e)}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    className={classes.auth_input}
                    value={controls.passwordOne}
                    onChange={(e) => onChange(e)}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    className={classes.auth_input}
                    value={controls.passwordTwo}
                    onChange={(e) => onChange(e)}
                    type="password"
                    placeholder="Confirm Password"
                />
                {/* disabled={isInvalid} */}
                {/* <button type="submit">Sign Up</button> */}
                <Button btnType="primary">Sign Up</Button>

                {controls.error && <p>{controls.error.message}</p>}
            </form >
        </div>
    )
}

export default withFirebase(Singup)