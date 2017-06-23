/**
 * Creates components dynamically when needed
 * @param {EventEmitter} eventbus
 * @constructor
 */

const components = new Map();

export default function ComponentManager(eventbus) {

  const registerComponent = (componentSpec) => {
    // TODO create a react component
    const concreteComponent = {};
    // add to stack
    components.push(concreteComponent);
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
