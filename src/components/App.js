import React from "react";
import packageJSON from "../../package.json";
import ee from "event-emitter";
import EchoComponent from "./EchoComponent";
import MenuComponent from "./MenuComponent";
import PanelComponent from "./PanelComponent";

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.eventbus = ee({});
  }
  
  componentDidMount() {
    this.eventbus.emit("ECHO_CMD", "echoing works!");
  }
  
  render() {
    const version = packageJSON.version;

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
          </main>
        </article>
      </div>
    )
  }
};
