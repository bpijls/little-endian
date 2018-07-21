import React from 'react';
import './Challenge.css';

class Challenge extends React.Component{

  mode = this.props.mode;

  
  setWorkspace = (c, w, tab) => {
    this.tabs[tab].workspace = w;
    this.tabs[tab].code = c;
}

  render(){
    if(this.props.mode.challenge.isActive) {
        return (
            <div className="row">
                <div className="col-xs-8 content-container">
                    <div className="content-container__inner">
                        <div className="hax">
                          <div className="buttongroup">
                            <button className="button" onClick={() => this.props.switchMode(this.mode.storyOne)}>1</button>
                            <button className="button" onClick={() => this.props.switchMode(this.mode.storyTwo)}>2</button>
                            <button className="button" onClick={() => this.props.switchMode(this.mode.storyThree)}>3</button>
                            <button className="button" onClick={() => this.props.switchMode(this.mode.storyFour)}>4</button>
                            <button className="button" onClick={() => this.props.switchMode(this.mode.storyFive)}>5</button>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="col-xs-4 content-container ">
                    <div className="content-container__inner bg-white">
                        <h1>Challenges</h1>
                        <p>Oh, what is this! Something just crash-landed on our little planet and it seems like it was this tiny very robot.<br/>
                        <br/>
                        From what we can understand, this little guy wants to try and live here!<br/>
                        It seems like the crash also erased some parts of his memory.<br/>
                        <br/>
                        Can you patch the robot up and help him re-adjust to life on earth?</p>
                    </div>
                </div>
            </div>
        );
    }  else {
        return null;
    }
  }
}

export default Challenge;
