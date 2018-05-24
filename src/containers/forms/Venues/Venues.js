import React, { Component } from 'react';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import classes from './Venues.css';
import {connect} from 'react-redux';
import {locationOptions, dayOptions, monthOptions, yearOptions} from '../../../store/data';
import moment from 'moment';

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
      value: locationOptions[0]
    },

    day: {
      type: 'select',
      id: 'day',
      value: moment().format('D')
    },

    month: {
      type: 'select',
      id: 'month',
      value: moment().format('MMM')
    },

    year: {
      type: 'select',
      id: 'month',
      value: moment().format('Y')
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
        <Input type={this.state.name.type} id={this.state.name.id} value={this.state.name.value} handler={this.inputHandler} />
        <Input type={this.state.address.type} id={this.state.address.id} value={this.state.address.value} handler={this.inputHandler} />
        <Select id={this.state.location.id} handler={this.inputHandler} options={locationOptions}/>
        <label>Date</label>
        <div className={classes.DateDivider}>
          <Select id={this.state.day.id} handler={this.inputHandler} value={this.state.day.value} options={dayOptions} date />
          <Select id={this.state.month.id} handler={this.inputHandler} value={this.state.month.value} options={monthOptions} date />
          <Select id={this.state.year.id} handler={this.inputHandler} value={this.state.year.value} options={yearOptions} date />
        </div>

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