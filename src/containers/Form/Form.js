import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as classes from './Form.module.css'

import * as actions from '../../store/actions'
let [addUnit, updateUnit] = []
const Form = (props) => {
    const [unit, setUnit] = useState({})
    let updatedItems = {}
    useEffect(() => {
        switch (props.data) {
            case 'products':
                [addUnit, updateUnit] = [actions.addProduct, actions.updateProduct]
                break
            default:
                break

        }
    })
    
    const changeHandler = (e, feild) => {
        updatedItems[feild] = e.target.value
    }
    let formControls = []

    if (Array.isArray(props.unit)) {
        formControls = props.unit.map(item =>
            <input
                type='text'
                key={item}
                className={classes.form_input}
                placeholder={item}
                onChange={(e) => changeHandler(e, item)} />
        )
    } else {
        for (let [key, value] of Object.entries(props.unit)) {
            formControls.push(<input
                type='text'
                key={key}
                className={classes.form_input}
                placeholder={key}
                defaultValue={value}
                onChange={(e) => changeHandler(e, key)} />)
        }
    }
    const actionUnitHandler = () => {
        console.log('unit', updatedItems)
        setUnit(updatedItems)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (props.action === 'add') {
            props.addUnit(unit, props.token, props.userId);
        } else if (props.action === 'update') {
            const updatedUnit = {
                ...props.unit, ...unit
            }
            props.updateUnit(updatedUnit, props.token, props.userId)
        }
        props.onSubmit();
    }

    return (
        <div className={classes.form_container}>
            <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
                {formControls}
                {props.action === 'add' ?
                    <button
                        className={classes.form_addBtn}
                        onClick={actionUnitHandler}>
                        Add New
                    </button> :
                    <button
                        className={classes.form_addBtn}
                        onClick={actionUnitHandler}>
                        Edite
                </button>
                }
            </form>
        </div>
    )
}


const dispatchToProps = (dispatch) => {
    return {
        addUnit: ( unit, token, userId) => { dispatch(addUnit( unit, token, userId)) },
        updateUnit: (unit, token) => { dispatch(updateUnit(unit, token)) }
    }
}
const stateMaptoProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
export default connect(stateMaptoProps, dispatchToProps)(Form)