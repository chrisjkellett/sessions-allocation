import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';
import {updateDateArray, updateState, getSelectedOptions, 
  updateOptionArray, checkFormValidity, generateObjectForSubmitForm, 
  backToView, updateSimpleState, distributeValuesForEditing} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {renderUI} from './renders';
import * as routes from '../../../store/app-data/routes';
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
    const session = generateObjectForSubmitForm(this.state.session);
    
    if(isValid && !this.props.sessionForEditing){
      const updated = [...this.props.sessions, Object.assign({}, session)];
      console.log(updated);
      this.props.addSession(session);
      backToView(this.props.history, routes.SESSIONS);
    }

    if(isValid && this.props.sessionForEditing){
      const {sessionForEditing, sessions} = this.props;
      const updated = [...sessions.filter(item => item.id !== sessionForEditing.id), Object.assign({}, session)];
      console.log(updated);
      this.props.updateSession(session, sessionForEditing.id);
      backToView(this.props.history, routes.SESSIONS);
    }
  }

  cancelHandler = () => {
    backToView(this.props.history, routes.SESSIONS);
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
    sessions: state.sess.sessions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSession: (session) => dispatch(actions.addSession(session)),
    updateSession: (session, id, counter) => dispatch(actions.updateSession(session, id, counter))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSessions));