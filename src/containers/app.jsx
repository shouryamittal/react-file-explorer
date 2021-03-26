import React, { Component } from 'react';
import '../styles/app.css';
import MenuOptionsList from '../components/menu/menuOptionsList';
import FolderContainer from './folderContainer';
import Consts from '../constants/menuListOpts';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      level:0,
      maxLevel:0,
      parent:'root',
      home: [],
      selectedMenuOpt: 'home',
      showSiteMask: false
    };
    this.handleChangeMenuOpt = this.handleChangeMenuOpt.bind(this);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleRenameFolder = this.handleRenameFolder.bind(this);
    this.handleSiteMaskVisibility = this.handleSiteMaskVisibility.bind(this);
    this.handleOpenFolder = this.handleOpenFolder.bind(this);
    this.goToPrevLevel = this.goToPrevLevel.bind(this);
    this.goToNextLevel = this.goToNextLevel.bind(this);
  }

  handleCreateFolder(menuOpt, folder) {
    let folderList = [];
    if(this.state[menuOpt]) {
      folderList = [...this.state[menuOpt], folder];
    }
    else {
      folderList = [folder];
    }
    this.setState({
      [menuOpt]: folderList
    });
  }

  handleDeleteFolder(menuOpt, folderName) {
    let folderList = this.state[menuOpt];
    let index = folderList.findIndex(folder => folder.name === folderName);
    let updatedFolderList = [...folderList.slice(0, index), ...folderList.slice(index + 1)];
    this.setState({[menuOpt]: updatedFolderList, showSiteMask:false});
  }

  handleRenameFolder(menuOpt, oldFolderName, newFolderInfo) {
    let folderList = this.state[menuOpt];
    let index = folderList.findIndex(folder => folder.name === oldFolderName);
    let updatedFolderList = [...folderList.slice(0, index), Object.assign({}, folderList[index], newFolderInfo), ...folderList.slice(index + 1)];
    this.setState({[menuOpt]: updatedFolderList, showSiteMask:false});
  }

  handleOpenFolder(folderName) {
    this.setState({level: this.state.level + 1, maxLevel: this.state.maxLevel + 1, parent: folderName})
  }

  handleChangeMenuOpt(selectedMenuOpt) {
    this.setState({selectedMenuOpt: selectedMenuOpt, level: 0, parent:'root', maxLevel: 0});
  }

  handleSiteMaskVisibility(showSiteMask) {
    this.setState({showSiteMask: showSiteMask});
  }

  goToPrevLevel() {
    let folderList = this.state[this.state.selectedMenuOpt];
    let folders = (folderList || []).filter(folder => folder.level === this.state.level - 1);
    let parent = folders[0].parent;
    this.setState({level: this.state.level - 1, parent: parent});
  }

  goToNextLevel() {
    let folderList = this.state[this.state.selectedMenuOpt];
    let folders = (folderList || []).filter(folder => folder.level === this.state.level + 1);
    let parent = folders[0].parent;
    this.setState({level: this.state.level + 1, parent: parent});
  }


  render() {
    let foldersForCurrentMenuOpt = this.state[this.state.selectedMenuOpt];
    let folders = (foldersForCurrentMenuOpt || []).filter(folder => folder.parent === this.state.parent); 
    return(
      <div className="appContainer">
        <div className="d-flex">
          <MenuOptionsList menuOptions = {Consts.MENU_LIST} selectedOpt = {this.state.selectedMenuOpt} changeMenuOpt={this.handleChangeMenuOpt}/>
          <FolderContainer level={this.state.level}
                           maxLevel={this.state.maxLevel}
                           parent = {this.state.parent}
                           menuOpt = {this.state.selectedMenuOpt} 
                           folders={folders}
                           createFolder={this.handleCreateFolder}
                           deleteFolder={this.handleDeleteFolder}
                           renameFolder={this.handleRenameFolder}
                           toggleSiteMask={this.handleSiteMaskVisibility}
                           openFolder = {this.handleOpenFolder}
                           nextLevel = {this.goToNextLevel}
                           prevLevel = {this.goToPrevLevel}/>
          {this.state.showSiteMask ? <div className="siteMask"></div>:null}
                           
        </div>
      </div>
    );
  }
}

export default App;

