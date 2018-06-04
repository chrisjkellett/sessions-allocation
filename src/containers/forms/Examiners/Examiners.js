import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {
  updateState, 
  getSelectedOptions, 
  updateOptionArray, 
  generateFormElementArray,
  generateObjectForSubmitForm,
  updateDateArray
} from './utility';
import {checkValidity} from './validation';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    validate: false
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    
    // this.props.addExaminer(generateObjectForSubmitForm(this.state.examiner));
    // this.props.history.push({
    //   pathname: '/'
    // })
  }

  initialiseValidation = () => {
    this.setState({
      ...this.state,
      validate: true
    })
  }

  changeHandler = (event, type, id, index) => {
    if(type === 'input'){
      this.inputHandler(event, id);
    } 

    if(type === 'select'){
      this.selectHandler(event, id);
    } 

    if(type === 'checkbox'){
      this.checkBoxHandler(event, id);
    } 

    if(type === 'date'){
      this.dateHandler(event, id, index);
    } 
  }

  inputHandler = (event, id) => {
    const value = event.target.value;
    const update = updateState(this.state, id, {value: value});
    update.examiner[id].validation = checkValidity({...update.examiner[id]});
    console.log(update.examiner[id].validation);
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const update = updateState(this.state, id, {value: value});
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const copyOptions = [...this.state.examiner[id].value];
    const value = updateOptionArray(copyOptions, event);
    const update = updateState(this.state, id, {value: value})
    this.setState(update);
  }

  dateHandler = (event, id, index) => {
    const copyArray = [...this.state.examiner[id].value];
    const value = updateDateArray(copyArray, event, index)
    const update = updateState(this.state, id, {value: value})
    this.setState(update);
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
          valid={element.config.validation.valid}
          change={(event, index) => this.changeHandler(event, element.config.elementType, element.id, index)}/>
      )
    })

    return(
      <form className={classes.Examiners} onSubmit={this.submitHandler}>
        {formElements}
        <button>Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addExaminer: (examiner) => dispatch(actions.addExaminer(examiner))
  }
}

export default connect(null, mapDispatchToProps)(Examiners);