"use strict";

import React from "react";
import packageJSON from "../../package.json";
import EventEmitter from "eventemitter2";
import OffersStore from "../models/OffersStore";
import CartStore from "../models/CartStore";
import MenuComponent from "./MenuComponent";
import OffersComponent from "./OffersComponent";
import CartComponent from "./CartComponent";
import RegistrationComponent from "./RegistrationComponent";

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.eventbus = new EventEmitter({wildcard: true, delimiter: "_"});
    this.offersStore = new OffersStore(this.eventbus);
    this.cartStore = new CartStore(this.eventbus);
  }
  
  componentDidMount() {    
    this.eventbus.emit("*_GETALL_CMD");
  }
  
  render() {
    const version = packageJSON.version;

    return (
      <div>
        <header>
          <MenuComponent eventbus={this.eventbus} />          
        </header>
        <article id="container">
          <main>
            <OffersComponent eventbus={this.eventbus} name="offers-panel" from="offers" />
            <CartComponent eventbus={this.eventbus} name="cart-panel" from="cart" />
            <RegistrationComponent eventbus={this.eventbus} name="registration-panel" from="registration" />
          </main>
        </article>
      </div>
    )
  }
};
