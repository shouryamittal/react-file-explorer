import React, { Component } from 'react';
import ContextMenu from '../components/contextMenu/contextMenu';
import FolderNamePopup from '../components/alterNamePopup/alterNamePopup';
import Folder from '../components/folder/folder';
import Consts from '../constants/contextMenuConsts';
import '../styles/folderContainer.css';
import Navigator from '../components/navigator/navigator';

class FolderContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        xPos: 0,
        yPos: 0,
        showCtxMenu: false,
        showNamePopup: false,
        createFolder:false,
        targetFolderName:'',
        ctxMenuOpts: []
      }
      this.handleContextMenu = this.handleContextMenu.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleContextMenuEvent = this.handleContextMenuEvent.bind(this);
      this.createOrRenameFolder = this.createOrRenameFolder.bind(this);
      this.closeAlterNamePopup = this.closeAlterNamePopup.bind(this);
    }

    handleClick() {
      this.setState({showCtxMenu: false});
    }

    handleContextMenu(event, ctxMenuOpt, folderNameClicked) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            xPos: `${event.pageX}px`,
            yPos: `${event.pageY}px`,
            showNamePopup: false,
            showCtxMenu: !this.state.showCtxMenu,
            targetFolderName:folderNameClicked,
            ctxMenuOpts: ctxMenuOpt
        });
    }

    handleContextMenuEvent(action) {
      switch(action) {
          case 'New Folder': {
            this.props.toggleSiteMask(true);
            this.setState({showCtxMenu: false, showNamePopup:true, createFolder: true});
            break;
          }
          case 'Delete': {
            this.props.deleteFolder(this.props.menuOpt, this.state.targetFolderName);
            break;
          }
          case 'Rename': {
            this.props.toggleSiteMask(true);
            this.setState({showCtxMenu: false, showNamePopup:true});
            break;
          }
          default: {
            console.log('Invalid Context Menu event');
          }
      }
    }
    
    closeAlterNamePopup() {
      this.setState({showNamePopup:false});
      this.props.toggleSiteMask(false);
    }

    createOrRenameFolder(folderName) {
      if(this.state.createFolder) {
        let folder = {
          name: folderName,
          level: this.props.level,
          parent: this.props.parent
        }
        this.props.createFolder(this.props.menuOpt, folder);
        this.props.toggleSiteMask(false);
        this.setState({showNamePopup:false, createFolder: false});
      }
      else {
        this.props.renameFolder(this.props.menuOpt, this.state.targetFolderName, {name:folderName});
        this.props.toggleSiteMask(false);
        this.setState({showNamePopup:false});
      }
    }

    render() {
        let {menuOpt, folders} = this.props;
        let folderListHtml = (folders || []).map((folder, index) => {
          return <Folder key={index} 
                         name={folder.name}
                         menuOpt={menuOpt} 
                         handleClick={this.handleClick}
                         handleContextMenu={this.handleContextMenu}
                         openFolder={this.props.openFolder}/>
        });

        let {showCtxMenu, xPos, yPos, showNamePopup }= this.state;
        return(
          <div className="folderListContainer" data-testid='folderContainer' onClick={this.handleClick} onContextMenu={(event) => {this.handleContextMenu(event,Consts.FOLDER_CONTAINER_CTX_MENU)}}>
            
            <Navigator goToPrevLevel={this.props.prevLevel} goToNextLevel={this.props.nextLevel} level={this.props.level}/>
            {folderListHtml}
            {showCtxMenu ? <ContextMenu menuOpts = {this.state.ctxMenuOpts} xPos={xPos} yPos={yPos} handleMenuEvent = {this.handleContextMenuEvent}/>: null}
            {showNamePopup? <FolderNamePopup alterFolderName={this.createOrRenameFolder} close={this.closeAlterNamePopup}/> : null}
          </div>  
        );
    }
}

export default FolderContainer;