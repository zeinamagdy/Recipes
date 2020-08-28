import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../../../../common/Firebase'
import Button from '../../../../common/UI/Button/Button'
import * as Routes from '../../../../common/constants/routes'
import * as classes from '../Auth.module.css'


const PasswordForget = (props) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const isInvalid = email === '';

    const onSubmit = event => {
        event.preventDefault();
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('')
                props.history.push(Routes.ADMIN)
            })
            .catch(error => {
                setError(error);
            });
    };

    const onChange = event => {
        setEmail(event.target.value)
    };

    return (
        <div className={classes.auth}>
            <form onSubmit={(e) => onSubmit(e)} className={classes.auth_form} style={{ 'align-items': 'center' }}>
                <input
                    name="email"
                    className={classes.auth_input}
                    value={email}
                    onChange={(e) => onChange(e)}
                    type="text"
                    placeholder="Email Address"
                />
                <Button btnType="primary" disabled={isInvalid}>Reset Password</Button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withFirebase(PasswordForget)
export const PasswordForgetLink = () => (
    <p>
        <Link to={Routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);
