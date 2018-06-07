import {Component} from 'react';
import {connect} from 'react-redux';
import {renderUL} from './renders';

class SingleExaminer extends Component{
  componentDidMount(){
    console.log(this.props.examiner);
  }

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