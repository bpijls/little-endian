import React from 'react';
import './BlocklyEditor.css';
import Blockly from 'node-blockly/browser';
import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';
import { blocks } from './BlockDefinitions.js';
import {functions } from '../../js/websocket.js';

//Color of the Blocks
Blockly.HSV_SATURATION = 0.6;
Blockly.HSV_VALUE = 0.8;
class BlocklyEditor extends React.Component {

  workspace = "";
  code = "";


  showCode = () => {
    // Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    // var code = Blockly.JavaScript.workspaceToCode(BlocklyDrawer.workspaceXML);
    alert(this.code);
  }

  setWorkspaceAndCode = (c, w) => {
    this.workspace = w;
    this.code = c;
    if(this.props.setWorkspace){
      this.props.setWorkspace(this.code, this.workspace, this.props.tab);
    }
    
    // console.log(this.state.workspace);
    // console.log(this.state.code);
  }

  /*componentDidUpdate(){
    console.log("test");
    //this.socket = new WebSocket('ws://213.93.156.169:8000');
  }*/

  sendCode = () => {
    var tempCode = this.code;
    functions.send(tempCode, this.props.email);
  }

  render() {
    if ( this.props.tab === undefined || this.props.tabs[this.props.tab].isActive) {
      return (
        <div id="blockly-container">
          <BlocklyDrawer
          className="BlocklyDrawer"
          style= {{
            height: '100%',
            top: "0px",
            left: "0px"
          }}
            tools={[
              //blocks.rotate,
              blocks.turn,
              blocks.face,
              blocks.draw_face,
              blocks.led,
              blocks.move,
              blocks.clearInterval
            ]}
            workspaceXML={this.props.workspace}
            onChange={(code, workspace) => {
              this.setWorkspaceAndCode(code, workspace);
            }}
            appearance={{
              categories: {
                Movement: {
                  colour: '180'
                },
                Sounds: {
                  colour: '290'
                },
                Emotions: {
                  colour: '345'
                },
                LED: {
                  colour: '230'
                },
              },
            }}
          >

            <Category name="Logic" colour="210">
              <Block type="logic_compare"></Block>
              <Block type="logic_operation"></Block>
              <Block type="logic_boolean"></Block>
              <Block type="controls_if"></Block>
            </Category>

            <Category name="Text" colour="160">
              <Block type="text"></Block>
            </Category>

            <Category name="Control" colour="120">
              <Block type="controls_whileUntil"></Block>
              <Block type="controls_for"></Block>
              <Block type="controls_repeat_ext"></Block>
            </Category>

            <Category name="Math" colour="230">
              <Block type="math_number"></Block>
            </Category>

            <Category name="Variables" colour="330" custom="VARIABLE"></Category>
            <Category name="Functions" custom="PROCEDURE" colour="290"></Category>
          </BlocklyDrawer>

          <div id="btn-container">
            <div id="showCode" className="btn-blockly-editor fa fa-code blockly-buttons" onClick={this.showCode}></div>
            <div id="runCode" className="btn-blockly-editor fa fa-download blockly-buttons" onClick={this.sendCode}></div>
            <div id="saveCode" className="btn-blockly-editor fa fa-save blockly-buttons" onClick={this.showCode}></div>
            <div id="openCode" className="btn-blockly-editor fa fa-folder blockly-buttons" onClick={this.showCode}></ div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BlocklyEditor;
