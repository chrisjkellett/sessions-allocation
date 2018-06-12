import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import {constructExaminerState} from '../../../store/constructors/examiners';
import {updateSimpleState, getSelectedOptions, updateOptionArray, 
  generateObjectForSubmitForm, updateDateArray, distributeValuesForEditing, checkDisabledFields, checkFormValidity} from './utility';
import {updateState, backToView} from '../form-utility';
import {renderUI} from './renders/';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';


class Examiners extends Component {
  state = {
    examiner: constructExaminerState(),
    shouldValidate: false
  }

  componentDidMount(){ 
    if(this.props.examinerForEditing){
      const update = distributeValuesForEditing({...this.state.examiner}, {...this.props.examinerForEditing});
      this.setState(updateSimpleState({examiner: update}));
    } 
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    this.initialiseValidation();
    const isValid = checkFormValidity({...this.state.examiner});
    const examiner = generateObjectForSubmitForm(this.state.examiner);
    
    if(isValid && !this.props.examinerForEditing){
      this.props.addExaminer(examiner);
      backToView(this.props.history);
    }

    if(isValid && this.props.examinerForEditing){
      this.props.updateExaminer(examiner, this.props.examinerForEditing.id);
      backToView(this.props.history, '/examiners');
    }
  }

  cancelHandler = () => {
    backToView(this.props.history, '/examiners');
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
    examinerForEditing: state.ex.selectedExaminer
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addExaminer: (examiner) => dispatch(actions.addExaminer(examiner)),
    updateExaminer: (examiner, id) => dispatch(actions.updateExaminer(examiner, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));