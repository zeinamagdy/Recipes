import React, { useState, useEffect, Fragment } from 'react'
import { withFirebase } from '../Firebase'
import AdminPage from '../../containers/AdminPage/AdminPage'
import Spinner from '../UI/spinner/spinner'



const Users = (props) => {
    const [users, setUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const searchField = 'username'
    useEffect(() => {
        props.firebase.users().once('value', snapshot => {
            const usersObject = snapshot.val();
            if (usersObject !== null) {
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                    id: key,
                }));
                setUsers(usersList)
            } else {
                setUsers([])
            }

        })
    }, [props.firebase])

    const searchHandler = (e) => {
        setSearchInput(e.target.value)
    }
    let page = <Spinner />
    page = users.length === 0 ? <Spinner /> :
        <AdminPage
            title='Users'
            data={users}
            searchField={searchField}
            searchInput={searchInput}
            searchHandler={searchHandler}
            header={Object.keys(users[0]).filter(item => item !== 'id')} />
    return (
        <Fragment> {page}</Fragment>
    )

}

export default withFirebase(Users)