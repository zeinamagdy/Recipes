import React from 'react'
import classes from './TextInput.module.css'


const TextInput = props => {
    return (
        <input
            type={props.type}
            defaultValue={props.value}
            className={[classes.form_input, classes[props.classes]].join(' ')}
            placeholder={props.placeholder}
            onChange={props.changeHandler}
            readOnly={props.readOnly} />)
}

export default TextInput;