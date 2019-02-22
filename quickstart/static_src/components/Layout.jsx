import React from 'react';
import PropTypes from 'prop-types';
import MessageField from './MessageField.jsx';
import ChatList from './ChatList.jsx';
import '../styles.css';

export default class Layout extends React.Component {

    static propTypes = {
    chatId: PropTypes.string,
};



    static defaultProps = {
        chatId :'1',
    };


    render() {
        const {chatId} = this.props;

        return (
            <div className="layout">
                <div className="layout-left-side">
                    <ChatList chatId={chatId}/>
                </div>
                <div className="layout-right-side">
                    <MessageField chatId={chatId}/>
                </div>
            </div>
        )
    }
}