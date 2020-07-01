import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '../Modal/Modal'
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classes from './DataTable.module.css'
import * as actions from '../../store/actions'


let [delUnit] = []
const DataTable = props => {
    const [openForm, setOpenForm] = useState(false)
    const [actionFlag, setActionFlag] = useState('');
    const [unitData, setUnitData] = useState({})
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items);
        switch (props.data) {
            case 'products':
                [delUnit] = [actions.deleteProduct, actions.fetchProducts]
                break
            default:
                break

        }
        if (props.searchKeyword !== '') {
            const newItems = items.filter(item =>
                item.name.includes(props.searchKeyword))
            console.log('newList', newItems)
            setItems(newItems);
        }
    }, [props.items, props.searchKeyword, props.data]);


    const addUnitHandler = () => {
        setOpenForm(true)
        setUnitData({})
        setActionFlag('add')
    }

    const updateUnitHandler = (unit) => {
        setOpenForm(true)
        setUnitData(unit)
        setActionFlag('update')
    }
    const header = props.tableHeader.map(item =>
        <TableCell align="center" key={item}>{item}</TableCell>
    )

    console.log("items", items)

    return (
        <div className={classes.dataTable_container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {header}
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell align="center">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center" >
                                    {product.price}
                                </TableCell>
                                <TableCell align="center">
                                    {product.quantity}
                                </TableCell>
                                <TableCell align="center" component="th" scope="product">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={classes.table_iconDel}
                                        onClick={() => props.deleteUnit(product.id, props.token)} />
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className={classes.table_iconEdit}
                                        onClick={() => updateUnitHandler(product)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <button className={classes.table_addBtn} onClick={() => addUnitHandler()}>
                    Add new
                </button>
            </div>
            {openForm ?
                <Modal
                    action={actionFlag}
                    unit={unitData}
                    data={props.data}
                    fields={Object.keys(props.products[0])}
                    onClose={() => setOpenForm(false)} />
                : null}
        </div>
    );
}


const dispatchToProps = dispatch => {
    return {
        deleteUnit: (id, token) => { dispatch(delUnit(id, token)) }
    }
}

const stateToProps = state => {
    return {
        products: state.productsReducer.products,
        loading: state.productsReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
export default connect(stateToProps, dispatchToProps)(DataTable)