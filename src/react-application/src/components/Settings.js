import React from 'react';
import './Settings.css';
import SignOutButton from './SignOut';

import { functions } from '../js/websocket.js';

class Settings extends React.Component {
    render() {
        if (this.props.categories.settings.isActive) {
            return (
                <div className="row">
                    <div className="col-xs-12 content-container">
                        <div className="content-container__inner">
                            <h1>Settings</h1>
                            <p>The idea here is to have different kinds of settings such as set new password or technical stuff like log out and reconnect websocket</p>
                            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                            <p><SignOutButton /></p>
                            <button onClick={functions.forceReconnect}>Reconnect websocket</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default Settings;