import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderError} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';

class Sessions extends Component{
  render(){
    console.log(this.props.errors);
    return (
      <section className={classes.Sessions}>
        {renderError(this.props.errors)}
        <Table labels={sessionTableHeaders}>
          {renderTableContent(this.props.sessions)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    errors: state.sess.error
  }
}

export default withRouter(connect(mapStateToProps)(Sessions));