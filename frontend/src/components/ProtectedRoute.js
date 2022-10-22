import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, ...props }) {
  const token = localStorage.getItem("jwt");
  return (
    <Route {...props}>
       {(token || isLoggedIn) ? children : <Redirect to='/signin' /> }
    </Route>
  )
}

export default ProtectedRoute;
