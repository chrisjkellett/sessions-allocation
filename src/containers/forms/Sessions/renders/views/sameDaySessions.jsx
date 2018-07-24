import React from 'react';
import Table from '../../../../../components/FormElements/Table/Table';
import classes from '../../../../css/views.css';
import {calculateDate} from './../utility';
import {renderSameDaySessions} from './../sub-renders';
import availCSS from '../availability.css'

export const renderSameDaySessionsTable = (state, sameDaySessions) => {
  return(
    <div className={classes.BoxWithMaxHeight}>
      <p>Other sessions on <span className={availCSS.Bolder}>{calculateDate(state)}</span>
        <span className={availCSS.Count}>{sameDaySessions.length}</span>
      </p>
      <Table labels={['venue', 'time', 'level', 'examiners', 'support']}>
        {renderSameDaySessions(sameDaySessions)}
      </Table>
    </div>
  )
}