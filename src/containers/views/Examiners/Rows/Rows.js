import React, {Component} from 'react';
import classes from './Rows.css';
import {connect} from 'react-redux';
import {renderName, renderRoles, renderLevels, renderAvailability, renderBtns} from './utility';
import BtnWithLink from '../../../../components/FormElements/Btns/BtnWithLink';
import * as actions from '../../../../store/actions/examiners';

class Rows extends Component {
  
  handleEdit = (event, name) =>{
    this.props.editModeOn();
  }

  render(){
    return(
      <tr className={classes.Row}>
        {renderName(this.props.examiner)}
        {renderRoles(this.props.examiner, classes)}
        {renderLevels(this.props.examiner, classes)}
        {renderAvailability(this.props.examiner, classes)}
        {renderBtns(this.props.examiner, classes, this.props.delete, this.handleEdit)}
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editModeOn: () => dispatch(actions.isEditing())
  }
}


export default connect(null, mapDispatchToProps)(Rows);