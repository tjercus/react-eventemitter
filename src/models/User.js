"use strict";

import Result from "./Result";
import {STATES} from "./States";

export default class User {

	constructor(values = {}) {
		this.name = values.name || "",
		this.gender = values.gender || "",
		this.state = values.state || "",
		this.phone = values.phone || "",
		this.email = values.email || "",
		this.creditcard = values.creditcard	|| ""	
	}	

	validateName() {		
		let result = new Result();
		if (this.name === undefined || this.name === null || this.name === '' && this.name.length === 0) {
			result.addErrorMessage('name is required');
		}
		return result;
	}

	validateEmail() {		
		let result = new Result();
		if (this.email === undefined || this.email === null) {
			result.addErrorMessage('email is required');
		} else if (this.email.indexOf('@') === -1) {
			result.addErrorMessage('email pattern is not ok');
		}
		return result;
	}

	validate() {		
		let totalResult = new Result();		
		totalResult.addErrorMessages(this.validateName().getErrorMessages());
		totalResult.addErrorMessages(this.validateEmail().getErrorMessages())
		return totalResult;
	}
}