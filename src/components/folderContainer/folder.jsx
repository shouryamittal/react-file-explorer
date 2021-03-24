import React, { Component } from 'react';

class Folder extends Component {
    render() {
        let folderName = this.props.name;
        return(
            <div className="folder">{folderName}</div>
        );
    }
}

export default Folder;