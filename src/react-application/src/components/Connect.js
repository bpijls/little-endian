import React, { Component } from 'react';
import "./Connect.css";
import './Login.css';
import '../App.css';

import logo4 from "../img/logo/logo4.png";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  robotId: '',  
  error: null,
};

class ConnectPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      robotId
    } = this.state;

    this.props.triggerParentUpdate(robotId);
    event.preventDefault();
  }

  render() {
    const {
      robotId,
      error,
    } = this.state;


    const isInvalid =      
      robotId === '' ;

    if (error != null) {
      this.props.setErrorMessage(error.message);
    }

  
    return (
      <div className="login-wrapper">
        <div className="loginBox">
          <div className="login-header">
            <img src={logo4} id="logo" className="img" />
          </div>                  
            <div>
              <form onSubmit={this.onSubmit}>
                <input
                  className="robotId-input"
                  value={robotId}
                  onChange={event => this.setState(byPropKey('robotId', event.target.value))}
                  type="robotId"
                  placeholder="Robot Name"
                />
                
                <div className="connect-button-container">
                  <button className="connect-button" disabled={isInvalid} type="submit">
                    CONNECT
                  </button>
                </div>
                <p>{error && error.message}</p>
              </form>
            </div>
          </div>
        </div>

    );  
  }
}

export default ConnectPage;
