import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FreeCoding from './components/FreeCoding';
import StoryMode from './components/storymode/StoryMode';
import Documentation from './components/Documentation';
import Settings from './components/Settings';
import Connect from './components/Connect';
import { functions } from './js/websocket.js';

//import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { firebase } from './firebase';

//import * as routes from './constants/routes';

class App extends Component {
  //Here we will add different states, so we can
  //change the webapp depending on the user
  //We will need a backend, which saves the different states
  state = {
    username: "JAN MULDER",
    completedChallenges: undefined,
    rankname: "ROBOT EXPERT",
    savedFunctions: undefined,
    authUser: null,
    robotId: null,
    categories: {
      freeCoding: { isActive: true },
      storyMode: { isActive: false },
      documentation: { isActive: false },
      settings: { isActive: false },
      login: { isActive: false },
    }
  }


  //this triggers when the login state changes (user log in or log out)
  componentDidMount() {
    // var authUser = {};
    // authUser.email = "2C4F";
    // this.setState(() => ({ authUser }));
    // firebase.auth.onAuthStateChanged(authUser => {
    //   authUser
    //     ? this.setState(() => ({ authUser }))
    //     : this.setState(() => ({ authUser: null }));
    // });
  }

  //This function will be used by the sidebar to set the active category
  //Therefore we pass the function as props to the sidebar component
  updateCategories = (categories) => {
    this.setState(categories);
  }

  updateRobotId(robotId) {
    this.setState({robotId: robotId});
  }

  render() {
    //if the user is not logged in, show the login/signup screen (login)
    if (this.state.robotId == null) {
      return (
        <div className="wrapper">
          <Connect triggerParentUpdate={this.updateRobotId.bind(this)} />
        </div>        
      );
    }
    else {//if the user is logged in show the system
      functions.connectSocket(this.state.robotId + "@user.nl")
      return (
        <div className="wrapper">
          <div id="sidebar-wrapper">
            <Sidebar
              updateCategories={this.updateCategories}
              toggleSidebar={this.toggleSidebar}
              categories={this.state.categories}
              username={this.state.username}
              rankname={this.state.rankname}
            />
          </div>

          <div id="content-wrapper">
            <div className="container-fluid">
              <FreeCoding workspace={this.workspace} setWorkspace={this.setWorkspace} categories={this.state.categories} />
              <StoryMode categories={this.state.categories} />
              <Documentation categories={this.state.categories} />
              <Settings categories={this.state.categories} />
            </div>
          </div>
        </div>
      );
    }
  }
};

export default App;
