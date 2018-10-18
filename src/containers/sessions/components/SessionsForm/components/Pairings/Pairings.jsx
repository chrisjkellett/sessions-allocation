import React, { Component } from 'react';
import classes from './Pairings.css';

class Pairings extends Component {
  state = {
    toPair: null,
    examiners: null,
  }

  componentDidMount(){
    this.setState({
      examiners: this.props.examiners
    })
  }

  change = (index) => {
    const { toPair, examiners} = this.state;
    if(toPair === null){
      this.setState({ toPair: examiners[index]})
    }
  }

  render(){
    const {examiners, toPair} = this.state;
    return (
      examiners === null ? 'loading' : 
        examiners.map((item, index) => index % 2 === 0 && 
          <div key={index} id={index} className={classes.ExaminerPair}>
            <span 
              className={toPair && item.name === toPair.name ? classes.Selected : classes.Single} 
              key={item.name} 
              onClick={() => this.change(index)}>
              {item.name}
            </span>
            <span>+</span>
            <span 
              className={toPair && examiners[index + 1] === toPair.name ? classes.Selected : classes.Single} 
              key={examiners[index + 1]} 
              onClick={() => this.change(index + 1)}>
              {examiners[index + 1].name}
            </span>
          </div>
      )
    )
  }

}

export default Pairings;