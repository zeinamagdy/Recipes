import React, { useEffect, useState, Fragment } from 'react'
import { fetchProducts, clearPopUp } from '../../../store/actions'
import { connect } from 'react-redux'
import AdminPage from '../../Containers/AdminPage/AdminPage'
import Spinner from '../../../common/UI/spinner/spinner'
import { withFirebase } from '../../../common/Firebase'
// import Message from '../../../common/UI/Message/Message'


const Products = (props) => {
    const { getAllProducts } = props
    const title = 'Products'
    const [searchInput, setSearchInput] = useState('')
    const searchField = 'name'
    const autoDurationMessage = '1000'

    useEffect(() => {
        getAllProducts(props.token, props.userId)
    }, [getAllProducts, props.token, props.userId])

    const searchHandler = (e) => {
        console.log('search', e.target.value);
        // setSearchInput(e.target.value)
       
    }
    setTimeout(() => {
        props.clearPopUp()
    }, autoDurationMessage);
    let page = <Spinner />
    // console.log('props.products', props.products);
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
        <Fragment>
            {page}
            {/* {props.message !== "" ? */}
                {/* <Message
                    message={props.message}
                    type="success"
                    autoDuration={autoDurationMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
                : null} */}
        </Fragment>



    )

}
const dispatchToProps = dispatch => {
    return {
        getAllProducts: (tokenId, userId) =>
            dispatch(fetchProducts(tokenId, userId)),
        clearPopUp: () => dispatch(clearPopUp())
    }
}


const stateToProps = state => {
    return {
        products: state.productsReducer.products,
        loading: state.productsReducer.loading,
        message: state.productsReducer.message,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}
export default withFirebase(connect(stateToProps, dispatchToProps)(Products))