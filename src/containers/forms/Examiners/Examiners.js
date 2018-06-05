import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {
  updateState, 
  updateSimpleState,
  getSelectedOptions, 
  updateOptionArray, 
  generateFormElementArray,
  generateObjectForSubmitForm,
  updateDateArray,
  showHiddenFields, 
  generateGroups,
  generateGroupClasses
} from './utility';
import {checkValidity, checkFormValidity, formatInput} from './validation';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    activeGroup: 'personal',
    shouldValidate: false
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.examiner});
    if(isValid){
      this.props.addExaminer(generateObjectForSubmitForm(this.state.examiner));
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
    const value = event.target.value;
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

  groupChange = (event, group) => {
    this.setState(updateSimpleState({activeGroup: group}))
  }

  render(){
    const formElements = generateFormElementArray(this.state.examiner).map(element => {
      return (
        <Input 
          key={element.id}
          label={element.id}
          options={element.config.options}
          elementtype={element.config.elementType} 
          elementConfig={element.config.elementConfig}
          value={element.config.value} 
          hide={element.config.hide}
          activeGroup={this.state.activeGroup}
          group={element.config.group}
          showHidden={showHiddenFields(this.state.examiner)}
          valid={element.config.validation.valid}
          shouldValidate={this.state.shouldValidate}
          change={(event, index) => this.changeHandler(event, element.config.elementType, element.id, index)}/>
      )
    })

    const groupToolbar = generateGroups(this.state.examiner).map(group =>(
      <span 
        key={group} 
        className={generateGroupClasses(classes, group, this.state.activeGroup)} 
        onClick={(event) => this.groupChange(event, group)}>{group}
      </span>
    ))

    return(
      <form className={classes.Examiners} onSubmit={this.submitHandler}>
        {groupToolbar}
        {formElements}
        <button>Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addExaminer: (examiner) => dispatch(actions.addExaminer(examiner)),
    isEditing: (id) => dispatch(actions.isEditing(id))
  }
}

export default connect(null, mapDispatchToProps)(Examiners);