import React, { useEffect, useState } from 'react';
import { fetchUnits, deleteUnit } from '../../store/actions'
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

const DataTable = props => {
    const [openForm, setOpenForm] = useState(false)
    const [actionFlag, setActionFlag] = useState('');
    const [unitData, setUnitData] = useState({})
    const { getAllUnits } = props

    useEffect(() => {
        getAllUnits()
    }, [getAllUnits])

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

    return (
        <div className={classes.dataTable_container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">الاجراء</TableCell>
                            <TableCell align="center">وصف الوحدة</TableCell>
                            <TableCell align="center">اسم الوحده باللغه الانجليزية</TableCell>
                            <TableCell align="center">اسم الوحده باللغة العربية</TableCell>
                            <TableCell align="center">كود الوحدة</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.units.map((unit) => (
                            <TableRow key={unit.id}>
                                <TableCell align="center" component="th" scope="unit">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={classes.table_iconDel}
                                        onClick={() => props.deleteUnit(unit.id)} />
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className={classes.table_iconEdit}
                                        onClick={() => updateUnitHandler(unit)} />
                                </TableCell>
                                <TableCell align="center">
                                    {unit.description_ar}
                                </TableCell>
                                <TableCell align="center" >
                                    {unit.name_en}
                                </TableCell>
                                <TableCell align="center">
                                    {unit.name_ar}
                                </TableCell>
                                <TableCell align="center">
                                    #{unit.id}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <button className={classes.table_addBtn} onClick={() => addUnitHandler()}>
                    اضافة وحدة جديدة
                </button>
            </div>
            {openForm ? <Modal action={actionFlag} unit={unitData} onClose={()=> setOpenForm(false)} /> : null}
        </div>
    );
}


const dispatchToProps = dispatch => {
    return {
        getAllUnits: () => { dispatch(fetchUnits()) },
        deleteUnit: (unitId) => { dispatch(deleteUnit(unitId)) }
    }
}
const stateToProps = state => {
    return {
        units: state.unitsReducer.units
    }
}
export default connect(stateToProps, dispatchToProps)(DataTable)