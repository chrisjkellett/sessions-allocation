import  React, {Component} from 'react';
import VenuesForm from './components/VenuesForm/VenuesForm';
import AddNewBtn from '../../components/Btns/AddNewBtn/AddNewBtn';
import VenuesTable from './components/VenuesTable/VenuesTable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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

  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  handlers = {
    submit: (event, props) => {
      const { venue } = this.state;
      const { selectedVenue, token } = this.props;
      event.preventDefault();
      this.initialiseValidation();
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

    fetchRecord: (selected) => {
      const { venue } = this.state;
      this.setState({ venue: distributeValuesForEditing(venue, selected) })
    }
  }

  render(){
    const { venue, shouldValidate, showForm, isConfirming } = this.state;
    const { venues, selectedVenue } = this.props;
    const { clearSelectedVenue } = this.props;
    const { handlers } = this;
    return (
       <section>
          <VenuesTable data={venues} handlers={handlers} isConfirming={isConfirming} showForm={showForm} />
          <AddNewBtn showForm={showForm} openForm={handlers.openForm} label={'venue'} />
          {showForm && 
            <VenuesForm 
              handlers={handlers} 
              values={venue} 
              shouldValidate={shouldValidate} 
              selectedVenue={selectedVenue} 
              clearSelectedVenue={clearSelectedVenue} />
          }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    venues: state.venue.venues,
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venues));