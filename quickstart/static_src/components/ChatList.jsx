import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {addChat, loadChats} from '../actions/messageAction';
import connect from 'react-redux/es/connect/connect';
import {red500, black} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';

class ChatList extends React.Component {

    static propTypes = {
        chatId: PropTypes.string.isRequired,
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        addChat: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
    };

    componentDidMount () {
        this.props.loadChats();
}

    static defaultProps = {
        data: 'Пусто',
    };

    handleChangeChat = (chatId) => {
        this.props.push(`/chat/${chatId}/`)
    };

    handleAddChat = () => {
        this.props.addChat();
    };

    render() {
        const {chats} = this.props;
        const chatItems = Object.keys(chats).map((chatId) =>
            <div key={chatId} className="listitem" id={chatId}>
                <ListItem
                    style={this.props.chatId === chatId ? {color: red500} : {color: black}}
                    primaryText={`${chats[chatId].name}`}
                    onClick={() => this.handleChangeChat(chatId)}
                />
                {chats[chatId].messages.length}
            </div>
        );


        return (
            <List>
                {chatItems}
                <ListItem
                    primaryText='Добавить новый чат'
                    leftIcon={<AddIcon/>}
                    onClick={this.handleAddChat}
                />
            </List>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageLists: messageReducer.messageLists,
    chats: messageReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({push, addChat, loadChats}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);