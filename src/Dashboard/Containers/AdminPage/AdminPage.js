import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Nav from '../Nav/Nav';
import Header from '../Header/Header'
import DataTable from '../DataTable/DataTable'
import * as classes from './AdminPage.module.css'
import { withFirebase } from '../../../common/Firebase'


const AdminPage = (props) => {
    console.log('page', props);
    return (
        <div className={classes.page}>
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
                                onKeyUp={(e) => props.searchHandler(e)} />
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
        </div>
    )
}

export default withFirebase(AdminPage)