import React, {Component} from 'react';
import classes from './Examiners.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {updateState, updateSimpleState, getSelectedOptions, updateOptionArray, 
  generateObjectForSubmitForm, updateDateArray, distributeValuesForEditing, backToView} from './utility';
import {renderBtns, renderFormElements} from './renders';
import {checkValidity, checkFormValidity, formatInput} from './validation';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    shouldValidate: false
  }

  componentDidMount(){ 
    if(this.props.examinerForEditing){
      const update = distributeValuesForEditing({...this.state.examiner}, {...this.props.examinerForEditing});
      this.setState(updateSimpleState({examiner: update}));
    } 
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.examiner});
    const examiner = generateObjectForSubmitForm(this.state.examiner);
    
    if(isValid && !this.props.examinerForEditing){
      this.props.addExaminer(examiner);
      backToView(this.props.history);
    }

    if(isValid && this.props.examinerForEditing){
      this.props.updateExaminer(examiner, this.props.examinerForEditing.id);
      backToView(this.props.history);
    }
  }

  cancelHandler = () => {
    backToView(this.props.history);
  }

  initialiseValidation = () => {
    this.setState(updateSimpleState(this.state, {shouldValidate: true}));
  }

  changeHandler = (event, type, id, index) => {
    if(type === 'input') this.inputHandler(event, id);
    if(type === 'select') this.selectHandler(event, id);
    if(type === 'checkbox') this.checkBoxHandler(event, id);
    if(type === 'date') this.dateHandler(event, id, index);
  }

  inputHandler = (event, id) => {
    const {value} = event.target;
    const update = updateState(this.state, id, {value: formatInput(value, id)});
    update.examiner[id].validation = checkValidity({...update.examiner[id]});
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const update = updateState(this.state, id, {value: value});
    update.examiner[id].validation = checkValidity({...update.examiner[id]});
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const copyOptions = [...this.state.examiner[id].value];
    const value = updateOptionArray(copyOptions, event);
    const update = updateState(this.state, id, {value: value});
    update.examiner[id].validation = checkValidity({...update.examiner[id]});
    this.setState(update);
  }

  dateHandler = (event, id, index) => {
    const copyArray = [...this.state.examiner[id].value];
    const value = updateDateArray(copyArray, event, index)
    const update = updateState(this.state, id, {value: value})
    update.examiner[id].validation = checkValidity({...update.examiner[id]});
    this.setState(update);
  }

  render(){
    console.log(this.state.examiner);
    return(
      <form className={classes.Examiners} onSubmit={this.submitHandler}>
        <div className={classes.ExaminerFlexItem}>
          {renderFormElements({...this.state}, this.changeHandler, 'personal + roles')}
        </div>
        <div className={classes.ExaminerFlexItem}>
          {renderFormElements({...this.state}, this.changeHandler, 'availability + monitoring')}
          {renderBtns(this.props.examinerForEditing, this.cancelHandler, classes)}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return{
    examinerForEditing: state.selectedExaminer
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addExaminer: (examiner) => dispatch(actions.addExaminer(examiner)),
    updateExaminer: (examiner, id) => dispatch(actions.updateExaminer(examiner, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));