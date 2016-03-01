import React from "react";
import ee from "event-emitter";

export default class EchoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "no message"
    }
  }
  
  componentDidMount() {    
    this.props.eventbus.on("ECHO_CMD", ((obj) => {
      this.setState({message: obj});
    }));
    this.props.eventbus.on("MENU_CLICK_EVT", ((obj) => {
      this.setState({message: obj});
    }));   
  }
  
  render() {
    return (
      <section className="panel">
        <div className="panel-body">
          {"Echo: " + this.state.message}
        </div>
      </section>
    );
  }
};
