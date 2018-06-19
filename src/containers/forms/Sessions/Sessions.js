import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';
import {updateDateArray, updateState, getSelectedOptions, 
  updateOptionArray, checkFormValidity, generateObjectForSubmitForm, 
  backToView, updateSimpleState} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {renderUI} from './renders';
import * as routes from '../../../store/app-data/routes';

class AddSessions extends Component{
  state = {
    session: constructSessionsState(),
    shouldValidate: false
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

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.session});
    const session = generateObjectForSubmitForm(this.state.session);
    console.log(isValid);
    
    // if(isValid && !this.props.examinerForEditing){
    //   this.props.addExaminer(examiner);
    //   backToView(this.props.history, routes.EXAMINERS);
    // }

    // if(isValid && this.props.examinerForEditing){
    //   this.props.updateExaminer(examiner, this.props.examinerForEditing.id);
    //   backToView(this.props.history, routes.EXAMINERS);
    // }
  }

  cancelHandler = () => {
    backToView(this.props.history, routes.SESSIONS);
  }

  initialiseValidation = () => {
    this.setState(updateSimpleState(this.state, {shouldValidate: true}));
  }

  render(){
    return renderUI(
      {...this.state}, 
      this.changeHandler, 
      this.props.examiners, 
      this.submitHandler, 
      this.cancelHandler
    );
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners
  }
}

export default withRouter(connect(mapStateToProps)(AddSessions));