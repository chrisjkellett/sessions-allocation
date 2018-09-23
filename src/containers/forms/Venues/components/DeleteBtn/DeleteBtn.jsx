import React from 'react';
import classes from './DeleteBtn.css';

const DeleteBtn = ({ deleteHandler, confirmPrompt, name }) => {
  return (
    <div className={classes.ConfirmDeletePanel} id="delete-btn-panel">
      <span className={classes.SmallBtn} onClick={deleteHandler}>delete</span>
      {confirmPrompt && (
        <div className={classes.ConfirmAction}>
          <div>confirm delete of<span className={classes.Bold}>{name}</span></div>
          <div>
            <span className={classes.SmallBtn}>confirm | cancel</span>
          </div>
        </div>
        )
      }
    </div>

  );
};

export default DeleteBtn;