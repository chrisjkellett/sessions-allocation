import React, { Component } from 'react';
import classes from './DeleteBtn.css';

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

  render(){
    const { handlers, name } = this.props;
    const { confirmPrompt } = this.state;
    const { confirm, cancelConfirm } = this;

    return (
      <div className={classes.ConfirmDeletePanel} id="delete-btn-panel">
        <span className={classes.SmallBtn} onClick={confirm}>delete</span>
        {confirmPrompt && (
          <div className={classes.ConfirmAction}>
            <div>confirm delete of<span className={classes.Bold}>{name}</span></div>
            <div>
              <span>
                <span className={classes.SmallBtn} onClick={handlers.delete}>confirm</span>
                <span> | </span>
                <span className={classes.SmallBtn} onClick={cancelConfirm}>cancel</span>
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