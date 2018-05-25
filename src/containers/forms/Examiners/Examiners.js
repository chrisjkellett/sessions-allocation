import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/Input/Input';

class Examiners extends Component {
  state = {
    name: {
      type: 'text',
      value: ''
    }
  }

  inputHandler = (event, id) => {
    this.setState({
      [id]: {
        ...this.state[id],
        value: event.target.value
      }
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log('submitting');
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

export default Examiners;