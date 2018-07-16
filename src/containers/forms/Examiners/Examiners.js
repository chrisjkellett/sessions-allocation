import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {updateState, distributeValuesForEditing, updateSimpleState, getSelectedOptions, updateOptionArray, 
  forSubmit, updateDateArray, checkDisabledFields, checkFormValidity} from '../form-utility';
import {renderUI} from './renders/';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    shouldValidate: false
  }

  componentDidMount(){ 
    if(this.props.exEdit){
      const update = distributeValuesForEditing({...this.state.examiner}, {...this.props.exEdit});
      this.setState(updateSimpleState({examiner: update}));
    } 
  }

  submitHandler = (event) => {
    const {examiner} = this.state;
    const {exEdit, updateExaminer, addExaminer, history, token} = this.props;
    const data = forSubmit(examiner);
    event.preventDefault();
    this.initialiseValidation();

    if (checkFormValidity(examiner)) {
      exEdit ? updateExaminer(data, exEdit.id, token) : addExaminer(data, token);
      history.goBack();
    }
    
  }

  cancelHandler = () => {
   this.props.history.goBack();
  }

  initialiseValidation = () => {
    this.setState(updateSimpleState(this.state, {shouldValidate: true}));
  }

  changeHandler = (event, type, id, index) => {
    if(type === 'input') this.inputHandler(event, id);
    if(type === 'select') this.selectHandler(event, id);
    if(type === 'checkbox') this.checkBoxHandler(event, id);
    if(type === 'date') this.dateHandler(event, id, index);
  }

  inputHandler = (event, id) => {
    const {value} = event.target;
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: formatInput(value, id)}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  selectHandler = (event, id) => {
    const value = getSelectedOptions(event);
    const type = Object.keys({...this.state})[0];
    const examiner = checkDisabledFields({...this.state.examiner}, value);
    this.setState({examiner: examiner});
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  checkBoxHandler = (event, id) => {
    const copyOptions = [...this.state.examiner[id].value];
    const value = updateOptionArray(copyOptions, event);
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: value}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  dateHandler = (event, id, index) => {
    const copyArray = [...this.state.examiner[id].value];
    const value = updateDateArray(copyArray, event, index);
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: value}, type)
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  render(){
    return renderUI(this.props, this.state, this.changeHandler, this.cancelHandler, this.submitHandler);
  }
}

const mapStateToProps = state => {
  return{
    exEdit: state.ex.selectedExaminer,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateExaminer: (examiner, id, token) => dispatch(actions.updateExaminer(examiner, id, token)),
    addExaminer: (user, token) => dispatch(actions.addExaminer(user, token)) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));