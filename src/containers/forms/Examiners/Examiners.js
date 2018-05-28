import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Wrapper from '../../wrappers/Empty';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {capitaliseFirstLetter, getSelectedOptions} from './utility';
import {roleKeys, levelKeys, availabilityKeys} from '../../../store/data';

class Examiners extends Component {
  state = {
    name: '',
    roles: [],
    id_number: '',
    levels: [],
    availability: []
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.saveNewExaminer(this.state);
    this.props.history.push({
      pathname: '/'
    })
  }

  render(){
    return(
      <form className={classes.Examiners} onSubmit={this.submitHandler}>
        <Input id='NAME' value={this.state.name} handler={this.inputHandler}/>
        <Select id='ROLES' options={roleKeys} handler={this.selectHandler} multiple />
        
        {!this.state.roles.includes('Speaking Examiner') ? null :
            <Wrapper>
              <Input id='ID_NUMBER' value={this.state.id_number} handler={this.inputHandler}/>
              <Select id='LEVELS' options={levelKeys} handler={this.selectHandler} multiple />
            </Wrapper>
        }

        <Select id='AVAILABILITY' options={availabilityKeys} handler={this.selectHandler} multiple />

        <button>Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    saveNewExaminer: (examiner) => dispatch(actions.saveNewExaminer(examiner))
  }
}

export default connect(null, mapDispatchToProps)(Examiners);