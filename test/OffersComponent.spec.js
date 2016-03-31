//import {expect} from "chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import chai, {expect} from "chai";
import OffersComponent from "../src/components/OffersComponent";
import EventEmitter from "eventemitter2";

describe("OffersComponent", () => {

	let shallowRenderer;
	let eventbus;

  beforeEach(function () {
    shallowRenderer = TestUtils.createRenderer();
    eventbus = new EventEmitter({wildcard: true, delimiter: "_"});
  });

	it("should render ok", () => {		
    // when
    shallowRenderer.render(<OffersComponent eventbus={eventbus} name="foobar-panel" from="foobar" />);
    // then
    const renderedElement = shallowRenderer.getRenderOutput();
    expect(renderedElement.type).to.equal("section");    
  });

  it("should handle MENU_CLICK_EVT", () => {
		// given
		let eventbusSpy = sinon.spy(eventbus, "on");
    // when
    shallowRenderer.render(<OffersComponent eventbus={eventbus} name="foobar-panel" from="foobar" />);    
    eventbus.emit("MENU_CLICK_EVT", "foobar"); // TODO async
    // then
    const renderedElement = shallowRenderer.getRenderOutput();
    console.log(renderedElement);
    
    expect(renderedElement.type).to.equal("section");
    //expect(renderedElement.props.className).to.equal("panel visible");
    //expect(eventbusSpy.calledOnce).to.be.true;
  });

});