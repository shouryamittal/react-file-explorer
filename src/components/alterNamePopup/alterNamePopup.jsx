import React, { Component } from 'react';
import '../../styles/popup.css';
class FolderNamePopup extends Component {
    constructor(props) {
        super(props);
        this.state ={
            folderName: ''
        };

        this.inputRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    handleInputChange(e) {
        this.setState({folderName:e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.alterFolderName(this.state.folderName);
        if(e.keyCode === 13 && this.state.folderName.length) {
            
        }
    }

    closePopup() {
        this.props.close();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }
    
    render() {
        return (
            <div className="folderNamePopup" data-testid='popup' onSubmit={this.handleSubmit}>
               <p>Enter Folder Name: </p>
               <form name="alterNameForm" data-testid='form'>
                    <input ref={this.inputRef} placeholder='Folder Name' type="text" value={this.state.folderName} onChange={this.handleInputChange}/>
               </form>
               <div className="closeBtn">
                            <button onClick={this.closePopup}>Close</button>
                </div>
            </div>
        );
    }
}

export default FolderNamePopup;