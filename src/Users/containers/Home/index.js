import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../../store/actions'
import Nav from '../../common/Nav'
import Card from '../../../common/UI/Card'
import * as classes from './Home.module.css'
import data from '../../../data.json'


const Home = (props) => {
    // useEffect(() => {
    //     props.getAllRecipes()
    // }, [props])

    console.log('recipes', data.recipes);
    let cards = []


    cards = data.recipes.map(item =>
        <Card key={item.id}
            title={item.title}
            image={item.image}
            summary={item.summary}
            url={item.spoonacularSourceUrl}
            steps={item.analyzedInstructions[0].steps} />
    )
    return (
        <Fragment>
            <Nav />
            <div className={classes.main}>
                {props.recipes.map(item =>
                    <Card
                        key={item.extendedIngredients[0].id}
                        title={item.title}
                        image={item.image}
                        summary={item.summary}
                        steps={item.instructions} />
                )}

                {cards}
            </div>

        </Fragment>)
}
const dispatchMapToProps = dispatch => {
    return {
        getAllRecipes: () => dispatch(fetchRecipes())
    }
}
const dispatchStateToProps = state => {
    return {
        recipes: state.recipesReducer.recipes
    }
}

export default connect(dispatchStateToProps, dispatchMapToProps)(Home)