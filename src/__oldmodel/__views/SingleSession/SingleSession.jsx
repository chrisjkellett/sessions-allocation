import {Component} from 'react';
import {connect} from 'react-redux';
import {renderUL} from './renders/';

class SingleExaminer extends Component{
  render(){
    return renderUL(this.props);
  }
}

const mapStateToProps = state => {
  return{
    session: state.sess.selectedSession,
    examiners: state.ex.examiners
  }
}


export default connect(mapStateToProps)(SingleExaminer);