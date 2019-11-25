import React from 'react';

import './style.scss';

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <nav className="top-navbar">
                <ul>
                    <li>
                        <span className="brand"><a href="/">Mogitor</a></span>
                    </li>
                    <li>
                        <span>Repositories Watched</span>
                    </li>
                </ul>
                <ul>
                    <li className="logout">
                        <span><a href="/logout">Logout</a></span>
                    </li>
                </ul>
            </nav>
          );
    }
}

export default TopNavbar;