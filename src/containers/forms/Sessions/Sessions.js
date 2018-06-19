import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructSessionsState} from '../../../store/constructors/sessions';
import {updateDateArray, updateState, getSelectedOptions, updateOptionArray} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {renderUI} from './renders';

class AddSessions extends Component{
  state = {
    session: constructSessionsState()
  }

  changeHandler = (event, type, id, index) => {
    if(type === 'input') this.inputHandler(event, id);
    if(type === 'select') this.selectHandler(event, id);
    if(type === 'checkbox') this.checkBoxHandler(event, id);
    if(type === 'date') this.dateHandler(event, id, index);
  }

  dateHandler = (event, id, index) => {
    const type = Object.keys({...this.state})[0];
    const copyArray = [...this.state[type][id].value];
    const value = updateDateArray(copyArray, event, index);
    const update = updateState(this.state, id, {value: value}, type)
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const type = Object.keys({...this.state})[0];
    const copyOptions = [...this.state[type][id].value];
    const value = updateOptionArray(copyOptions, event);
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const type = Object.keys({...this.state})[0];
    this.setState({session: value});
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  render(){
    return renderUI({...this.state}, this.changeHandler, this.props.examiners);
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners
  }
}

export default withRouter(connect(mapStateToProps)(AddSessions));