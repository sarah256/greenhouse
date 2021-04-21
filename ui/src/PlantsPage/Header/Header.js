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
                        <h2 className="page-title">All Plants</h2>
                        <h3 >
                            <span>
                                <FontAwesomeIcon className="fa-icon" icon={faInfoCircle} />
                                {this.props.todaysPlantsPrefix} to water today
                            </span>
                        </h3>
                    </span>
                </div>
                <div className="info-bar-wrapper">
                    <p className="info">
                        Select the <FontAwesomeIcon icon={faTint} /> button to indicate that a plant has been watered today
                    </p>
                </div>
                <div className="new-plant-btn-wrapper">
                    <button className="new-plant-btn" onClick={() => this.triggerNewPlantPopup()}>
                        + NEW PLANT
                    </button>
                </div>
            </div>
        )
    }
}
