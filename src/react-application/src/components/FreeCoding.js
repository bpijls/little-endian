import React from 'react';
import './FreeCoding.css';
import BlocklyEditor from './BlocklyComponent/BlocklyEditor';

class FreeCoding extends React.Component {

    //We use these states to change between the tabs
    state = {
        tabs: {
            tab1: { isActive: true },
            tab2: { isActive: false },
            tab3: { isActive: false },
        }
    }

    //These variables save the workspaceXML and the JS Code for each tab
    tabs = {
        tab1: { workspace: "", code: "" },
        tab2: { workspace: "", code: "" },
        tab3: { workspace: "", code: "" },
    }

    //Update the workscape and code variables
    setWorkspace = (c, w, tab) => {
        this.tabs[tab].workspace = w;
        this.tabs[tab].code = c;
    }

    activateTab = (tab) => {
        var tabs = this.state.tabs;
        for (let key in tabs) {
            tabs[key].isActive = false;
        }
        tabs[tab].isActive = true;
        this.setState(tabs);
        console.log(this.state.tabs);
    }


    render() {
        if (this.props.categories.freeCoding.isActive) {
            return (
                <div className="row">
                    <div className="col-xs-12 content-container">
                        <div className="content-container__inner no-background">
                            <div id="freecoding">
                                <div id="freecoding-tabs">
                                    <div className={this.state.tabs.tab1.isActive ? "tab tab-left active-tab" : "tab tab-left"} onClick={() => this.activateTab("tab1")}>
                                        Tab 1
                                </div>
                                    <div className={this.state.tabs.tab2.isActive ? "tab active-tab" : "tab"} onClick={() => this.activateTab("tab2")}>
                                        Tab 2
                                </div>
                                    <div className={this.state.tabs.tab3.isActive ? "tab tab-right active-tab" : "tab tab-right"} onClick={() => this.activateTab("tab3")}>
                                        Tab 3
                                </div>

                                </div>
                                <div id="editor-container">
                                    <div id="editor">
                                        <BlocklyEditor tab="tab1" tabs={this.state.tabs} code={this.tabs.tab1.code} workspace={this.tabs.tab1.workspace} setWorkspace={this.setWorkspace} />
                                        <BlocklyEditor tab="tab2" tabs={this.state.tabs} code={this.tabs.tab2.code} workspace={this.tabs.tab2.workspace} setWorkspace={this.setWorkspace} />
                                        <BlocklyEditor tab="tab3" tabs={this.state.tabs} code={this.tabs.tab3.code} workspace={this.tabs.tab3.workspace} setWorkspace={this.setWorkspace} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default FreeCoding;