import {Component} from 'react';
import {connect} from 'react-redux';
import {renderUL} from './renders/';

class SingleExaminer extends Component{
  render(){
    return renderUL(this.props.session);
  }
}

const mapStateToProps = state => {
  return{
    session: state.sess.selectedSession
  }
}


export default connect(mapStateToProps)(SingleExaminer);