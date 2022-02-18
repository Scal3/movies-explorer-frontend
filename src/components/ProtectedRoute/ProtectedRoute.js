import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { loggedIn } from "../../selectors/selectors";


const ProtectedRoute = ({ component: Component, redirectPath, ...props }) => {

  const isLoggedIn = useSelector(loggedIn)  

  return (
    <Route>
      {() =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    </Route>
  );
};

export default ProtectedRoute;