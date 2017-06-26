/**
 * Creates components dynamically when needed
 * @param {EventEmitter} eventbus
 * @constructor
 */

import uuid from "uuid";
import * as React from "react";
import immutable from "immutable";

let components = new immutable.Map();

export default function ComponentManager(eventbus) {

  const registerComponent = (componentSpec) => {
    console.log("ComponentManager.registerComponent", JSON.stringify(componentSpec));
    components = components.set(componentSpec.from, createComponent(componentSpec));
    console.log(`ComponentManager pool of components 1:`, components.size);
  };

  const createComponent = (componentSpec) => {
    return React.createElement(componentSpec.type, [componentSpec.name, componentSpec.from, componentSpec.active]);
  };

  eventbus.on("MENU_CLICK_EVT", data => {
    console.log(`ComponentManager.on MENU_CLICK_EVT ${JSON.stringify(data)}`);
    console.log(`ComponentManager pool of components 2:`, components.size);
    console.log(`ComponentManager pool of components keys:`, components.keys());
    // find component by name
    let found = Object.assign({}, components.get(data));
    // console.log(`ComponentManager.on MENU_CLICK_EVT found: ${JSON.stringify(found)}`);
    if (found) {
      // set component as active
      found.active = true;
      // writeback component into components
      components = components.set(data.name, found);
      eventbus.emit("COMPONENT_ACTIVATED_EVT", components.values());
    } else {
      console.log(`ComponentManager.on MENU_CLICK_EVT component not found ...`);
    }
  });

  return { registerComponent: registerComponent };
}
