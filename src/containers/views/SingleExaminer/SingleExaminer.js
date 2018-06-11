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
    examiner: state.ex.selectedExaminer
  }
}


export default connect(mapStateToProps)(SingleExaminer);