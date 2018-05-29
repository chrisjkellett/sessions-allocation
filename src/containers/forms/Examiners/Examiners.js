import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {
  updateState, 
  capsFirstLetters, 
  getSelectedOptions, 
  updateOptionArray, 
  checkValidity, 
  generateFormElementArray} from './utility';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState()
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    
    if(validation.length === 0){
      this.props.addExaminer(this.state);
      this.props.history.push({
        pathname: '/'
      })
    }else{
      this.setState({
        ...this.state,
        validation: validation
      })
    }
  }


  changeHandler = (event, type, id) => {
    switch(type){
      case 'select':
        this.setState(updateState(this.state, id, {value: getSelectedOptions(event)}))
        break;

      case 'checkbox':
        this.setState(updateState(this.state, id, {value: updateOptionArray([...this.state.examiner[id].value], event)}))  
        break;

      default:
        this.setState(updateState(this.state, id, {value: capsFirstLetters(event.target.value)}));  
    }
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
          change={(event) => this.changeHandler(event, element.config.elementType, element.id)}/>
      )
    })

    return(
      <form className={classes.Examiners} onSubmit={(event) => this.submitHandler(event, checkValidity(this.state))}>
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