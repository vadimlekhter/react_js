import React from 'react';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    state = {
        curId: 1,
        messageList: [],
        messages: {},
        input: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const lastMessageId = this.state.messageList[this.state.messageList.length - 1];
        const lastMessageSender = this.state.messages[lastMessageId] ? this.state.messages[lastMessageId].sender : '';


        if (prevState.messageList.length < this.state.messageList.length && lastMessageSender === "Me") {
            setTimeout(this.handleReplyMessage, 2000);
        }
    }
    handleReplyMessage = () => {
            const messageList = this.state.messageList.slice();
            messageList.push(this.state.curId);
            const messages = this.state.messages;
            messages[this.state.curId] = {sender: 'Bot', message: 'Я бот'};
            this.setState({messageList, messages, input: '', curId: this.state.curId + 1});
    };

    handleSendMessage = () => {
        const messageList = this.state.messageList.slice();
        messageList.push(this.state.curId);
        const messages = this.state.messages;
        messages[this.state.curId] = {sender: 'Me', message: this.state.input};
        this.setState({messageList, messages, input: '', curId: this.state.curId + 1});
    };
    handleInput = (e) => {
        this.setState({input: e.target.value});
    };

    render() {
        const messages = this.state.messageList.map((messageId, index) => <Message key={`${messageId}${index}`}
                                                                                   message={this.state.messages[messageId].message}/>);
        return (
            <div key="first">
                <br></br>
                <br></br>
                {this.state.messages.length == 0 && <span style={{opacity: 0.5}}>Сообщений нет</span>}
                <br></br>
                {messages}
                <br></br>
                <br></br>
                <input name="input" value={this.state.input} onChange={this.handleInput}/>
                <button name="messages" onClick={this.handleSendMessage}>Отправить сообщение</button>
            </div>
        )
    }
}
