import React, { Component } from 'react';
import '../styles/app.css';
import MenuOptionsList from '../components/menu/menuOptionsList';
import FolderContainer from '../components/folderContainer/folderContainer';

const menuOptionList = [
  {
    id:'home',
    name: 'Home'
  },{
    id:'desktop',
    name:'Desktop'
  },
  {
    id:'documents',
    name: 'Documents'
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      home: [],
      selectedMenuOpt: 'home'
    };
    this.handleChangeMenuOpt = this.handleChangeMenuOpt.bind(this);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleRenameFolder = this.handleRenameFolder.bind(this);
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
    console.log('delete')
    let folderList = this.state[menuOpt];
    let index = folderList.findIndex(folder => folder.name === folderName);
    let updatedFolderList = [...folderList.slice(0, index), ...folderList.slice(index + 1)];
    this.setState({[menuOpt]: updatedFolderList});
  }

  handleRenameFolder(menuOpt, folder) {
    
  }

  handleChangeMenuOpt(selectedMenuOpt) {
    console.log(selectedMenuOpt)
    this.setState({selectedMenuOpt: selectedMenuOpt});
  }

  render() {
    return(
      <div className="appContainer">
        <div className="d-flex align-items-center">
          <MenuOptionsList menuOptions = {menuOptionList} changeMenuOpt={this.handleChangeMenuOpt}/>
          <FolderContainer level={this.state.level}
                           menuOpt = {this.state.selectedMenuOpt} 
                           folders={this.state[this.state.selectedMenuOpt]}
                           createFolder={this.handleCreateFolder}
                           deleteFolder={this.handleDeleteFolder}
                           renameFolder={this.handleRenameFolder}/>
                           
        </div>
      </div>
    );
  }
}

export default App;

