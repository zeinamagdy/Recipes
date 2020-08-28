import *  as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START,

    }
}
export const fetchProductsSuccess = data => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: data,
    }
}
export const addProductSuccess = (data) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product: data,

    }

}
export const updateUnitScuccess = (id, product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        id: id,
        product: product,

    }
}
export const deleteProductScuccess = id => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        id: id
    }

}


export const fetchProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    }
}
export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE
    }
}
export const fetchProducts = (token, userId) => {
    return dispatch => {
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        const queryParams = '?auth=' + token
        axios.get('/products.json' + queryParams)
            .then(response => {
                let fetchedDtata = []
                for (let key in response.data) {
                    fetchedDtata.push({ ...response.data[key], id: key })
                }
                dispatch(fetchProductsSuccess(fetchedDtata))

            }).catch(error => {
                dispatch(fetchProductsFail(error))
            })
    }

}
export const addProduct = (product, token, userId) => {
    return dispatch => {
        axios.post('/products.json?auth=' + token, product)
            .then(response => {
                dispatch(addProductSuccess(product))
            })
            .catch(err => {
                dispatch(fetchProductsFail(err))
            })

    }
}
export const updateProduct = (product, token, userId) => {
    return dispatch => {
        axios.put('/products/' + product.id + '.json?auth=' + token, product)
            .then(response => {
                console.log(response)
                dispatch(updateUnitScuccess(product.id, product))
            })
    }
}

export const deleteProduct = (id, token) => {
    return dispatch => {
        axios.delete('/products/' + id + '.json?auth=' + token)
            .then(response => {
                console.log('del', response)
                dispatch(deleteProductScuccess(id))
            }).catch((error => {
                console.log('error', error)
            }))
    }
}

export const clearPopUp = () => {
    return dispatch => {
        dispatch(clearMessage())
    }
}