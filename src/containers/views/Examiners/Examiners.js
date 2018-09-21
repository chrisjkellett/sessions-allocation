import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners/examiners';
import classes from './Examiners.css';
import {formatURL} from '../../../gen-utility';
import {renderTableContent} from './renders/';
import {renderFilterBtn} from './renders/sub-renders';
import Table from '../../../components/FormElements/Table/Table';
import FilterBy from './components/FilterBy/FilterBy';

class Examiners extends Component{
  state = {
    showFilters: false
  }

  componentDidMount(){
    this.props.deActivateSelectedExaminer();
    this.props.filterByName('');
  }


  handleEdit = (examiner) =>{
    this.props.fetchExaminer(examiner);
    this.props.history.push('/examiners/edit/' + formatURL(examiner.name));
  }

  handleDelete = (examiner) => {
    const {token, deleteExaminer} = this.props;
    deleteExaminer(examiner, token)
  }

  handleLink = (examiner) => {
    this.props.fetchExaminer(examiner);
    this.props.history.push('/examiners/' + formatURL(examiner.name));
  }

  handlers = {
    toggleFilters: () => {
      this.setState(prev => ({
        showFilters: prev.showFilters ? false : true
      }));
    },

    filter: (event) => {
      this.props.filterByName(event.target.value);
    }
  }

  render(){
    const {showFilters} = this.state;
    const { filter } = this.handlers; 
    return (
      <section className={classes.Examiners}>
        <Table labels={showFilters 
          ? [<FilterBy label={'examiner name'} filter={filter} />, 'availability', 'levels', renderFilterBtn(showFilters, this.handlers)] 
          : ['examiner name', 'availability', 'levels', renderFilterBtn(showFilters, this.handlers)]} >
          {renderTableContent(this.props, this.handleDelete, this.handleEdit, this.handleLink)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    filteredExaminers: state.ex.filteredExaminers,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999',
    user: state.auth.session_user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchExaminer: (id) => dispatch(actions.fetchExaminer(id)),
    deleteExaminer: (examiner, token) => dispatch(actions.deleteExaminer(examiner, token)),
    deActivateSelectedExaminer: () => dispatch(actions.deActivateSelectedExaminer()),
    filterByName: (string) => dispatch(actions.filterExaminerByName(string))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));