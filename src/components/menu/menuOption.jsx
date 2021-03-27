import React, { Component } from 'react';

class MenuOption extends Component {

    constructor(props) {
        super(props);
        this.selectMenuOpt = this.selectMenuOpt.bind(this);
    }
    selectMenuOpt() {
        this.props.changeMenuOpt(this.props.data.id);
    }

    render() {
        let {name, id} = this.props.data;
        let selectedOpt = this.props.selectedOpt;
        return(<div className={(selectedOpt === id ? 'selected': '') + " menuOption"} data-testid="option" data-optid={id} onClick={this.selectMenuOpt}>{name}</div>);
    }
}

export default MenuOption;