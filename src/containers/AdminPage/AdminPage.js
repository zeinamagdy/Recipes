import React, { Fragment } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Nav from '../../containers/Nav/Nav';
import Header from '../../containers/Header/Header'
import DataTable from '../../containers/DataTable/DataTable'
import * as classes from './AdminPage.module.css'
import { withFirebase } from '../../components/Firebase'


const AdminPage = (props) => {
    return (
        <Fragment>
            <Nav />
            <div className="main">
                <Header />
                <div className={classes.content}>
                    <div className={classes.content_header}>
                        <div className={classes.content_title}>
                            {props.title}
                        </div>
                        <div className={classes.content_search}>
                            <input
                                type='text'
                                className={classes.content_search_input}
                                placeholder='Search ...'
                                onChange={(e) => props.searchHandler(e)} />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                    <DataTable
                        items={props.data}
                        searchKeyword={props.searchInput}
                        searchField={props.searchField}
                        tableHeader={props.header}
                        formFields={props.formFeilds}
                        data={props.title} />
                </div>
            </div>
        </Fragment>
    )
}

export default withFirebase(AdminPage)