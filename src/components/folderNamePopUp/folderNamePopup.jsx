import React, { Component } from 'react';

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
        console.log(e.target.value)
        this.setState({folderName:e.target.value});
    }

    handleSubmit(e) {
       
        if(e.keyCode === 13) {
            this.props.changeFolderName(this.state.folderName);
        }
    }
    render() {
        return (
            <div className="folderNamePopup" style={{heigh: '200px', width:'200px', position:'absolute', top:'50%', left:'50%', border:'1 px solid black', padding: '15px', zIndex:2, backgroundColor:'white'}}>
               <p>Enter Folder Name: </p>
               <input type="text" value={this.state.folderName} onChange={this.handleInputChange} onKeyUp={this.handleSubmit}/>
            </div>
        );
    }
}

export default FolderNamePopup;