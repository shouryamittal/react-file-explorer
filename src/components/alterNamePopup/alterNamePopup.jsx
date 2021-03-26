import React, { Component } from 'react';
import '../../styles/popup.css';
class FolderNamePopup extends Component {
    constructor(props) {
        super(props);
        this.state ={
            folderName: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({folderName:e.target.value});
    }

    handleSubmit(e) {
        if(e.keyCode === 13 && this.state.folderName.length) {
            this.props.alterFolderName(this.state.folderName);
        }
    }
    
    render() {
        return (
            <div className="folderNamePopup">
               <p>Enter Folder Name: </p>
               <input type="text" value={this.state.folderName} onChange={this.handleInputChange} onKeyUp={this.handleSubmit}/>
            </div>
        );
    }
}

export default FolderNamePopup;