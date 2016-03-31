"use strict";

import EventEmitter from "eventemitter2";
import Offer from "./Offer";

/**
 * Store that persists and retrieves from localStorage.
 */
export default class OffersStore {  

  constructor(eventbus) {
  	this.eventbus = eventbus;
  	this.STORAGE_ID = "hotelbooking";
  
  	let offers = this.getOffers();
  	if (offers.length === 0) {
      offers.push(new Offer("1", "Hotel New York", 34.95));
      offers.push(new Offer("2", "Hostel Hospitable Amsterdam", 12.95));
      this.putOffers(offers);
    }
    this.eventbus.on("OFFERSSTORE_GETALL_CMD", (() => {      
      this.eventbus.emit("OFFERSSTORE_GETALL_EVT", this.getOffers());
    }));
  }

  /**
   * @returns {Offer[]} offers
   */
  getOffers() {
    return JSON.parse(localStorage.getItem(this.STORAGE_ID + "_offers") || "[]");
  }

  /**
   * @param {Offer[]} offers   
  */
  putOffers(offers) {
    localStorage.setItem(this.STORAGE_ID + "_offers", JSON.stringify(offers));
    this.eventbus.emit("OFFERSSTORE_CHANGED_EVT", offers);
  }

  /**
   * @param {Offer} offer
  */
  addOffer(offer) {
    let offers = this.getOffers();
    offers.push(offer);
    this.putOffers(offers);
  }
}
