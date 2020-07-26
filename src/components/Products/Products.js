import React, { useEffect, useState, Fragment } from 'react'
import { fetchProducts } from '../../store/actions'
import { connect } from 'react-redux'
import AdminPage from '../../containers/AdminPage/AdminPage'
import Spinner from '../UI/spinner/spinner'
import { withFirebase } from '../Firebase'


const Products = (props) => {
    const { getAllProducts } = props
    const title = 'Products'
    const [searchInput, setSearchInput] = useState('')
    const searchField = 'name'
    useEffect(() => {
        getAllProducts(props.token, props.userId)
    }, [getAllProducts, props.token, props.userId])


    const searchHandler = (e) => {
        setSearchInput(e.target.value)
    }
    let page = <Spinner />
    page = props.products.length === 0 ? <Spinner /> :
        <AdminPage
            title={title}
            data={props.products}
            searchField={searchField}
            searchInput={searchInput}
            searchHandler={searchHandler}
            formFeilds={Object.keys(props.products[0]).filter(item => item !== 'id')}
            header={Object.keys(props.products[0]).filter(item => item !== 'id' && item !== 'photo')}
        />
    return (
        <Fragment>{page}</Fragment>


    )

}
const dispatchToProps = dispatch => {
    return {
        getAllProducts: (tokenId, userId) => { dispatch(fetchProducts(tokenId, userId)) }
    }
}

const stateToProps = state => {
    return {
        products: state.productsReducer.products,
        loading: state.productsReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}
export default withFirebase(connect(stateToProps, dispatchToProps)(Products))