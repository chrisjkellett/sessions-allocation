import  React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VenuesForm from './components/VenuesForm/VenuesForm';
import { Btn, BtnPanelFixed, Section } from '../../components';
import VenuesTable from './components/VenuesTable/VenuesTable';
import {constructVenuesState} from '../../store/constructors/venues';
import { updateState, checkFormValidity, forSubmit, getInputValue, distributeValuesForEditing } from '../utility';
import { checkValidity } from '../../validation/validation';
import * as actions from '../../store/actions/venues/venues';


class Venues extends Component{
  constructor(props){
    super(props);
    this.handlers.escapeAll = this.handlers.escapeAll.bind(this);
  }

  state = {
    venue: constructVenuesState(),
    shouldValidate: false,
    showForm: false,
    isConfirming: false,
    activeFilter: false,
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handlers.escapeAll, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.escapeAll, false);
    this.props.clearFilters();
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
      this.setState({ venue: constructVenuesState(), shouldValidate: false })
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

    add: () => {
      this.props.fetchVenue();
      this.handlers.openForm();
    },

    edit: (id) => {
      this.props.fetchVenue(id);
      this.handlers.openForm();
    },

    filter: ({ target: {value, id}}) => {
      this.setState({ activeFilter: value.trim() !== '' ? true : false })
      this.props.filterVenue(value.trim(), id);
    },

    removeFilters: () => {
      this.setState({ activeFilter: false });
      this.props.clearFilters();
    },

    fetchRecord: (selected) => {
      const { venue } = this.state;
      this.setState({ venue: distributeValuesForEditing(venue, selected) })
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    },

    escapeAll: (e) => {
      if(e.keyCode === 27) {
        this.state.showForm && this.handlers.cancel();
        // this.props.filteredVenues !== null && this.handlers.removeFilters();
      }
      else if(e.keyCode === 78 && e.shiftKey) {
        e.preventDefault();
        !this.state.showForm ? this.handlers.add() : this.handlers.cancel();
      }
    },
  }

  render(){
    const { venue, shouldValidate, showForm, isConfirming, activeFilter } = this.state;
    const { venues, selectedVenue, filtered } = this.props;
    const { clearSelectedVenue } = this.props;
    const { handlers } = this;
    return (
       <Section overlay={showForm}>
          <VenuesTable 
            data={venues} 
            activeFilter={activeFilter}
            filtered={filtered} 
            handlers={handlers} 
            isConfirming={isConfirming} 
            showForm={showForm} />
          <BtnPanelFixed hidden={showForm}>
            <Btn handler={this.handlers.add} label={'add new venue'} />
          </BtnPanelFixed>
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
    clearFilters: () => dispatch(actions.clearFilters()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venues));