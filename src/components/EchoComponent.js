import React from "react";
import EventEmitter from "eventemitter2";

export default class EchoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "no message"
    }
  }
  
  componentDidMount() {
    this.props.eventbus.on("*", ((obj) => {
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
