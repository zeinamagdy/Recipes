import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from '../Form/Form'

const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SimpleModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);

    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Form action={props.action} unit={props.unit} />
        </div>
    );

    return (
        <div>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description" >
                {body}
            </Modal>
        </div>
    );
}
export default SimpleModal