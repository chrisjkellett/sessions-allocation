import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {capitaliseFirstLetter} from './utility';

class Examiners extends Component {
  state = {
    name: ''
  }

  inputHandler = (event, id) => {
    this.setState({
      [id]: capitaliseFirstLetter(event.target.value)
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
        <Input id='name' value={this.state.name.value} handler={this.inputHandler}/>
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