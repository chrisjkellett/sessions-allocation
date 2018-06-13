import React, {Component} from 'react';
import {renderTableContent} from './renders/';
import classes from './Sessions.css';
import Table from '../../wrappers/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';

class Sessions extends Component{
  render(){
    return (
      <section className={classes.Sessions}>
        <Table labels={sessionTableHeaders}>
          {renderTableContent([])}
        </Table>
      </section>
    )
  }
}

export default Sessions;