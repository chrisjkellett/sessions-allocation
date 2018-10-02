import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { object, bool, number } from 'prop-types';
import { Input } from '../../../../components/Forms';
import { generateInputProps } from './props';
import { generateFormElementArray } from '../../../utility';

class SessionsFormContent extends Component {
  render(){
    const { venues, availableExaminers, availableSupport } = this.props;
    const { values, handlers, shouldValidate, group } = this.props;
    return (
      generateFormElementArray(values)
        .filter(element => element.config.group === group)
        .map(element => <Input { ...generateInputProps(element, shouldValidate, handlers, venues, availableExaminers, availableSupport) } />)
    );
  }
}

SessionsFormContent.propTypes = {
  values: object.isRequired,
  handlers: object.isRequired,
  shouldValidate: bool.isRequired,
  group: number
}

const mapStateToProps = state => {
  return {
    venues: state.venue.venues,
    availableExaminers: state.op.ex_options,
    availableSupport: state.op.supp_options,
  }
}


export default withRouter(connect(mapStateToProps)(SessionsFormContent));