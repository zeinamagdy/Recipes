import * as actions from '../actions/actionTypes'

const intialState = {
    products: [],
    loading: true,

}

const productsReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: state.products.concat(action.products), loading: false }
        case actions.ADD_PRODUCT_SUCCESS:
            const newProduct = {}
            newProduct[action.id] = action.product
            return { ...state, products: state.products.concat(newProduct), loading: false }
        case actions.UPDATE_PRODUCT_SUCCESS:
            const updatedproduct = state.products.map(obj =>
                obj.id === action.product.id ? { ...action.product } : obj
            );
            return { ...state, products: updatedproduct, loading: false }
        case actions.DELETE_PRODUCT_SUCCESS:
            const newList = state.products.filter(obj =>
                obj.id !== action.id)
            return { ...state, products: newList, loading: false }
        default:
            return state
    }
}

export default productsReducer;
