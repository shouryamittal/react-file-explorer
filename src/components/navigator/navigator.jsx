import React, { Component } from 'react';

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.decrementLevel = this.decrementLevel.bind(this);
        this.incrementLevel = this.incrementLevel.bind(this);
    }

    decrementLevel() {
        this.props.goToPrevLevel();    
    }
    incrementLevel() {
        this.props.goToNextLevel();
    }
    render() {
        let level = this.props.level;
        return(
            <div className="navigator">
                <span className={level === 0 ? "disabled":'enabled'} onClick={this.decrementLevel}>&#8249;</span>
            </div>
        );
    }
}

export default Navigator;