import *  as actionTypes from './actionTypes';
import Firebase from '../../components/Firebase'

export const fetchUserssStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START,

    }
}
export const fetchUsersSuccess = data => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: data
    }
}
export const updateUserSuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        user: data
    }
}
// not used
export const fetchUsers = () => {
    console.log('fetch users', Firebase)
    return dispatch => {
        Firebase.users().once('value', snapshot => {
            const usersObject = snapshot.val();
            console.log('userObject', snapshot)
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            console.log('users', usersList)
            dispatch(fetchUsersSuccess(usersList))

        })
    }
}
// not used
export const updateUser = (data, userId) => {
    console.log('update user in action', Firebase)
    return dispatch => {
        Firebase.users()
        .child(userId)
        .update(data)
        .then(() => Firebase.users().once('value'))
        .then(snapshot => {
            snapshot.val()
            console.log('update', snapshot.val())
            dispatch(updateUserSuccess(data))

        })
        .catch(error => ({
            errorCode: error.code,
            errorMessage: error.message
        }));
    }

}
