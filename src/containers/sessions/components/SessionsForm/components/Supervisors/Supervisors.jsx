import React, { Component } from 'react';
import classes from './Supervisors.css';

class Supervisors extends Component {
  state = {
    toPair: null,
    examiners: [],
  }

  componentDidMount(){
    console.log(this.props.examiners);
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

  change = (index) => {
  
  }

  render(){
    const {examiners, toPair} = this.state;
    return (
      <div className={classes.Supervisors}>
        {examiners === null ? 'loading' : 
          examiners.map((item, index) => 
            <span 
              className={toPair && item.name === toPair.name ? classes.Selected : classes.Single} 
              key={item.name} 
              onClick={() => this.change(index)}>
              {item.name}
            </span>
        )}   
      </div>
    )
  }

}

export default Supervisors;