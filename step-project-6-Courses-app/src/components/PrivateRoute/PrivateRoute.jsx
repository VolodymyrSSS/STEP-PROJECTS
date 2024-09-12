import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserRole } from '../../selectors';

function PrivateRoute({ children }) {
  const userRole = useSelector(selectUserRole);

  if (userRole === 'admin') {
    return children;
  } else {
    return <Navigate to='/courses' />;
  }
}

export default PrivateRoute;
