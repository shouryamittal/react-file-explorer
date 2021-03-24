import React, { Component } from 'react';
import Folder from './folder';

class FolderContainer extends Component {

    constructor(props) {
      super(props);
      this.createFolder = this.createFolder.bind(this);
    }

    createFolder() {
      let folder = {
        name: 'New Folder'
      }
      this.props.createFolder(this.props.menuOpt, folder);
    }

    render() {

        let folderListHtml = (this.props.folders || []).map(folder => {
          return <Folder name={folder.name}/>
        });

        let {menuOpt} = this.props;
        return(
          <div>
            <div>{menuOpt}</div>
            {folderListHtml}
            {/* this will be moved as context menu */}
            <button onClick={this.createFolder}>Add new Folder</button>
          </div>  
        );
    }
}

export default FolderContainer;