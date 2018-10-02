import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue, updateState } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { AddNewBtn } from '../../components/Btns/';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import SessionsTable from './components/SessionsTable/SessionsTable';
import constructSessionState from '../../store/constructors/sessions';


class Sessions extends Component{
  state = {
    session: constructSessionState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  handlers = {
    edit: (id) => {

    },

    prepareForEdit: (selected) => {

    },

    delete: (examiner) => {

    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {

    },

    change: (event, type, id, index) => {
      const { session } = this.state;
      const value = getInputValue(event, type, index, [ ...session[id].value ]);
      const update = updateState(this.state, id, { value: value, id }, 'session');
      update.session[id].validation = checkValidity({ ...update.session[id] });
      this.setState(update);
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ session: constructSessionState(), shouldValidate: false })
    },

    filter: ({ target: { value, id }}) => {
      
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }
  }

  render(){  
    const { showForm, isConfirming } = this.state;
    const { sessions } = this.props;

    return (
      <Section showForm={showForm}>
        <AsyncLoad waitFor={sessions}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.openForm} label={'session'} />
          <SessionsTable data={sessions} filtered={null} handlers={this.handlers} isConfirming={isConfirming}/>
        </AsyncLoad>
      </Section>
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