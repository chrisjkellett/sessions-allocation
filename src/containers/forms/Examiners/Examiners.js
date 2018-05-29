import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import Select from '../../../components/FormElements/Select/Select';
import Checkbox from '../../../components/FormElements/Checkbox/Checkbox';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {capitaliseFirstLetter, getSelectedOptions, updateOptionArray, validationHandler, checkValidity} from './utility';
import {roleKeys, levelKeys, availabilityKeys} from '../../../store/data';

class Examiners extends Component {
  state = {
    name: '',
    roles: [],
    id_number: '',
    levels: [],
    availability: [],
    validation: null
  }

  inputHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: capitaliseFirstLetter(event.target.value)
    })
  }

  selectHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: getSelectedOptions(event)
    })
  }

  checkBoxHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: updateOptionArray([...this.state[id]], event)
    })
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


  render(){
    const isVisible = this.state.roles.includes('Speaking Examiner');
    return(
      <form className={classes.Examiners} onSubmit={(event) => this.submitHandler(event, checkValidity(this.state))}>
        <Input 
          id='NAME' 
          value={this.state.name} 
          handler={this.inputHandler} 
          validation={validationHandler(this.state.validation, 'NAME')} />

        <Select 
          id='ROLES' 
          options={roleKeys} 
          handler={this.selectHandler} 
          validation={validationHandler(this.state.validation, 'ROLES')}
          multiple />

        <Input 
          id='ID_NUMBER' 
          value={this.state.id_number} 
          handler={this.inputHandler} visible={isVisible}/>

        <Checkbox 
          id='LEVELS' 
          value={this.state.levels} 
          options={levelKeys} 
          handler={this.checkBoxHandler} 
          visible={isVisible}/>

        <Select 
          id='AVAILABILITY' 
          options={availabilityKeys} 
          handler={this.selectHandler} 
          validation={validationHandler(this.state.validation, 'AVAILABILITY')} 
          multiple />

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