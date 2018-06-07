import {Component} from 'react';
import {connect} from 'react-redux';
import {renderUL} from './renders/renders';

class SingleExaminer extends Component{
  render(){
    return renderUL(this.props.examiner);
  }
}

const mapStateToProps = state => {
  return{
    examiner: state.selectedExaminer
  }
}


export default connect(mapStateToProps)(SingleExaminer);