import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux";

// global error handler
// since this can be wrapped around multiple components - it will call componentWillMount eery time it is wrapped around an existing component
const withErrorHandler = (WrappedComponent, axios) => {
  // anonymous class - the class is never used just returned
  return class extends Component {
    // use componentDidMount to set up a global interceptor using the axios instance
    state = {
        error: null
    }
    componentWillMount() {
      // call this.setState to clear any value stored in the error property
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req; // we have to return the req config so that  the request can continue
      });

      // the first argument is used to return the response config so that the response can continue
      // second argument is the error case where you get the error and where you show the error modal if you get an error
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });

      });
    }
    // this is executed at the point in time a component isn't required anymore
    // to remove an interceptor you need to store the interceptor into a new property within this class: 'this.reqInterceptor'
componentWillUnmount() {
axios.interceptors.request.eject(this.reqInterceptor);
axios.interceptors.request.eject(this.resInterceptor);
}
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }
    // even if we don't show the Modal it is always present so we have to make the error message it renders conditional 
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
       </Aux>
      );
    }
  };
};

export default withErrorHandler;
