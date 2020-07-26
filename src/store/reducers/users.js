import * as actions from '../actions/actionTypes'

const intialState = {
    users: [],
    loading: true,

}

const user = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_SUCCESS:
            return { ...state, users: state.users.concat(action.users), loading: false }
        // case actions.ADD_USERS_SUCCESS:
        //     const newProduct = {}
        //     newProduct[action.id] = action.product
        //     return { ...state, products: state.products.concat(newProduct), loading: false }
        case actions.UPDATE_USER_SUCCESS:
            return { ...state, loading: false }
        // case actions.DELETE_PRODUCT_SUCCESS:
        //     const newList = state.products.filter(obj =>
        //         obj.id !== action.id)
        //     return { ...state, products: newList, loading: false }
        default:
            return state
    }
}

export default user;
