import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { getLoggedIn } from "../../selectors/selectors";


const ProtectedRoute = ({ component: Component, isItAnAuthorizationComponent, path, redirectPath, ...props }) => {

  const isLoggedIn = useSelector(getLoggedIn)  

  return (
    <Route path={path}>
      {
        isItAnAuthorizationComponent ? 
        () => !isLoggedIn ? <Component {...props} /> : <Redirect to={redirectPath} />
        :
        () => isLoggedIn ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    </Route>
  );
};

export default ProtectedRoute;