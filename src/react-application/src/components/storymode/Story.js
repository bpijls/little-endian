import React from 'react';
import './Story.css';
import BlocklyEditor from '.././BlocklyComponent/BlocklyEditor';

class Story extends React.Component {
    mode = this.props.mode;

    render(){
      if(this.props.mode.storyOne.isActive) {
          return (
              <div className="row">
                  <div className="col-xs-8 content-container">
                      <div className="content-container__inner">
                        <BlocklyEditor/>
                      </div>
                  </div>
                  <div className="col-xs-4 content-container ">
                      <div className="content-container__inner bg-white">
                        <h1>Story</h1>
                        <p>Let’s start with giving him back his mobility.<br/>
                        The earth atmosphere made his sensors all jumbled up. <br/>
                        So, you need to teach him how to walk from scratch (but with blockly 😉). <br/>
                        <br/>
                        <h2>Make the robot move forward.</h2>
                        </p>
                        <button onClick={() => this.props.switchMode(this.mode.challenge)} >Challenges</button>
                      </div>
                  </div>
              </div>
          );
      } else if(this.props.mode.storyTwo.isActive) {
          return (
              <div className="row">
                  <div className="col-xs-8 content-container">
                      <div className="content-container__inner">
                        <BlocklyEditor/>
                      </div>
                  </div>
                  <div className="col-xs-4 content-container ">
                      <div className="content-container__inner bg-white">
                        <h1>Story</h1>
                        <p>Let’s start with giving him back his mobility.<br/>
                        The earth atmosphere made his sensors all jumbled up. <br/>
                        So, you need to teach him how to walk from scratch (but with blockly 😉). <br/>
                        <br/>
                        <h2>Make the robot move forward three times.</h2>
                        </p>
                        <button onClick={() => this.props.switchMode(this.mode.challenge)}>Challenges</button>
                      </div>
                  </div>
              </div>
          );
      } else if(this.props.mode.storyThree.isActive) {
          return (
              <div className="row">
                  <div className="col-xs-8 content-container">
                      <div className="content-container__inner">
                        <BlocklyEditor/>
                      </div>
                  </div>
                  <div className="col-xs-4 content-container ">
                      <div className="content-container__inner bg-white">
                        <h1>Story</h1>
                        <p>Let’s start with giving him back his mobility.<br/>
                        The earth atmosphere made his sensors all jumbled up. <br/>
                        So, you need to teach him how to walk from scratch (but with blockly 😉). <br/>
                        <br/>
                        <h2>Make the robot move forward four times. (With a 'for' loop)</h2>
                        </p>
                        <button onClick={() => this.props.switchMode(this.mode.challenge)}>Challenges</button>
                      </div>
                  </div>
              </div>
          );
      } else if(this.props.mode.storyFour.isActive) {
          return (
              <div className="row">
                  <div className="col-xs-8 content-container">
                      <div className="content-container__inner">
                        <BlocklyEditor/>
                      </div>
                  </div>
                  <div className="col-xs-4 content-container ">
                      <div className="content-container__inner bg-white">
                        <h1>Story</h1>
                        <p>Let’s start with giving him back his mobility.<br/>
                        The earth atmosphere made his sensors all jumbled up. <br/>
                        So, you need to teach him how to walk from scratch (but with blockly 😉). <br/>
                        <br/>
                        <h2>Make the robot move in a square. Without a loop.</h2>
                        </p>
                        <button onClick={() => this.props.switchMode(this.mode.challenge)}>Challenges</button>
                      </div>
                  </div>
              </div>
          );
      } else if(this.props.mode.storyFive.isActive) {
          return (
              <div className="row">
                  <div className="col-xs-8 content-container">
                      <div className="content-container__inner">
                        <BlocklyEditor/>
                      </div>
                  </div>
                  <div className="col-xs-4 content-container ">
                      <div className="content-container__inner bg-white">
                        <h1>Story</h1>
                        <p>Let’s start with giving him back his mobility.<br/>
                        The earth atmosphere made his sensors all jumbled up. <br/>
                        So, you need to teach him how to walk from scratch (but with blockly 😉). <br/>
                        <br/>
                        <h2>Make the robot move in a square (With a 'for' loop)</h2>
                        </p>
                        <button onClick={() => this.props.switchMode(this.mode.challenge)}>Challenges</button>
                      </div>
                  </div>
              </div>
          );
      } else {
          return null;
      }
    }
}

export default Story;
