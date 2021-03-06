import React, { Component } from 'react';
import classes from './DeleteBtn.css';
import moment from 'moment';

class DeleteBtn extends Component {
  state = {
    confirmPrompt: false
  }

  confirm = () => {
    const { isConfirming } = this.props;
    if(!isConfirming){
      this.setState({ confirmPrompt : true })
      this.props.handlers.toggleConfirm();
    };
  };

  cancelConfirm = () => {
    this.setState({ confirmPrompt : false });
    this.props.handlers.toggleConfirm();
  };

  confirmDelete = (data) => {
    this.props.handlers.delete(data);
    this.setState({ confirmPrompt : false });
    this.props.handlers.toggleConfirm();
  }

  render(){
    const { data } = this.props;
    const { confirmPrompt } = this.state;
    const { confirm, cancelConfirm, confirmDelete } = this;
    const message = data.name ? data.name : moment(data['session_date'], 'YYYYMMDD').format('Do MMMM');

    return (
      <div className={classes.ConfirmDeletePanel} id="delete-btn-panel">
        <span className={classes.SmallBtn} onClick={confirm}>delete</span>
        {confirmPrompt && (
          <div className={classes.ConfirmAction}>
            <div>confirm delete of <span className={classes.Bold}>{message}</span></div>
            <div>
              <span>
                <span className={[classes.SmallBtn, classes.ConfirmBtn].join(" ")} onClick={() => confirmDelete(data)}>confirm</span>
                <span> | </span>
                <span className={[classes.SmallBtn, classes.ConfirmBtn].join(" ")} onClick={cancelConfirm}>cancel</span>
              </span>
            </div>
          </div>
          )
        }
      </div>
    );
  }
};


export default DeleteBtn;