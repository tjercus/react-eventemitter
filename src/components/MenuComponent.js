import React from "react";
import EventEmitter from "eventemitter4";

export default class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  onButtonClick = (evt) => {
    let name = evt.target.value;
    this.props.eventbus.emit("MENU_CLICK_EVT", name);
  };
  
  render() {
    return (
      <ul className="aside-menu">
        <li className="aside-submenu">
          <button onClick={this.onButtonClick} value="menu-item-one">
            {"menu item 1"}
          </button>
        </li>
        <li className="aside-submenu">
          <button onClick={this.onButtonClick} value="menu-item-two">
            {"menu item 2"}
          </button>
        </li>
        <li className="aside-submenu">
          <button onClick={this.onButtonClick} value="menu-item-three">
            {"menu item 3"}
          </button>
        </li>
      </ul>
    );
  }
};
