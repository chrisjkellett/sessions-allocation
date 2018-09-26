import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import constructSessionState from '../../store/constructors/sessions';


class Sessions extends Component{
  state = {
    session: constructSessionState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  render(){  
    return (
      <section>
        Sessions
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));