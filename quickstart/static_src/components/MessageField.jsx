import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Message from './Message.jsx';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/action/input';
import {sendMessage, replyMessage} from '../actions/messageAction';

class MessageField extends React.Component {

    static propTypes = {
        chatId: PropTypes.string.isRequired,
        sendMessage: PropTypes.func.isRequired,
        replyMessage: PropTypes.func.isRequired,
        messageLists: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
    };

    state = {
        input: '',
    };

    componentDidUpdate(prevProps) {
        const {messageLists, messages, chatId} = this.props;
        const lastMessageId = messageLists[chatId][messageLists[chatId].length - 1];
        const lastMessageSender = messages[lastMessageId] ? messages[lastMessageId].sender : '';
        if (prevProps.messageLists[chatId].length < messageLists[chatId].length && lastMessageSender === "Me") {
            setTimeout(this.handleReplyMessage, 1000);
        }
        setTimeout(this.handleScroll, 1);
    }

    handleSendMessage = () => {
        const {input} = this.state;
        this.props.sendMessage(this.props.chatId, input);
        this.setState({input: ''});
    };

    handleReplyMessage = () => {
        this.props.replyMessage(this.props.chatId);
    };

    handleInput = (e) => {
        this.setState({input: e.target.value});
    };

    handleScroll = () => {
        const div = document.getElementById("scroll-div");
        div.scrollTop = div.scrollHeight - div.clientHeight;
    };

    isEmptyObject = (obj) => {
        for (let name in obj) {
            return false;
        }
        return true;
    };


    render() {
        const {messageLists, messages, curId, chatId} = this.props;
        const {input} = this.state;


        const messagesConst = messageLists[chatId].map((messageId, index) => <Message
            key={`${messageId}${index}`}
            message={messages[messageId].message}
            sender={messages[messageId].sender}/>);
        return (
            <div key="first">

                <br></br>
                <div className="message" id="scroll-div">
                    {this.isEmptyObject(messagesConst) && <span style={{opacity: 0.5}}>В чате нет сообщений</span>}
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

const mapStateToProps = ({messageReducer}) => ({
    messageLists: messageReducer.messageLists,
    messages: messageReducer.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage, replyMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
