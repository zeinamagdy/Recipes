import React, { useEffect, useState, Fragment } from 'react'
import { fetchProducts } from '../../store/actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Nav from '../../containers/Nav/Nav';
import Header from '../../containers/Header/Header'
import DataTable from '../../containers/DataTable/DataTable'
import * as classes from './products.module.css'

const Products = (props) => {
    const { getAllProducts } = props
    const title = 'Products'
    const [searchInput, setSearchInput] = useState('')
    useEffect(() => {
        getAllProducts(props.token, props.userId)

    }, [getAllProducts, props.token, props.userId])

    const header = ['Name', 'Price', 'Quantity']

    const searchHandler = (e) => {
        console.log('value', e.target.value)
        setSearchInput(e.target.value)
    }
    return (
        <Fragment>
            <Nav />
            <div className="main">
                <Header />
                <div className={classes.content}>
                    <div className={classes.content_header}>
                        <div className={classes.content_title}>
                            {title}
                        </div>
                        <div className={classes.content_search}>
                            <input
                                type='text'
                                className={classes.content_search_input}
                                placeholder='Search in products...'
                                onChange={(e) => searchHandler(e)} />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                    <DataTable
                        items={props.products}
                        searchKeyword={searchInput}
                        tableHeader={header}
                        data='products' />
                </div>
            </div>
        </Fragment>
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
export default connect(stateToProps, dispatchToProps)(Products)