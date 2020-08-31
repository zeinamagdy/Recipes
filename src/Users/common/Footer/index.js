import React, { Component } from "react"
import Typography from '@material-ui/core/Typography'
import * as classes from './footer.module.css'


class Footer extends Component {
    render() {
        return (
            <div className={classes.footer}>
                <Typography variant="title">Footer</Typography>
            </div>
        );
    }
}

export default Footer;