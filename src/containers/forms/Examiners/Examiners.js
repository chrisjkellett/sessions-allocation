import React, {Component} from 'react';
import classes from './Examiners.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {updateState, updateSimpleState,getSelectedOptions, updateOptionArray, generateObjectForSubmitForm, updateDateArray, distributeValuesForEditing} from './utility';
import {renderSubmit, renderFormElements, renderGroupToolbar} from './renders';
import {checkValidity, checkFormValidity, formatInput} from './validation';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    activeGroup: 'personal',
    shouldValidate: false
  }

  componentDidMount(){ 
    if(this.props.examinerForEditing){
      const update = distributeValuesForEditing({...this.state.examiner}, {...this.props.examinerForEditing});
      this.setState(updateSimpleState({examiner: update}));
    } 
    console.log(this.props.examinerForEditing);
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.examiner});
    const examiner = generateObjectForSubmitForm(this.state.examiner);
    
    if(isValid && !this.props.examinerForEditing){
      this.props.addExaminer(examiner);
      this.props.history.push({
        pathname: '/'
      })
    }

    if(isValid && this.props.examinerForEditing){
      const id = this.props.examinerForEditing.id;
      this.props.updateExaminer(examiner, id);
      this.props.deActivateSelectedExaminer();
      this.props.history.push({
        pathname: '/'
      })
      
    }


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

  groupChangeHandler = (event, group) => {
    this.setState(updateSimpleState({activeGroup: group}))
  }

  render(){
    return(
      <form className={classes.Examiners} onSubmit={this.submitHandler}>
        {this.props.examinerForEditing ? <p>editing mode</p> : null}
        {renderGroupToolbar({...this.state}, classes, this.groupChangeHandler)}
        {renderFormElements({...this.state}, this.changeHandler)}
        {renderSubmit(this.props.examinerForEditing)}
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
    updateExaminer: (examiner, id) => dispatch(actions.updateExaminer(examiner, id)),
    deActivateSelectedExaminer: () => dispatch(actions.deActivateSelectedExaminer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));