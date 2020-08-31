import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../../store/actions'
import TabPanel from '../../common/Tabs'
import Card from '../../../common/UI/Card'
import Footer from '../../common/Footer'
import data from '../../../data.json'



const Home = (props) => {
    // useEffect(() => {
    //     props.getAllRecipes()
    // }, [props])
    const dataLength = 91
    const dataCount = dataLength % 9 === 0 ? dataLength / 9 : Math.floor(dataLength / 9) + 1;
    const itemsPerPage = data.recipes.length
    console.log('recipes with paginagtion', data.recipes);
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
            <TabPanel tab1={cards} itemsPerPage={itemsPerPage} count={dataCount} />
            <Footer />
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