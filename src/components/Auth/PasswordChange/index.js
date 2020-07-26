import React, { useState } from 'react'
import { withFirebase } from '../../Firebase'
import Button from '../../UI/Button/Button'
import * as classes from '../Auth.module.css'


const PasswordChange = (props) => {
    const intialSate = {
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };
    const [passwordState, setPasswordState] = useState(intialSate)
    const isInvalid = passwordState.passwordTwo === passwordState.passwordOne;

    const onSubmit = event => {
        props.firebase
            .doPasswordUpdate(passwordState.passwordOne)
            .then(() => {
                setPasswordState(intialSate);
            })
            .catch(error => {
                this.setState({ error });
            });

    }
    const onChange = event => {
        setPasswordState({ ...passwordState, [event.target.name]: event.target.value });
    };

    return (
        <div className={classes.auth}>
            <form onSubmit={(e) => onSubmit(e)} className={classes.auth_form}>
                <input
                    name="passwordOne"
                    className={classes.auth_input}
                    value={passwordState.passwordOne}
                    onChange={(e) => onChange(e)}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="passwordTwo"
                    className={classes.auth_input}
                    value={passwordState.passwordTwo}
                    onChange={(e) => onChange(e)}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <Button btnType="primary" disabled={isInvalid}>
                    Reset My Password
            </Button>
                {passwordState.orderror && <p>{passwordState.orderror.message}</p>}
            </form>
        </div>)
}
export default withFirebase(PasswordChange);
