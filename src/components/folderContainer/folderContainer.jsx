import React, { Component } from 'react';
import ContextMenu from '../contextMenu/contextMenu';
import FolderNamePopup from '../folderNamePopUp/folderNamePopup';
import Folder from './folder';

const folderContainerCtxMenu = ['New Folder']
class FolderContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        xPos: 0,
        yPos: 0,
        showMenu: false,
        showNamePopup: false,
        ctxMenuOpts: []
      }
      this.handleContextMenu = this.handleContextMenu.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleContextMenuEvent = this.handleContextMenuEvent.bind(this);
      this.handleCreateFolder = this.handleCreateFolder.bind(this);
    }

    handleClick() {
      this.setState({showMenu: false});
    }

    handleContextMenu(event, ctxMenuOpt) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            xPos: `${event.pageX}px`,
            yPos: `${event.pageY}px`,
            showMenu: !this.state.showMenu,
            ctxMenuOpts: ctxMenuOpt
        });
    }

    handleContextMenuEvent(action) {
      switch(action) {
          case 'New Folder': {
            this.setState({showMenu: false, showNamePopup:true});
            break;
          }
          case 'Delete': {
              this.props.deleteFolder(this.props.menuOpt, this.props.folderName);
              break;
          }
          case 'Rename': {
              let newName='';
              this.props.renameFolder(this.props.menuOpt, this.props.folderName, newName);
              break;
          }
          default: {
            console.log('Invalid Context Menu event');
          }
      }
    }

    handleCreateFolder(folderName) {
      let folder = {
        name: folderName
      }
      this.props.createFolder(this.props.menuOpt, folder);
      this.setState({showNamePopup:false})
    }

    render() {
        let {menuOpt, folders} = this.props;
        let folderListHtml = (folders || []).map((folder, index) => {
          return <Folder key={index} 
                         name={folder.name} 
                         menuOpt={menuOpt} 
                         handleClick={this.handleClick}
                         handleContextMenu={this.handleContextMenu}/>
        });

        let {showMenu, xPos, yPos, showNamePopup }= this.state;
        return(
          <div className="folderListContainer" style={{height:'300px', width:'800px', backgroundColor:'red'}} onClick={this.handleClick} onContextMenu={(event) => {this.handleContextMenu(event,folderContainerCtxMenu)}}>
            {folderListHtml}
            {showMenu ? <ContextMenu menuOpts = {this.state.ctxMenuOpts} xPos={xPos} yPos={yPos} handleMenuEvent = {this.handleContextMenuEvent}/>: null}
            {showNamePopup? <FolderNamePopup changeFolderName={this.handleCreateFolder}/> : null}
          </div>  
        );
    }
}

export default FolderContainer;