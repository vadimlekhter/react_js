import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/action/input';

export default class MessageField extends React.Component {

    static propTypes = {
        chatId: PropTypes.string.isRequired,
    };

    state = {
        curId: 1,
        messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
        messages: {},
        input: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const {messageLists, messages, curId, input} = this.state;
        const {chatId} = this.props;
        const lastMessageId = messageLists[this.props.chatId][messageLists[this.props.chatId].length - 1];
        const lastMessageSender = messages[lastMessageId] ? messages[lastMessageId].sender : '';
        if (prevState.messageLists[chatId].length < messageLists[chatId].length && lastMessageSender === "Me") {
            setTimeout(this.handleReplyMessage, 2000);
        }
    }

    handleReplyMessage = () => {
        const {messageLists, messages, curId, input} = this.state;
        const {chatId} = this.props;

        const messageList = [...messageLists[chatId], curId];
        const newMessageLists = Object.assign({}, messageLists, {[chatId]: messageList});

        const newMessages = Object.assign({}, messages, {[curId]: {sender: 'Bot', message: 'Я бот', chatId: chatId}});
        this.setState({messageLists: newMessageLists, messages: newMessages, input: '', curId: curId + 1});

        this.handleScroll();

    };

    handleSendMessage = () => {
        const {messageLists, messages, curId, input} = this.state;
        const {chatId} = this.props;

        const messageList = [...messageLists[chatId], curId];
        const newMessageLists = Object.assign({}, messageLists, {[chatId]: messageList});

        messages[curId] = {sender: 'Me', message: input, chatId: chatId};
        this.setState({messageLists: newMessageLists, messages, input: '', curId: curId + 1});

        setTimeout(this.handleScroll,1);
    };

    handleInput = (e) => {
        this.setState({input: e.target.value});
    };

    isEmptyObject = (obj) => {
        for (let name in obj) {
            return false;
        }
        return true;
    };

    handleScroll = () => {
        const div = document.getElementById("scroll-div");
        div.scrollTop = div.scrollHeight - div.clientHeight;
    };

    render() {
        const {messageLists, messages, curId, input} = this.state;
        const {chatId} = this.props;

        const messagesConst = messageLists[chatId].map((messageId, index) => <Message
            key={`${messageId}${index}`}
            message={messages[messageId].message}
            sender={messages[messageId].sender}/>);
        return (
            <div key="first">
                {this.isEmptyObject(messagesConst) && <span style={{opacity: 0.5}}>Сообщений нет</span>}
                <br></br>
                <div className="message" id="scroll-div">
                    {messagesConst}
                </div>
                <br></br>
                <br></br>
                <TextField hintText="Ваше сообщение" name="input"
                           value={input} onChange={this.handleInput}/>
                <FloatingActionButton backgroundColor='brown'
                                      onClick={this.handleSendMessage}><SendIcon/></FloatingActionButton>
            </div>
        )
    }
}
