import * as actions from '../actions/actionTypes'

const intialState = {
    products: [],
    loading: true,
    message: ''

}

const productsReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: [...action.products], loading: false, message: '' }
        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.concat(action.product),
                loading: false,
                message: "Added Product successfully"
            }
        case actions.UPDATE_PRODUCT_SUCCESS:
            const updatedproduct = state.products.map(obj =>
                obj.id === action.product.id ? { ...action.product } : obj
            );
            return {
                ...state,
                products: updatedproduct,
                loading: false,
                message: "Upadted Product successfully"
            }
        case actions.DELETE_PRODUCT_SUCCESS:
            const newList = state.products.filter(obj =>
                obj.id !== action.id)
            return { ...state, products: newList, loading: false, message: "Deleted Product successfully" }
        case actions.CLEAR_MESSAGE:
            return { ...state, message: '' }
        default:
            return state
    }
}

export default productsReducer;
