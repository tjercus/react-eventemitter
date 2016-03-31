"use strict";

import React from "react";
import EventEmitter from "eventemitter2";

export default class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this); // TODO phat arrow
  }
  
  componentDidMount() {
  }
  
  onButtonClick(evt) {
    evt.preventDefault();
    let name = evt.target.value;
    this.props.eventbus.emit("MENU_CLICK_EVT", name);
  };
  
  render() {
    return (
      <nav className="pure-menu pure-menu-horizontal">
        <a href="#" onClick={this.onButtonClick} value="home" className="pure-menu-heading">HOTELBOOKING</a>
        <ul className="pure-menu-list">
          <li className="pure-menu-item"><button onClick={this.onButtonClick} value={"offers"} className="pure-menu-link">{"Offers"}</button></li>
          <li className="pure-menu-item"><button onClick={this.onButtonClick} value={"cart"} className="pure-menu-link">{"Cart"}</button></li>
          <li className="pure-menu-item"><button onClick={this.onButtonClick} value={"registration"} className="pure-menu-link">{"Registration"}</button></li>
          <li className="pure-menu-item"><button onClick={this.onButtonClick} value={"users"} className="pure-menu-link">{"Users"}</button></li>
        </ul>
      </nav>
    );
  }
};
