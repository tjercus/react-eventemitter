"use strict";

import React from "react";
import Offer from "../models/Offer";
import OfferRowComponent from "./OfferRowComponent";

// TODO PropTypes
export default class CartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      offers: [new Offer("1", "Items are being loaded ...", 0)],
      summary: 0.0
    };
  }

  componentDidMount() {    
    this.props.eventbus.on("MENU_CLICK_EVT", ((menuItemName) => {      
      if (menuItemName === this.props.from) {        
        this.setState({isVisible: true});        
      } else {
        this.setState({isVisible: false});
      }
    }));    
    
    this.props.eventbus.on("CARTSTORE_CHANGED_EVT", ((offers) => {
      // TODO it is nog elegant to ask it here
      this.props.eventbus.emit("CARTSTORE_SUMMARIZE_CMD");
      this.setState({offers: offers});
    }));
    this.props.eventbus.on("CARTSTORE_GETALL_EVT", ((offers) => {
      // TODO it is nog elegant to ask it here
      this.props.eventbus.emit("CARTSTORE_SUMMARIZE_CMD");
      this.setState({offers: offers});
    }));   
    this.props.eventbus.on("CARTSTORE_SUMMARIZED_EVT", ((summary) => {
      this.setState({summary: summary});
    }));
  } 

  render() {
    let rows = [];
    this.state.offers.map((offer, i) => {
      rows.push(<OfferRowComponent 
        offer={offer} 
        eventbus={this.props.eventbus} 
        key={i} 
        removebutton={true} />);
    })
    let panelClassName = this.state.isVisible ? "panel visible" : "panel hidden";
    return (
      <section id="cart" className={panelClassName}>
        <h2>Cart</h2>

        <table id="cart-list" className="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <p id="amount-container">
          {"Amount:"} {this.state.summary} &nbsp;
          <button className="pure-button pure-button-primary" title="pay">{"Pay"}</button>
        </p>
        
      </section>
    );
  }
};

CartComponent.propTypes = {  
  eventbus: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  from: React.PropTypes.string.isRequired
};