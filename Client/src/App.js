import React, { Component } from 'react';
import Pusher from 'pusher-js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
    };
  }

  componentDidMount() {
    const pusher = new Pusher('b0b5ce82cd45e9728c5f', {
      cluster: 'ap2',
      encrypted: true,
    });

    const channel = pusher.subscribe('chatbot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
    console.log("message:", this.state.userMessage)
  };

  handleSubmit = event => {
    console.log("event:",event.target.value);
    this.setState({userMessage:''})
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;
    const msg = {
      text: this.state.userMessage,
      user: 'human',
    };
    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('http://192.168.1.73:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      })
    });
    document.getElementById("Input").value = "";
  };

  render() {
    const ChatBubble = (text, i, className) => {
      console.log("i=======>",i);
      console.log("className:",className)
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );
    return (
      <div>
        <h1>React Chatbot</h1>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit} autocomplete="off">
              <input
                defaultValue={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                id="Input"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;