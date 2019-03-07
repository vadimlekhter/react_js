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
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        isLoading:PropTypes.bool.isRequired,
    };

    state = {
        input: '',
    };

    componentDidUpdate() {

        setTimeout(this.handleScroll, 1);
    }

    handleSendMessage = () => {
        const {input} = this.state;
        this.props.sendMessage(this.props.chatId, input);
        this.setState({input: ''});
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

        if (this.props.isLoading) {
            return (<div>Загрузка...</div>)
        }


        const {chats, messages, curId, chatId} = this.props;
        const {input} = this.state;


        const messagesConst = chats[chatId].messages.map((messageId, index) => <Message
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
    chats: messageReducer.chats,
    messages: messageReducer.messages,
    isLoading: messageReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage, replyMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
