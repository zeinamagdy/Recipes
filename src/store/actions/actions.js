// import *  as actionTypes from './actionsType';
// import axios from '../../axios';


// export const fetchUnitsSuccess = (unitsData) => {
//     return {
//         type: actionTypes.FETCH_UNITS_SUCCESS,
//         units: unitsData
//     }
// }
// export const unitApiFail = (error) => {
//     return {
//         type: actionTypes.UNIT_API_FAIL,
//         error: error
//     }
// }


// const callGetApi = () => { return axios.get('/units').then(response => { return response.data.data.rows }) }

// export const fetchUnits = () => {
//     return dispatch => { 
//         callGetApi()
//             .then(result => {
//                 dispatch(fetchUnitsSuccess(result))
//             }).catch(error => {
//                 dispatch(unitApiFail(error))
//             })
//     }
// }

// export const addUnit = (unit) => {
//     return dispatch => {
//         axios.post("/units/create", unit)
//             .then(() => callGetApi())
//             .then(result => {
//                 dispatch(fetchUnitsSuccess(result))
//             }).catch(error => {
//                 dispatch(unitApiFail(error))
//             })
//     }
// }

// export const updateUnit = (unit) => {
//     return dispatch => {
//         axios.put("/units/edit", {...unit, unit_id:unit.id})
//             .then(() => callGetApi())
//             .then(result => {
//                 dispatch(fetchUnitsSuccess(result))
//             }).catch(error => {
//                 dispatch(unitApiFail(error))
//             })
//     }
// }

// export const deleteUnit = (unitId) => {
//     return dispatch => {
//         axios.delete("/units/" + unitId)
//             .then(() => callGetApi())
//             .then(result => {
//                 dispatch(fetchUnitsSuccess(result))
//             }).catch(error => {
//                 dispatch(unitApiFail(error))
//             })
//     }
// }