import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {red500, black} from 'material-ui/styles/colors';

export default class ChatList extends React.Component {

    static propTypes = {
        chatId: PropTypes.string.isRequired,
    };


    render() {
        const {chatId} = this.props;

        return (
            <List>
                <Link to="/chat/1/" style={{ textDecoration: 'none' }}><ListItem style={chatId==='1' ? {color: red500}:{color: black}}
                      primaryText="Chat 1" leftIcon={<ContentInbox/>}/></Link>
                <Link to="/chat/2/" style={{ textDecoration: 'none' }}><ListItem style={chatId==='2' ? {color: red500}:{color: black}}
                    primaryText="Chat 2" leftIcon={<ActionGrade/>}/></Link>
                <Link to="/chat/3/" style={{ textDecoration: 'none' }}><ListItem style={chatId==='3' ? {color: red500}:{color: black}}
                    primaryText="Chat 3" leftIcon={<ContentSend/>}/></Link>
                <Link to="/chat/4/" style={{ textDecoration: 'none' }}><ListItem style={chatId==='4' ? {color: red500}:{color: black}}
                    primaryText="Chat 4" leftIcon={<ContentDrafts/>}/></Link>
                <Link to="/chat/5/" style={{ textDecoration: 'none' }}><ListItem style={chatId==='5' ? {color: red500}:{color: black}}
                    primaryText="Chat 5" leftIcon={<ContentInbox/>}/></Link>
            </List>)
    }
}
