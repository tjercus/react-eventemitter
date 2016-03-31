"use strict";

import React from "react";
import {STATES} from "../models/States";

export default class RegistrationPersonComponent extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
    	name: null,
    	gender: null,
    	state: null
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
		let stateOptions = [];
    STATES.map((state, i) => {
      stateOptions.push(<option key={i}>{state}</option>);
    })
		return (
			<section id="registration-person" 
				className={this.props.currentFormPart==='person' ? 'visible' : 'hidden'}>
			    <legend>Who are you?</legend>
			    <fieldset>
			        <label htmlFor="name">Name</label>
			        <input id="name" name="name" type="text" 
			        value={this.state.name}
			        	onChange={this.onChangeHandler}
								onBlur={this.onBlurHandler} />
			    </fieldset>
			    <fieldset>
			        <label htmlFor="gender">Gender</label>
			        <label htmlFor="gender" className="pure-radio">
			            <input type="radio" name="gender" id="gender" 			            
			            	onChange={this.onChangeHandler}
										onBlur={this.onBlurHandler}
			            	value={this.state.gender} /> male
			        </label>
			        <label htmlFor="gender" className="pure-radio">
			            <input type="radio" name="gender" 
			            	onChange={this.onChangeHandler}
										onBlur={this.onBlurHandler}
			            	value={this.state.gender} /> female
			        </label>
			    </fieldset>
			    <fieldset>
			        <label htmlFor="state">State</label>
			        <select id="state" name="state" 
			        	value={this.state.state}
			        		onChange={this.onChangeHandler}
									onBlur={this.onBlurHandler}>
									{stateOptions}			            
			        </select>
			    </fieldset>
			</section>
		)
	}
}