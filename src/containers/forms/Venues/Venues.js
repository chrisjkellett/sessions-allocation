import  React, {Component} from 'react';
import Form from './components/Form/Form';
import classes from './Venues.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructVenuesState} from '../../../store/constructors/venues';
import { updateState, checkFormValidity, forSubmit } from '../form-utility';
import { getInputValue } from '../form-utility';
import {checkValidity} from '../validation/validation';
import * as actions from '../../../store/actions/venues/venues';

class Venues extends Component{
  state = {
    venue: constructVenuesState(),
    shouldValidate: false
  }
  
  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  handlers = {
    submit: (event, props) => {
      const { venue } = this.state;
      event.preventDefault();
      this.initialiseValidation();
      const venueForDB = forSubmit(venue);
      
      if(checkFormValidity(venue)){
        const {addVenue, token} = this.props;
        addVenue(venueForDB, token);
      }
    },
  
    cancel: () => {
      this.props.history.goBack();
    },

    change: (event, type, id) => {
      const value = getInputValue(event, type);
      const formType = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: value, id}, formType);
      update[formType][id].validation = checkValidity({...update[formType][id]});
      this.setState(update);
    }
  }


  render(){
    const { venue, shouldValidate } = this.state;
    const { handlers } = this;
    return (
       <section className={classes.Venues}>
        <div className={classes.Box}>
          <Form handlers={handlers} values={venue} shouldValidate={shouldValidate} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVenue: (venue, token) => dispatch(actions.addVenue(venue, token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venues));