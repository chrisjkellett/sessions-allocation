import React, {Component} from 'react';
import classes from './Examiners.css';
import Input from '../../../components/FormElements/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import {capitaliseFirstLetter, getSelectedOptions, updateOptionArray, checkValidity} from './utility';
import {roleKeys} from '../../../store/data';

class Examiners extends Component {
  state = {
    examiner: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: ''
      },

      roles: {
        elementType: 'select',
        elementConfig: {
          multiple: true
        },
        options: roleKeys,
        value: ''
      }
    }
    
  }

  inputHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: capitaliseFirstLetter(event.target.value)
    })
  }

  selectHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: getSelectedOptions(event)
    })
  }

  checkBoxHandler = (event, id) => {
    this.setState({
      ...this.state,
      [id]: updateOptionArray([...this.state[id]], event)
    })
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    
    if(validation.length === 0){
      this.props.addExaminer(this.state);
      this.props.history.push({
        pathname: '/'
      })
    }else{
      this.setState({
        ...this.state,
        validation: validation
      })
    }
  }


  render(){
    let formElementArray = [];

    for(let key in this.state.examiner){
      formElementArray.push({
        id: key,
        config: this.state.examiner[key]
      })
    }

    return(
      <form className={classes.Examiners} onSubmit={(event) => this.submitHandler(event, checkValidity(this.state))}>
        {formElementArray.map(element => {
          return (
            <Input 
              key={element.id}
              label={element.id}
              options={element.config.options}
              elementtype={element.config.elementType} 
              elementConfig={element.config.elementConfig}
              value={element.config.value} />
          )
        })}
        <button>Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addExaminer: (examiner) => dispatch(actions.addExaminer(examiner))
  }
}

export default connect(null, mapDispatchToProps)(Examiners);