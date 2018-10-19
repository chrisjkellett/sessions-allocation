import React, { Component } from 'react';
import classes from './Supervisors.css';

class Supervisors extends Component {
  state = {
    selected: [],
    examiners: [],
  }

  componentDidMount(){
    this.setState({
      examiners: this.props.examiners
    })
  }

  componentDidUpdate(){
    if(this.props.examiners.length !== this.state.examiners.length){
       this.setState({
        examiners: this.props.examiners
      })
    }
  }

  change = (item, index) => {
    const { examiners } = this.state;
    item.supervisor = item.supervisor ? false : true;
    examiners[index] = item;

    this.setState({ 
      examiners: examiners
    })

    this.props.handler(examiners);
  }

  render(){
    const {examiners} = this.state;
    return (
      <div className={classes.Supervisors}>
        {examiners === null ? 'loading' : 
          examiners.map((item, index) => 
            <span 
              className={item.supervisor ? classes.Selected : classes.Single} 
              key={item.name} 
              onClick={() => this.change(item, index)}>
              {item.name}
            </span>
        )}   
      </div>
    )
  }

}

export default Supervisors;