import React, { Component } from 'react';

const folderContextMenu = ['Delete', "Rename"];
class Folder extends Component {
    constructor(props) {
        super(props);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);        
    }

    handleClick() {
        this.props.handleClick();
    }

    handleContextMenu(event) {
        event.preventDefault();
        event.stopPropagation()
        this.props.handleContextMenu(event, folderContextMenu);
    }

    render() {
        let folderName = this.props.name;
        return(
            <div id="folder" className="folder" style={{height:'50px', width:'150px', margin:'10px', backgroundColor:'black', color:'white'}} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>{folderName}</div>
        );
    }
}

export default Folder;