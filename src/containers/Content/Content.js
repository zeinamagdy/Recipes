import React from 'react';
import * as classes from './Content.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from '../DataTable/DataTable'


const Content = () => {
    return (
        <div className={classes.content}>
            <div className={classes.content_header}>
                <div className={classes.content_search}>
                    <input type='text' className={classes.content_search_input} />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className={classes.content_title}>
                    الوحدات
                </div>
            </div>
            <div>
                <DataTable />
            </div>
        </div>
    )
}
export default Content