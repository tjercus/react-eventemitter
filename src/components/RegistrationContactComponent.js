"use strict";

import React from "react";

export default class RegistrationContactComponent extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
    	email: null,
    	phone: null
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
			<section id="registration-contact" 
			className={this.props.currentFormPart === 'contact' ? 'visible' : 'hidden'}>
			<legend>How can we contact you?</legend>
						<fieldset>
							<label htmlFor="email">Email</label>
							<input id="email" name="email" type="text"
								value={this.state.email} 
								onChange={this.onChangeHandler}
								onBlur={this.onBlurHandler}
								placeholder="Email" />
						</fieldset>

						<fieldset>
							<label htmlFor="phone">Telephone</label>
							<input id="phone" name="phone" type="tel"
								value={this.state.phone}
								onChange={this.onChangeHandler}
								onBlur={this.onBlurHandler}
								placeholder="Telephone"/>
			</fieldset>
		</section>);
	}
}
