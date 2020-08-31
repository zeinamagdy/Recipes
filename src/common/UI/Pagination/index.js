import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function PagePagination(props) {
    const classes = useStyles();
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        console.log('change page', value);
        setPage(value);
    };
    return (
        <div className={classes.root}>
            <Pagination
                color="primary"
                page={page}
                onChange={handleChange}
                count={props.count}
            />
        </div>
    );
}