import React from 'react';
import './Documentation.css';

class Documentation extends React.Component {
    render() {
        if (this.props.categories.documentation.isActive) {
            return (
                <div className="row">
                    <div className="col-xs-12 content-container">
                        <div className="content-container__inner">
                            <h1>Documentation</h1>
                            <p>Here the idea is to have documentation about the robot and our system, for example how to assemble the robot and if we later on get more robots then the difference between the robots.</p>
                            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Documentation;