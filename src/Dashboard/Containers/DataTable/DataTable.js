import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '../Modal/Modal'
import * as classes from './DataTable.module.css'
import * as actions from '../../../store/actions'


import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'






let [delUnit] = []
const DataTable = props => {
    const [openForm, setOpenForm] = useState(false)
    const [actionFlag, setActionFlag] = useState('');
    const [unitData, setUnitData] = useState({})
    const [items, setItems] = useState(props.items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);


    useEffect(() => {
        setItems(props.items);
        switch (props.data) {
            case 'Products':
                [delUnit] = [actions.deleteProduct, actions.fetchProducts]
                break
            case 'Users':
                break
            default:
                break

        }
        if (props.searchKeyword !== '') {
            const newItems = items.filter(item =>
                item[props.searchField].includes(props.searchKeyword))
            setItems(newItems);
        }
    }, [props.items, props.searchKeyword, props.data, items, props.searchField]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
        <TableCell
            style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            align="center"
            key={item}>
            {item}
        </TableCell>
    )

    const tableBody = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item =>
        <TableRow key={item.id}>
            {props.tableHeader.map(el =>
                <TableCell align="center" key={el} >
                    {item[el]}
                </TableCell>
            )
            }
            <TableCell align="center" component="th" scope="product">
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        onClick={() => props.deleteUnit(item.id, props.token)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton aria-label="Edit" onClick={() => updateUnitHandler(item)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow >
    )
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
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <TablePagination
                    rowsPerPageOptions={[4, 8, 12]}
                    component="div"
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <button className={classes.table_addBtn} onClick={() => addUnitHandler()}>
                    Add new
                </button>
            </div>
            {openForm ?
                <Modal
                    action={actionFlag}
                    unit={unitData}
                    data={props.data}
                    fields={props.formFields}
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