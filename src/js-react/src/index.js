import React from "react";
import ReactDom from "react-dom";
import SockJsClient from "react-stomp";
import UsernameGenerator from "username-generator";
import Fetch from "json-fetch";
import { TalkBox } from "react-talk";

const randomstring = require("randomstring");

class App extends React.Component {
  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.randomUserName = UsernameGenerator.generateUsername("-");
    this.randomUserId = randomstring.generate();
    this.state = {
      clientConnected: false,
      messages: []
    };
  }

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    try {
      this.clientRef.sendMessage("//localhost:8888/hello-world/ws/app/all", JSON.stringify(selfMsg));
      return true;
    } catch(e) {
      return false;
    }
  }

  componentWillMount() {
    Fetch("//localhost:8888/hello-world/ws/history", {
      method: "GET"
    }).then((response) => {
      this.setState({ messages: response.body });
    });
  }

  render() {
    const wsSourceUrl = window.location.protocol + "//localhost:8888/hello-world/ws/handler";
    console.log("wsSourceUrl:",wsSourceUrl);
    return (
      <div>
        <TalkBox topic="react-websocket-template" currentUserId={ this.randomUserId }
          currentUser={ this.randomUserName } messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>

        <SockJsClient url={ wsSourceUrl } topics={["/hello-world/ws/topic/all"]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false }/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
