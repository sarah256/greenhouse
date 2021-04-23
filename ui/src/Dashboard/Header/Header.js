import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="page-header-wrapper">
                <div className="page-title-wrapper">
                    <span className="header-span">
                        <h2 className="page-title">Plants to water this week</h2>
                    </span>
                </div>
            </div>
        )
    }
}
