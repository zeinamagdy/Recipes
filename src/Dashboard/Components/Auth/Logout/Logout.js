import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../../store/actions'


const Logout = props => {
    const { logout } = props
    useEffect(() => {
        logout()
    }, [logout])

    return (<Redirect to='/' />)
}


const dispatchMapToProps = dispatch => {
    return {
        logout: () => { dispatch(actions.logout()) }
    }
}

export default connect(null, dispatchMapToProps)(Logout)