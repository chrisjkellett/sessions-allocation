import {Component} from 'react';
import {connect} from 'react-redux';
import {renderUL} from './renders/renders';

class SingleExaminer extends Component{
  render(){
    const {sessions, examiner} = this.props;
    return renderUL(examiner, sessions);
  }
}

const mapStateToProps = state => {
  return{
    examiner: state.ex.selectedExaminer,
    sessions: state.sess.sessions
  }
}


export default connect(mapStateToProps)(SingleExaminer);