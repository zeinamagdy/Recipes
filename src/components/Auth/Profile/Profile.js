import React, { Fragment, useState, useEffect } from 'react'
import { withFirebase } from '../../Firebase'
import * as Routes from '../../../constants/routes'
import Nav from '../../../containers/Nav/Nav'
import TextInput from '../../UI/TextInput/TextInput'
import Button from '../../UI/Button/Button'
import classes from './Profile.module.css'
import ImgUploader from '../../UI/ImgUploader/ImgUploader'
import { connect } from 'react-redux'

// import { updateUser } from '../../../store/actions'



const Profile = props => {
    let userInfo = props.location.state.userInfo
    const [img, setImg] = useState([])
    useEffect(() => {
        if (userInfo.img !== '')
            props.firebase.getImg(userInfo.img).then(url => {
                setImg([url])
            })
    }, [userInfo.img, props.firebase])
    const changeInput = (e, type) => {
        userInfo[type] = e.target.value
    }
    // https://www.npmjs.com/package/react-images-upload
    const onUploadImg = (event) => {
        let img = event[0]
        let imgName = 'users_' + props.userId + '_' + Date.now()
        let blob = img.slice(0, img.size, 'image/jpg');
        let newImg = new File([blob], imgName, { type: 'image/jpg' });
        userInfo['img'] = imgName
        console.log('user in profile', userInfo)
        props.firebase.imgUpload(newImg)

    }

    const sumbitHandler = (e) => {
        console.log('test', userInfo);
        e.preventDefault();
        props.firebase.updateUser(props.userId, userInfo)
        props.history.push(Routes.ADMIN)
    }

    return (
        <Fragment>
            <Nav />
            <div className="main">
                <form className={classes.form} onSubmit={(e) => sumbitHandler(e)}>
                    <span>Profile</span>
                    <TextInput
                        type='text'
                        classes='width_75'
                        placeholder='User name'
                        value={props.location.state.userInfo.username}
                        changeHandler={(e, type) => changeInput(e, 'username')} />
                    <TextInput
                        type='text'
                        classes='width_75'
                        placeholder='Email'
                        value={props.location.state.userInfo.email}
                        readOnly={true}
                    />
                    <ImgUploader uplodHandler={onUploadImg} src={img} />
                    <Button btnType='primary'> Edit profile</Button>
                </form>
            </div>
        </Fragment>
    )


}
const stateMapsToProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}
// const dispatchMapToProps = dispatch => {
//     return {
//         updateProfile: (userInfo, userId) => dispatch(updateUser(userInfo, userId))
//     }
// }
export default withFirebase(connect(stateMapsToProps)(Profile))