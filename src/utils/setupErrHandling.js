import React from 'react';
import * as SentryTool from '@sentry/browser';
import ErrorView from '../app/views/misc/error/ErrorViewContainer';

class Sentry {
  constructor() {
    SentryTool.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
  }

  captureException = e => SentryTool.captureException(e);

  configureScope = user =>
    SentryTool.configureScope(scope => {
      scope.setUser(user);
    });

}


class ExceptionBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      info: {},
    }

    this.handleError = ({ email, uid }) => {
      const { error, info } = this.state;

      SentryTool.configureScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key]);
        });

        if(email || uid) scope.setUser({ id: uid, email });

        SentryTool.captureException(error);
      });
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }


  render() {

    const { hasError, error } = this.state;
    const { children } = this.props;

    if(hasError) {
      return <ErrorView errorMsg={error && error.message} handleError={this.handleError} />;
    }

    // do nothing if no errors
    return children;
  }
}


const withExceptionHandler = Component => props => (
  <ExceptionBoundary>
    <Component {...props} />
  </ExceptionBoundary>
);


export { ExceptionBoundary, withExceptionHandler };
export default Sentry;
