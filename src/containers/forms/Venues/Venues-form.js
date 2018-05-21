import React, { Component } from 'react';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import classes from './Venues-form.css';
import {connect} from 'react-redux';
import {locationOptions} from '../../../store/data';

class Venues extends Component {
  state = {
    name: {
      type: 'text',
      id: 'name',
      value: ''
    },

    address: {
      type: 'text',
      id: 'address',
      value: ''
    },

    location: {
      type: 'select',
      id: 'location',
      'value': locationOptions[0]
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

  render(){
    return(
      <div className={classes.Venues}>
        <p>Venue app</p>
        <Input type={this.state.name.type} id={this.state.name.id} value={this.state.name.value} handler={this.inputHandler} />
        <Input type={this.state.address.type} id={this.state.address.id} value={this.state.address.value} handler={this.inputHandler} />
        <Select id={this.state.location.id} handler={this.inputHandler} options={locationOptions} />
        <button>Submit</button>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.name 
  }
}

export default connect(mapStateToProps)(Venues);