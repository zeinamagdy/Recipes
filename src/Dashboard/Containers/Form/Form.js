import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as classes from './Form.module.css'
import * as actions from '../../../store/actions'
import ImgUploader from '../../../common/UI/ImgUploader/ImgUploader'
import { withFirebase } from '../../../common/Firebase'

let [addUnit, updateUnit] = []
const Form = (props) => {
    const [unit, setUnit] = useState({})
    const [img, setImg] = useState([])
    let updatedItems = {}
    useEffect(() => {
        switch (props.data) {
            case 'Products':
                [addUnit, updateUnit] = [actions.addProduct, actions.updateProduct]
                break
            case 'Uers':
                console.log('users edit and update');
                break;
            default:
                break

        }
        if (props.unit.photo !== '')
            props.firebase.getImg(props.unit['photo'])
                .then(url => {
                    setImg([url])
                }).catch(err => {
                    console.log('error', err)
                })
    }, [props.unit.photo, props.data, props.unit, props.firebase])
    const onUploadImg = (event) => {
        let img = event[0]
        let imgName = 'products_' + props.userId + '_' + Date.now()
        let blob = img.slice(0, img.size, 'image/jpg');
        let newImg = new File([blob], imgName, { type: 'image/jpg' });
        updatedItems['photo'] = imgName
        props.firebase.imgUpload(newImg)

    }
    const changeHandler = (e, feild) => {
        updatedItems[feild] = e.target.value
    }

    let formControls = []
    console.log('unit', props.unit)
    if (Object.keys(props.unit).length !== 0) {
        for (let [key, value] of Object.entries(props.unit)) {
            if (key !== 'id')
                if (key === 'photo') {
                    formControls.push(<ImgUploader key={key} uplodHandler={onUploadImg} src={img} />)
                } else {
                    formControls.push(<input
                        type='text'
                        key={key}
                        className={classes.form_input}
                        placeholder={key}
                        defaultValue={value}
                        onChange={(e) => changeHandler(e, key)} />)
                }
        }
    } else {
        for (let i = 0; i < props.fields.length; i++) {
            updatedItems[props.fields[i]] = ''
        }
        for (let key of Object.keys(updatedItems)) {
            if (key === 'photo') {
                formControls.push(<ImgUploader uplodHandler={onUploadImg} />)
            } else {
                formControls.push(
                    <input
                        type='text'
                        key={key}
                        placeholder={key}
                        className={classes.form_input}
                        onChange={(e) => changeHandler(e, key)} />

                )
            }
        }
    }

    const actionUnitHandler = () => {
        setUnit(updatedItems)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (props.action === 'add') {
            props.addUnit(unit, props.token, props.userId)
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
                        Edit
                </button>
                }
            </form>
        </div>
    )
}


const dispatchToProps = (dispatch) => {
    return {
        addUnit: (unit, token, userId) => { dispatch(addUnit(unit, token, userId)) },
        updateUnit: (unit, token) => { dispatch(updateUnit(unit, token)) }
    }
}
const stateMaptoProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
export default withFirebase(connect(stateMaptoProps, dispatchToProps)(Form))