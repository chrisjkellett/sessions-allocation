import React from 'react';
import {Redirect} from 'react-router-dom';

const AuthUser = ({user, children}) => {
 return user ? children : <Redirect to='/' />
}

export default AuthUser
