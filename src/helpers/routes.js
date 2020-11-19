import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({ user, confirmEmailVerifiedPath, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          if (user.emailVerified) {
            return (
              <Redirect
                to={{
                  pathname: loggedInPath,
                }}
              />
            );
          }
          return (
            <Redirect
              to={{
                pathname: confirmEmailVerifiedPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, confirmEmailVerifiedPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          if (user.emailVerified) {
            return children;
          }
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function UnProtectedRoute({ children, ...rest }) {
  return <Route {...rest} render={() => children} />;
}
