"use strict";

import React from "react";
import Offer from "../models/Offer";
import OfferRowComponent from "./OfferRowComponent";

export default class OffersComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      offers: [new Offer("1", "Offers being loaded ...", 0)]
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
    this.props.eventbus.on("OFFERSSTORE_CHANGED_EVT", ((offers) => {
      this.setState({offers: offers});
    }));
    this.props.eventbus.on("OFFERSSTORE_GETALL_EVT", ((offers) => {
      this.setState({offers: offers});
    }));
  }

  render() {
    let rows = [];
    this.state.offers.map((offer, i) => {
      rows.push(<OfferRowComponent
        offer={offer}
        eventbus={this.props.eventbus} 
        key={i} 
        addbutton={true} />);
    })
    let panelClassName = this.state.isVisible ? "panel visible" : "panel hidden";
    return (
      <section id="offers" className={panelClassName}>
        <h2>Offers</h2>

        <table id="offers-list" className="pure-table pure-table-bordered">
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
      </section>
    );
  }
};

OffersComponent.propTypes = {  
  eventbus: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  from: React.PropTypes.string.isRequired
};