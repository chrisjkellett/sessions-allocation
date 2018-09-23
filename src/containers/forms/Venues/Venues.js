import  React, {Component} from 'react';
import Form from './components/Form/Form';
import AddNewBtn from './components/AddNewBtn/AddNewBtn';
import VenuesTable from './components/VenuesTable/VenuesTable';
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
    shouldValidate: false,
    showForm: false,
    confirmPrompt: false
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
        this.handlers.closeForm();
        this.setState({ venue: constructVenuesState() })
      }
    },
  
    cancel: () => {
      this.handlers.closeForm();
      this.setState({ venue: constructVenuesState() })
    },

    change: (event, type, id) => {
      const value = getInputValue(event, type);
      const formType = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: value, id}, formType);
      update[formType][id].validation = checkValidity({...update[formType][id]});
      this.setState(update);
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    delete: () => {
      this.setState({ confirmPrompt: true });
    }
  }


  render(){
    const { venue, shouldValidate, showForm, confirmPrompt } = this.state;
    const { venues } = this.props;
    const { handlers } = this;
    return (
       <section className={classes.Venues}>
          <VenuesTable data={venues} handlers={handlers} confirmPrompt={confirmPrompt}/>
          <AddNewBtn showForm={showForm} openForm={handlers.openForm} />
          <Form handlers={handlers} values={venue} shouldValidate={shouldValidate} showForm={showForm} />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    venues: state.venue.venues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVenue: (venue, token) => dispatch(actions.addVenue(venue, token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venues));