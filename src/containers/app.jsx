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
      level: 0,
      home: [{name:''}],
      selectedMenuOpt: 'home'
    };

    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleChangeMenuOpt = this.handleChangeMenuOpt.bind(this);
  }

  handleCreateFolder(menuOpt, folder) {
    let menuOptList = [];
    if(this.state[menuOpt]) {
      menuOptList = [...this.state[menuOpt], folder];
    }
    else {
      menuOptList = [folder];
    }
    this.setState({
      [menuOpt]: menuOptList
    });
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
                           createFolder={this.handleCreateFolder}/>
        </div>
      </div>
    );
  }
}

export default App;

