"use strict";

import React from "react";

export default class RegistrationPaymentComponent extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
    	creditcard: null
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
	}

	onChangeHandler(evt) {
  	let data = [];
  	data[evt.target.name] = evt.target.value;
  	this.setState(data);  
  }

  onBlurHandler(evt) {
  	this.props.eventbus.emit("USER_CHANGED_EVT", {key: evt.target.name, value: evt.target.value});
  }

	render() {
		return (
			<section id="registration-payment" 
				className={this.props.currentFormPart === 'payment' ? 'visible' : 'hidden'}>
						<legend>How would you like to pay?</legend>
						<fieldset>
							<label htmlFor="creditcard">Creditcard</label>
							<input id="creditcard" name="creditcard" type="number" 
								value={this.state.creditcard} 
								onChange={this.onChangeHandler}
								onBlur={this.onBlurHandler}
								placeholder="Creditcard"/>
						</fieldset>
			</section>
			)
	}
}
