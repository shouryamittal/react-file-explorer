import React, { Component } from 'react';
import '../../styles/contextMenu.css';

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
        let menuHtml = (menuOpts || []).map((opt, index) => (<div key={index} onClick={() => {this.handleEvent(opt);}} data-testid={opt} className="option">{opt}</div>));
        return(
            <div className="contextMenu" data-testid="ctxMenu" style={{left:xPos, top: yPos}}>
                {menuHtml}
            </div>
        )
    }
}

export default ContextMenu;