import * as actions from '../actions/actionsType'

const intialState = {
    units: [],
    loading: true,

}

const uintsReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_UNITS_SUCCESS:
            return { ...state, units: action.units, loading: false }
        default:
            return state
    }
}

export default uintsReducer;
