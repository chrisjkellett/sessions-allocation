import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import Select from '../../../components/FormElements/Select/Select';
import Checkbox from '../../../components/FormElements/Checkbox/Checkbox';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {capitaliseFirstLetter, getSelectedOptions, updateOptionArray} from './utility';
import {roleKeys, levelKeys, availabilityKeys} from '../../../store/data';

class Examiners extends Component {
  state = {
    name: '',
    roles: ['Speaking Examiner'],
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

  checkValidity = () => {
    let isValid = [];

    if(this.state.name.trim().length === 0)
      isValid.push({id: 'name', error: 'this is a compulsory field'})

    if(this.state.availability.length === 0)
      isValid.push({id: 'availability', error: 'this is a compulsory field'})
    
    return isValid;  
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    
    if(validation.length === 0){
      this.props.addExaminer(this.state);
      this.props.history.push({
        pathname: '/'
      })
    }else{
      console.log(validation);
      this.setState({
        ...this.state,
        validation: validation
      })
    }
  }


  render(){
    const isVisible = this.state.roles.includes('Speaking Examiner');
    return(
      <form className={classes.Examiners} onSubmit={(event) => this.submitHandler(event, this.checkValidity())}>
        <Input id='NAME' value={this.state.name} handler={this.inputHandler} valid={this.state.validation}/>
        <Select id='ROLES' options={roleKeys} handler={this.selectHandler} multiple />
        <Input id='ID_NUMBER' value={this.state.id_number} handler={this.inputHandler} visible={isVisible}/>
        <Checkbox id='LEVELS' value={this.state.levels} options={levelKeys} handler={this.checkBoxHandler} visible={isVisible}/>
        <Select id='AVAILABILITY' options={availabilityKeys} handler={this.selectHandler} valid={this.state.validation} multiple />
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