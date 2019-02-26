import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {red500, black} from 'material-ui/styles/colors';

class ChatList extends React.Component {

    static propTypes = {
        chatId: PropTypes.string.isRequired,
        messageLists: PropTypes.object.isRequired,
    };

    render() {
        const {chatId, messageLists} = this.props;

        return (
            <List>
                <Link to="/chat/1/" style={{textDecoration: 'none'}}>
                    <div className="listitem">
                        <ListItem
                            style={chatId === '1' ? {color: red500} : {color: black}}
                            primaryText="Chat 1" leftIcon={<ContentInbox/>}/>{messageLists[1].length}
                    </div>
                </Link>


                <Link to="/chat/2/" style={{textDecoration: 'none'}}>
                    <div className="listitem">
                        <ListItem
                            style={chatId === '2' ? {color: red500} : {color: black}}
                            primaryText="Chat 2" leftIcon={<ActionGrade/>}/>{messageLists[2].length}
                    </div>
                </Link>


                <Link to="/chat/3/" style={{textDecoration: 'none'}}>
                    <div className="listitem">
                        <ListItem
                            style={chatId === '3' ? {color: red500} : {color: black}}
                            primaryText="Chat 3" leftIcon={<ContentSend/>}/>{messageLists[3].length}
                    </div>
                </Link>


                <Link to="/chat/4/" style={{textDecoration: 'none'}}>
                    <div className="listitem">
                        <ListItem
                            style={chatId === '4' ? {color: red500} : {color: black}}
                            primaryText="Chat 4" leftIcon={<ContentDrafts/>}/>{messageLists[4].length}
                    </div>
                </Link>


                <Link to="/chat/5/" style={{textDecoration: 'none'}}>
                    <div className="listitem">
                        <ListItem
                            style={chatId === '5' ? {color: red500} : {color: black}}
                            primaryText="Chat 5" leftIcon={<ContentInbox/>}/>{messageLists[5].length}
                    </div>
                </Link>
            </List>)
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageLists: messageReducer.messageLists,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);