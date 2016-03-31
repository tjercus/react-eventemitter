"use strict";

import React from "react";
import Offer from "../models/Offer";

// TODO proptypes
export default class OfferRowComponent extends React.Component {

	constructor(props) {
		super(props);
		this.onAddButtonClick = this.onAddButtonClick.bind(this);
		this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
	}

	onAddButtonClick(evt)	{
		this.props.eventbus.emit("CARTSTORE_ADD_CMD", this.props.offer);
	}

	onRemoveButtonClick(evt) {
		this.props.eventbus.emit("CARTSTORE_REMOVE_CMD", this.props.offer);
	}

	render() {
		let addButton = "";
		let removeButton = "";
		if (this.props.addbutton === true) {
	  	addButton = (<button onClick={this.onAddButtonClick} className="pure-button">add to cart</button>);
	  }
	  if (this.props.removebutton === true) {
	  	removeButton = (<button onClick={this.onRemoveButtonClick} className="pure-button">remove from cart</button>);
	  }
		return (
			<tr key={this.props.key}>
				<td>{this.props.offer.name}</td>
	      <td>{this.props.offer.price}</td>
	      <td>
	      {this.props.addbutton}
				{addButton} 
	      &nbsp;
	      {this.props.removebutton}
	      {removeButton}
	      </td>
	    </tr>
		);
	}
}

OfferRowComponent.propTypes = { 
	offer: React.PropTypes.object.isRequired, 
	eventbus: React.PropTypes.object.isRequired,
	addbutton: React.PropTypes.bool,
	removebutton: React.PropTypes.bool,
};

OfferRowComponent.defaultProps = {
	addbutton: false,
  removebutton: false
};