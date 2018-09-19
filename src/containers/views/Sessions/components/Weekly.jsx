import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from '../Sessions.css';
// import {handlePeriodSelect} from '../../../store/actions/periods';

class Sessions extends Component{
  state = {
    showOptions: false
  }

  toggleOptions = () => {
    this.setState((prev) => ({showOptions: prev.showOptions ? false : true}));
  }

  render(){
    const { toggleOptions } = this;
    const { showOptions } = this.state;
    const { weeks } = this.props;
    return weeks !== null ? (
      <section className={classes.SplitWeekly}>
        {!showOptions && weeks.length > 1
          ? <span className={classes.SmallLink} onClick={toggleOptions}>split weekly</span>
          : null 
        }
      </section>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    weeks: state.per.weeks
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));