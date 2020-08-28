import { axiosRecipes } from '../../axios'
import * as  actions from './actionTypes'

export const fetchRecipesStart = () => {
    return {
        type: actions.FETCH_RECIPES_START

    }
}
export const fetchRecipesSuccess = data => {
    return {
        type: actions.FETCH_RECIPES_SUCCESS,
        recipes: data,
    }
}
export const fetchRecipes = () => {
    return dispatch => {
        axiosRecipes.get('/recipes/random?number=10&apiKey=e28c48f263864a188b20c6a5ebd96433')
            .then(response => {
                console.log('respose recipes', response.data.recipes);
                dispatch(fetchRecipesSuccess(response.data.recipes))
                
            }).catch(error => {
                console.log('error recipes', error);
            })
    }

}