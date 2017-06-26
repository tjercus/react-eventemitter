import React from "react";
import packageJSON from "../../package.json";
import EventEmitter from "eventemitter4";
import EchoComponent from "./EchoComponent";
import MenuComponent from "./MenuComponent";
import PanelComponent from "./PanelComponent";
import ComponentManager from "../ComponentManager";
import * as uuid from "uuid";

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayableComponents: []
    };
    this.eventbus = new EventEmitter({wildcard: true});
    this.componentManager = ComponentManager(this.eventbus);
    this.componentManager.registerComponent({
      type: "PanelComponent",
      name: "panel-three",
      from: "menu-item-three",
      active: false,
    });
  }

  componentDidMount() {
    this.eventbus.on("COMPONENT_ACTIVATED_EVT", (components) => {
      console.log("COMPONENT_ACTIVATED_EVT");
      this.setState({displayableComponents: components});
    });
    this.eventbus.on("COMPONENT_DEACTIVATED_EVT", (components) => {
      this.setState({displayableComponents: components});
    });
    this.eventbus.emit("ECHO_CMD", "echoing works!");
  }

  render() {
    const version = packageJSON.version;
    console.log("DisplayableComponents.render:", JSON.stringify(this.state.displayableComponents));
    return (
      <div>
        <header>
          <h1>React with EventManager example {version}</h1>
        </header>
        <article id="container">
          <aside className="aside-nav">
            <MenuComponent eventbus={this.eventbus} />
          </aside>
          <main>
            <EchoComponent eventbus={this.eventbus} />
            <PanelComponent eventbus={this.eventbus} name="panel-one" from="menu-item-one" />
            <PanelComponent eventbus={this.eventbus} name="panel-two" from="menu-item-two" />
            {this.state.displayableComponents.map(comp => {
              comp.key = uuid();
              return comp;
            })}
          </main>
        </article>
      </div>
    )
  }
};
