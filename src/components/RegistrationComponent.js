"use strict";

import React from "react";
import User from "../models/User";
import Result from "../models/Result";
import RegistrationPersonComponent from "./RegistrationPersonComponent";
import RegistrationContactComponent from "./RegistrationContactComponent";
import RegistrationPaymentComponent from "./RegistrationPaymentComponent";
import RegistrationSummaryComponent from "./RegistrationSummaryComponent";

const FORM_PARTS = [
	"person",
	"contact",
	"payment",
	"summary"
];

export default class RegistrationComponent extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentFormPart: "person",
      errorMessages: []
    };
    this.user = new User();
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);   
    this.goPrevious = this.goPrevious.bind(this);
    this.goNext = this.goNext.bind(this);
    this.validateUser = this.validateUser.bind(this);   
  }

  componentDidMount() {    
    this.props.eventbus.on("MENU_CLICK_EVT", ((menuItemName) => {
      if (menuItemName === this.props.from) {        
        this.setState({isVisible: true});
      } else {
        this.setState({isVisible: false});      
			}
		}));
		this.props.eventbus.on("USER_CHANGED_EVT", ((dataObj) => {
			this.user[dataObj.key] = dataObj.value;
		}));
  }  

	validateUser() {		
		const result = this.user.validate();  	
  	this.setState({errorMessages: result.getErrorMessages()});  	
	}

  onPreviousClick(evt) {  	
  	evt.preventDefault();  	
  	this.validateUser();
  	this.goPrevious();
  }

  goPrevious() {
  	let currentIndex = FORM_PARTS.indexOf(this.state.currentFormPart);  	
  	let newIndex = FORM_PARTS.indexOf(this.state.currentFormPart) - 1;
  	let lastIndex = (FORM_PARTS.length - 1);
  	if (newIndex < 0) newIndex = lastIndex;  	
  	this.setState({currentFormPart: FORM_PARTS[newIndex]});
  }

  onNextClick(evt) {  
  	evt.preventDefault();
  	this.validateUser();
  	this.goNext();  
	}

	goNext() {
  	let currentIndex = FORM_PARTS.indexOf(this.state.currentFormPart);
  	let newIndex = FORM_PARTS.indexOf(this.state.currentFormPart) + 1;
  	let lastIndex = (FORM_PARTS.length - 1);
  	if (newIndex > lastIndex) newIndex = 0;  	
  	this.setState({currentFormPart: FORM_PARTS[newIndex]});
  }

  render() {
  	let panelClassName = this.state.isVisible ? "panel visible" : "panel hidden";  	
  	let errorLis = [];  	
    this.state.errorMessages.map((msg, i) => {    	
      errorLis.push(<li key={i}>{msg}</li>);
    })
  	return (
  		<section id="regform" className={panelClassName}>
  			<form name="registration-form" className="pure-form pure-form-stacked">
					<RegistrationPersonComponent currentFormPart={this.state.currentFormPart} eventbus={this.props.eventbus} />
					<RegistrationContactComponent currentFormPart={this.state.currentFormPart} eventbus={this.props.eventbus} />
					<RegistrationPaymentComponent currentFormPart={this.state.currentFormPart} eventbus={this.props.eventbus} />
					<RegistrationSummaryComponent currentFormPart={this.state.currentFormPart} eventbus={this.props.eventbus} />

					<section id="error-messages" className={this.state.errorMessages.length > 0 ? 'visible' : 'hidden'}>
						<ul role="alert">						
							{errorLis}
						</ul>
					</section>

					<nav>
						<ul>
							<li><a onClick={this.onPreviousClick} className="pure-button">{"Previous"}</a></li>
							<li><button onClick={this.onNextClick} className="pure-button pure-button-primary">{"Next"}</button></li>
						</ul>
					</nav>
				</form>
  		</section>)
  }

}

// RegistrationComponent.prototype.propTypes: {
// 	value: React.PropTypes.object.isRequired,
//   onChange: React.PropTypes.func.isRequired
// }

