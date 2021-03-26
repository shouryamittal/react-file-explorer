import React, { Component } from 'react';
import MenuOption from './menuOption';
import '../../styles/menuOptList.css';

class MenuOptionsList extends Component {
    render() {

        let {menuOptions, selectedOpt} = this.props;
        let menuOptHtml = menuOptions.map(option => {
            return (<MenuOption key={option.id} data={option} selectedOpt={selectedOpt} changeMenuOpt={this.props.changeMenuOpt}/>);
        });

        return(<div className="menuOptionList">{menuOptHtml}</div>);
    }
}

export default MenuOptionsList;