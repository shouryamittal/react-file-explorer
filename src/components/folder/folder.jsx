import React, { Component } from 'react';
import Consts from '../../constants/contextMenuConsts';
class Folder extends Component {
    constructor(props) {
        super(props);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);     
    }

    handleClick() {
        this.props.handleClick();
    }

    handleContextMenu(event) {
        event.preventDefault();
        event.stopPropagation()
        this.props.handleContextMenu(event, Consts.FOLDER_CTX_MENU, this.props.name);
    }

    handleDoubleClick(event) {
        event.preventDefault();
        this.props.openFolder(this.props.name);
    }

    render() {
        let folderName = this.props.name;
        return(
            <div id="folder" className="folder" title = {folderName} onClick={this.handleClick} draggable onContextMenu={this.handleContextMenu} onDoubleClick={this.handleDoubleClick}>
                <div className="folderIcon"></div>
                <div className="folderName">{folderName}</div>
            </div>
            
        );
    }
}

export default Folder;