import React, { Component } from 'react';
import MenuOption from './menuOption';

class MenuOptionsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let menuOptions = this.props.menuOptions;
        let menuOptHtml = menuOptions.map(option => {
            return (<MenuOption key={option.id} data = {option} changeMenuOpt={this.props.changeMenuOpt}/>);
        });

        return(<div className="menuOptionList">{menuOptHtml}</div>);
    }
}

export default MenuOptionsList;