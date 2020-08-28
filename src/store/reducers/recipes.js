import * as actions from '../actions/actionTypes'


const intialState = {
    recipes: [],
    loading: true
}

const recipesReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_RECIPES_SUCCESS:
            console.log('reducer',{ ...state, recipes: action.recipes, loading: false });
            return { ...state, recipes: action.recipes, loading: false }
        default:
            return intialState
    }

}

export default recipesReducer