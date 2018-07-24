import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';
import {updateDateArray, updateState, getSelectedOptions, 
  updateOptionArray, checkFormValidity, forSubmit, updateSimpleState, distributeValuesForEditing} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {renderUI} from './renders';
import {
  calculateAvailableExaminers, 
  calculateSameDaySessions,
  filterExaminers,
  filterSupport
} from '../../../store/actions/examiner-options/examiner-options';
import * as actions from '../../../store/actions/sessions';

class AddSessions extends Component{
  state = {
    session: constructSessionsState(),
    shouldValidate: false,
    showAllExaminers: true,
    showAllSupport: true
  }

  componentDidMount(){ 
    if(this.props.sessionForEditing){
      const update = distributeValuesForEditing({...this.state.session}, {...this.props.sessionForEditing});
      this.setState(updateSimpleState({session: update}));
    } 
    const {calculateAvailableExaminers, calculateSameDaySessions, examiners, sessions} = this.props;
    calculateAvailableExaminers(examiners, this.state.session, sessions);
    calculateSameDaySessions(sessions, this.state.session.session_date.value)
  }

  dateHandler = (event, id, index) => {
    const type = Object.keys({...this.state})[0];
    const copyArray = [...this.state[type][id].value];
    const value = updateDateArray(copyArray, event, index);
    const update = updateState(this.state, id, {value: value}, type)
    update[type][id].validation = checkValidity({...update[type][id]});
    const {calculateAvailableExaminers, calculateSameDaySessions, examiners, sessions} = this.props;
    calculateAvailableExaminers(examiners, update.session, sessions);
    calculateSameDaySessions(sessions, value)
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const type = Object.keys({...this.state})[0];
    const copyOptions = [...this.state[type][id].value];
    const value = updateOptionArray(copyOptions, event);
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    const {calculateAvailableExaminers, examiners, sessions} = this.props;
    calculateAvailableExaminers(examiners, update.session, sessions);
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const type = Object.keys({...this.state})[0];
    this.setState({session: value});
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    const {calculateAvailableExaminers, examiners, sessions} = this.props;
    calculateAvailableExaminers(examiners, update.session, sessions);
    this.setState(update);
  }

  inputHandler = ({target: {value}}, id) => {
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  handlers = {
    ex_filter: ({target: {value}}) => {
      const {filterExaminers, examiners} = this.props;
      filterExaminers(examiners, value)
    },

    supp_filter: ({target: {value}}) => {
      const {filterSupport, examiners} = this.props;
      filterSupport(examiners, value)
    },

    showHideAll: (type) => {
      this.setState(prev => ({
        [type]: prev[type] ? false : true
      }));
    },

    cancel: () => {
      this.props.history.goBack();
    },

    change: (event, type, id, index) => {
      if(type === 'input' || type === 'textarea') this.inputHandler(event, id);
      if(type === 'select') this.selectHandler(event, id);
      if(type === 'checkbox') this.checkBoxHandler(event, id);
      if(type === 'date') this.dateHandler(event, id, index);
    },

    submit: (event) => {
      event.preventDefault();
      this.initialiseValidation();
      const isValid = checkFormValidity({...this.state.session});
      const session = forSubmit(this.state.session);
      
      if(isValid && !this.props.sessionForEditing){
        const {history, addSession, token, sessions} = this.props;
        const updated = [...sessions];
        addSession(updated, session, token);
        history.goBack();
      }
  
      if(isValid && this.props.sessionForEditing){
        const {sessionForEditing, sessions, token, updateSession, history} = this.props;
        const {id} = sessionForEditing;
        session.id = id;
        const updated = [...sessions.filter(item => item.id !== id), Object.assign({}, session)];
        updateSession(updated, session, id, token);
        history.goBack();
      }
    }
  }


  initialiseValidation = () => {
    this.setState(updateSimpleState(this.state, {shouldValidate: true}));
  }

  render(){
    return renderUI({...this.state}, this.props, this.handlers);
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    sessionForEditing: state.sess.selectedSession,
    sessions: state.sess.sessions,
    token: state.auth.token,
    availableExaminers: state.op.ex_options,
    availableSupport: state.op.supp_options,
    sameDaySessions: state.op.sameDaySessions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSession: (sessions, session, token) => dispatch(actions.addSession(sessions, session, token)),
    updateSession: (sessions, session, id, token) => dispatch(actions.updateSession(sessions, session, id, token)),
    calculateAvailableExaminers: (examiners, session, sessions) => dispatch(calculateAvailableExaminers(examiners, session, sessions)),
    calculateSameDaySessions: (sessions, sessionDate) => dispatch(calculateSameDaySessions(sessions, sessionDate)),
    filterExaminers: (examiners, filterValue) => dispatch(filterExaminers(examiners, filterValue)),
    filterSupport: (support, filterValue) => dispatch(filterSupport(support, filterValue))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSessions));