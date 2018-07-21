import React from 'react';
import Story from './Story';
import Challenge from './Challenge';

class StoryMode extends React.Component {

  state={
    mode : {
      storyOne : {isActive: false},
      storyTwo : {isActive: false},
      storyThree : {isActive: false},
      storyFour : {isActive: false},
      storyFive : {isActive: false},
      challenge : {isActive: true}
    }
  }

  updateMode = (mode) => {
    this.setState(mode);
  }

  switchMode = (switchMode) => {
    let mode = this.state.mode;
      for (let key in mode) {
          mode[key].isActive = false;
      }
      switchMode.isActive = true;
      this.updateMode(mode);
  }


    render(){
      if(this.props.categories.storyMode.isActive)
      {
          return (
              <div className="row">
                <Story switchMode={this.switchMode} updateMode={this.updateMode} mode={this.state.mode}/>
                <Challenge switchMode={this.switchMode} updateMode={this.updateMode} mode={this.state.mode}/>
              </div>
          );
      }  else
      {
          return null;
      }
    }

}


export default StoryMode;
