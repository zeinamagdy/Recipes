import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import * as classes from './Form.module.css'
import { addUnit, updateUnit } from '../../store/actions';

const Form = (props) => {
    const [task, setTask] = useState({})
    const name_ar = useRef();
    const name_en = useRef();
    const description_ar = useRef();
    const description_en = useRef();

    const actionUnitHandler = () => {
        const newTask = {
            "name_en": name_en.current.value,
            "name_ar": name_ar.current.value,
            "description_en": description_en.current.value,
            "description_ar": description_ar.current.value,
            "is_publish": "1",
            "parent_id": "0"
        }
        setTask(newTask)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (props.action === 'add') {
            props.addUnit(task);
        } else if (props.action === 'update') {
            const updatedTask = { ...task, id: props.unit.id }
            props.updateUnit(updatedTask)
        }
        props.onSubmit();
    }

    return (
        <div className={classes.form_container}>
            <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
                <input
                    type='text'
                    className={classes.form_input}
                    placeholder='اسم الوحده باللغه العربية'
                    ref={name_ar}
                    defaultValue={props.unit.name_ar} />
                <input
                    type='text'
                    className={classes.form_input}
                    placeholder='اسم الوحده باللغه الانجليزية'
                    ref={name_en}
                    defaultValue={props.unit.name_en} />
                <textarea
                    type='text'
                    className={classes.form_input}
                    placeholder='وصف الوحدة باللغة العربية'
                    ref={description_ar}
                    defaultValue={props.unit.description_ar} />
                <textarea
                    type='text'
                    className={classes.form_input}
                    placeholder='وصف الوحدة باللغة الانجليزية'
                    ref={description_en}
                    defaultValue={props.unit.description_en} />
                {props.action === 'add' ?
                    <button
                        className={classes.form_addBtn}
                        onClick={actionUnitHandler}>
                        اضافه وحدة جديدة</button> :
                    <button
                        className={classes.form_addBtn}
                        onClick={actionUnitHandler}>
                        تعديل الوحدة
                </button>
                }
            </form>
        </div>
    )
}


const dispatchToProps = dispatch => {
    return {
        addUnit: (unit) => { dispatch(addUnit(unit)) },
        updateUnit: (unit) => { dispatch(updateUnit(unit)) }
    }
}
export default connect(null, dispatchToProps)(Form)