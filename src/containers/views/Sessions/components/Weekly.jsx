import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from '../Sessions.css';
// import {handlePeriodSelect} from '../../../store/actions/periods';

export class UnconnectedWeekly extends Component{
  state = {
    showOptions: false
  }

  openOptions = () => {
    this.setState({ showOptions: true });
  }

  closeOptions = () => {
    this.setState({ showOptions: false });
  }


  render(){
    const { openOptions, closeOptions } = this;
    const { showOptions } = this.state;
    const { weeks } = this.props;
    
    return weeks !== null ? (
      <section className={classes.SplitWeekly}>
        { weeks.length <= 1 || (weeks.length > 1 && showOptions)
          ? null
          : <span id="split-btn" className={classes.SmallLink} onClick={openOptions}>split weekly</span>
        }

        { weeks.length > 1 && showOptions 
          ? (<span id="weeks-filter-panel">
              {weeks.map(week => <span key="week" className={classes.SmallLink}>{week}</span>)}
              <span id="close-options-btn" className={classes.CloseFilter} onClick={closeOptions}>✖</span>
            </span>) 
          : null
          }
      </section>
    ) : null
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(UnconnectedWeekly);