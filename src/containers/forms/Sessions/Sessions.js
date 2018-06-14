import React, {Component} from 'react';
import classes from './Sessions.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';

class AddSessions extends Component{
  state = {
    session: constructSessionsState()
  }

  render(){
    return(
      <section className={classes.AddSessions}>
        <p>Sessions add</p>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners
  }
}

export default withRouter(connect(mapStateToProps)(AddSessions));