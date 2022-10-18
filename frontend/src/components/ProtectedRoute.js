import React, { useState} from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, ...props }) {
  return (
    <Route {...props}>
       { isLoggedIn ? children : <Redirect to='/sign-in' /> }
    </Route>
  )
}

export default ProtectedRoute;


// import React, { useState} from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import Spinner from './Spinner';

// function ProtectedRoute({ children, isLoggedIn }) {
//   const [isCheckingToken ] = useState(false);

//   return (
//     <Route>
//       { isCheckingToken ? <Spinner /> :  isLoggedIn ? children : <Redirect to='/sign-in' /> }
//     </Route>
//   )
// }

// export default ProtectedRoute;
