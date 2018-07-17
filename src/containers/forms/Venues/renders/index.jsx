import React from 'react';
import classes from '../Venues.css';
import {data} from './data';
import Table from '../../../../components/FormElements/Table/Table';
import {renderTableContent} from './sub-renders';
import {venueTableHeaders} from '../../../../store/app-data/table-headers';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  return(
    <section className={classes.Venues}>
      <div className={classes.Box}>
        <Table labels={venueTableHeaders}>
          {renderTableContent(data)}
        </Table>
      </div>

      <div className={classes.Box}>Venues Form</div>
    </section>
  )
}