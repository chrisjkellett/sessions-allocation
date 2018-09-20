import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from '../../Sessions.css';
import FilterPanel from './components/FilterPanel';
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
          : <span id="split-btn" className={classes.SmallLink} onClick={openOptions}>filter by week</span>
        }

        { weeks.length > 1 && showOptions 
          ? <FilterPanel weeks={weeks} closeOptions={closeOptions} /> 
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