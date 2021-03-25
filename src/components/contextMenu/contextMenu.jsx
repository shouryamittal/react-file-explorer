import React, { Component } from 'react';

class ContextMenu extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(eventName) {
        this.props.handleMenuEvent(eventName);
    }

    render() {
        let {menuOpts, xPos, yPos} = this.props;
        let menuHtml = (menuOpts || []).map((opt, index) => (<div key={index} onClick={() => {this.handleEvent(opt);}} className="option">{opt}</div>));
        return(
            <div className="contextMenu" style={{position:'absolute', left:xPos, top: yPos, backgroundColor:'blue', color:'white', height:'100px'}}>
                {menuHtml}
            </div>
        )
    }
}

export default ContextMenu;