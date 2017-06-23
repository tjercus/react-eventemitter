/**
 * Creates components dynamically when needed
 * @param {EventEmitter} eventbus
 * @constructor
 */

import uuid from "uuid";
import * as React from "react";

const components = new Map();

export default function ComponentManager(eventbus) {

  const registerComponent = (componentSpec) => {
    components.set(componentSpec.name, createComponent(componentSpec));
  };

  const createComponent = (componentSpec) => {
    return React.createElement(componentSpec.type, [componentSpec.name, componentSpec.from, componentSpec.active]);
  };

  eventbus.on("MENU_CLICK_EVT", data => {
    console.log(`componentDidMount ${JSON.stringify(data)}`);
    // find component by name
    const found = components.get(data.name);
    if (found && found.active === false) {
      // set component as active
      found.active = true;
      // writeback component into components
      components.set(data.name, found);
      eventbus.emit("COMPONENT_ACTIVATED_EVT", components);
    }
  });

  return { registerComponent: registerComponent };
}
