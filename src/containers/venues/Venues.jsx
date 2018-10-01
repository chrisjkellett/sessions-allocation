import  React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VenuesForm from './components/VenuesForm/VenuesForm';
import AddNewBtn from '../../components/Btns/AddNewBtn/AddNewBtn';
import VenuesTable from './components/VenuesTable/VenuesTable';
import { Section } from '../../components/Wrappers';
import {constructVenuesState} from '../../store/constructors/venues';
import { updateState, checkFormValidity, forSubmit, getInputValue, distributeValuesForEditing } from '../utility';
import { checkValidity } from '../../validation/validation';
import * as actions from '../../store/actions/venues/venues';


class Venues extends Component{
  state = {
    venue: constructVenuesState(),
    shouldValidate: false,
    showForm: false,
    isConfirming: false
  }

  handlers = {
    submit: (event, props) => {
      const { venue } = this.state;
      const { selectedVenue, token } = this.props;
      event.preventDefault();
      this.handlers.validate();
      const venueForDB = forSubmit(venue);
      
      if(checkFormValidity(venue)){
        if(selectedVenue === null)
          this.props.addVenue(venueForDB, token)
        else
          this.props.updateVenue(venueForDB, selectedVenue.id, token);
        this.handlers.closeForm();
        this.setState({ venue: constructVenuesState(), shouldValidate: false })
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

    delete: (venue) => {
      const { token } = this.props;
      this.props.deleteVenue(venue, token);
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    edit: (id) => {
      this.props.fetchVenue(id);
      this.handlers.openForm();
    },

    filter: ({ target: {value, id}}) => {
      this.props.filterVenue(value, id);
    },

    fetchRecord: (selected) => {
      const { venue } = this.state;
      this.setState({ venue: distributeValuesForEditing(venue, selected) })
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }
  }

  render(){
    const { venue, shouldValidate, showForm, isConfirming } = this.state;
    const { venues, selectedVenue, filtered } = this.props;
    const { clearSelectedVenue } = this.props;
    const { handlers } = this;
    return (
       <Section showForm={showForm}>
          <VenuesTable data={venues} filtered={filtered} handlers={handlers} isConfirming={isConfirming} showForm={showForm} />
          <AddNewBtn showForm={showForm} openForm={handlers.openForm} label={'venue'} />
          {showForm && 
            <VenuesForm 
              handlers={handlers} 
              values={venue} 
              shouldValidate={shouldValidate} 
              selectedVenue={selectedVenue} 
              clearSelectedVenue={clearSelectedVenue} />
          }
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    venues: state.venue.venues,
    filtered: state.venue.filteredVenues,
    selectedVenue: state.venue.selectedVenue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVenue: (venue, token) => dispatch(actions.addVenue(venue, token)),
    updateVenue: (venue, id, token) => dispatch(actions.updateVenue(venue, id, token)),
    deleteVenue: (venue, token) => dispatch(actions.deleteVenue(venue, token)),
    fetchVenue: (id) => dispatch(actions.fetchVenue(id)),
    clearSelectedVenue: () => dispatch(actions.clearSelectedVenue()),
    filterVenue: (value, filterBy) => dispatch(actions.filterVenue(value, filterBy)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venues));