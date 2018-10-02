import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { object, bool, number } from 'prop-types';
import { Input } from '../../../../components/Forms';
import { generateInputProps } from './props';
import { generateFormElementArray } from '../../../utility';

class SessionsFormContent extends Component {
  render(){
    const { venues } = this.props;
    const { values, handlers, shouldValidate, group } = this.props;
    return (
      generateFormElementArray(values)
        .filter(element => element.config.group === group)
        .map(element => <Input { ...generateInputProps(element, shouldValidate, handlers, venues) } />)
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
  }
}


export default withRouter(connect(mapStateToProps)(SessionsFormContent));