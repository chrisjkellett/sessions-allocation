import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';
import {updateDateArray, updateState, getSelectedOptions, 
  updateOptionArray, checkFormValidity, forSubmit, updateSimpleState, distributeValuesForEditing} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {renderUI} from './renders';
import * as actions from '../../../store/actions/sessions';

class AddSessions extends Component{
  state = {
    session: constructSessionsState(),
    shouldValidate: false
  }

  componentDidMount(){ 
    if(this.props.sessionForEditing){
      const update = distributeValuesForEditing({...this.state.session}, {...this.props.sessionForEditing});
      this.setState(updateSimpleState({session: update}));
    } 
  }

  changeHandler = (event, type, id, index) => {
    if(type === 'input') this.inputHandler(event, id);
    if(type === 'select') this.selectHandler(event, id);
    if(type === 'checkbox') this.checkBoxHandler(event, id);
    if(type === 'date') this.dateHandler(event, id, index);
  }

  dateHandler = (event, id, index) => {
    const type = Object.keys({...this.state})[0];
    const copyArray = [...this.state[type][id].value];
    const value = updateDateArray(copyArray, event, index);
    const update = updateState(this.state, id, {value: value}, type)
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const type = Object.keys({...this.state})[0];
    const copyOptions = [...this.state[type][id].value];
    const value = updateOptionArray(copyOptions, event);
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const type = Object.keys({...this.state})[0];
    this.setState({session: value});
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  submitHandler = (event, props) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.session});
    const session = forSubmit(this.state.session);
    
    if(isValid && !this.props.sessionForEditing){
      const {history, addSession, token, sessions} = this.props;
      const updated = [...sessions, Object.assign({}, session)];
      addSession(updated, session, token);
      history.goBack();
    }

    if(isValid && this.props.sessionForEditing){
      const {sessionForEditing, sessions, token} = this.props;
      const {id} = sessionForEditing;
      session.id = id;
      const updated = [...sessions.filter(item => item.id !== id), Object.assign({}, session)];
      this.props.updateSession(updated, session, id, token);
      this.props.history.goBack();
    }
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  initialiseValidation = () => {
    this.setState(updateSimpleState(this.state, {shouldValidate: true}));
  }

  render(){
    return renderUI({...this.state}, this.changeHandler, this.props, this.submitHandler, this.cancelHandler);
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    sessionForEditing: state.sess.selectedSession,
    sessions: state.sess.sessions,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSession: (sessions, session, token) => dispatch(actions.addSession(sessions, session, token)),
    updateSession: (sessions, session, id, token) => dispatch(actions.updateSession(sessions, session, id, token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSessions));