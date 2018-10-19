import React, { Component } from 'react';
import classes from './Supervisors.css';

class Supervisors extends Component {
  state = {
    toPair: null,
    examiners: null,
  }

  componentDidMount(){
    console.log(this.props.examiners);
    this.setState({
      examiners: this.props.examiners
    })
  }

  change = (index) => {
  
  }

  render(){
    const {examiners, toPair} = this.state;
    return (
      <div>
        {examiners === null ? 'loading' : 
          examiners.map((item, index) => 
            <div key={index} id={index} className={classes.ExaminerPair}>
              <span 
                className={toPair && item.name === toPair.name ? classes.Selected : classes.Single} 
                key={item.name} 
                onClick={() => this.change(index)}>
                {item.name}
              </span>
            </div>
        )}   
      </div>
    )
  }

}

export default Supervisors;