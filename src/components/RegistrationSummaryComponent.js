"use strict";

import React from "react";
//import User from "../models/User";
//import Result from "../models/Result";

export default class RegistrationSummaryComponent extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
    	name: null,
    	gender: null,
    	state: null,
    	email: null,
    	phone: null,
    	creditcard: null
    }
	}

	componentDidMount() {		
		this.props.eventbus.on("USER_CHANGED_EVT", ((dataObj) => {
			let data = [];
			data[dataObj.key] = dataObj.value;
			this.setState(data);
		}));
	}	

	render() {
		return (
			<section id="registration-summary" 
				className={this.props.currentFormPart === 'summary' ? 'visible' : 'hidden'}>
						<legend>Summary</legend>
						<fieldset>
							<dl>
								<dt>Name</dt>
								<dd>{this.state.name}</dd>
								<dt>Gender</dt>
								<dd>{this.state.gender}</dd>
								<dt>State</dt>
								<dd>{this.state.state}</dd>
								<dt>Email</dt>
								<dd>{this.state.email}</dd>
								<dt>Telephone</dt>
								<dd>{this.state.phone}</dd>
								<dt>Name</dt>
								<dd>{this.state.creditcard}</dd>
							</dl>
						</fieldset>

						<button onClick={this.register} className="pure-button pure-button-primary">{"Register"}</button>
			</section>
			)
		}
	}
