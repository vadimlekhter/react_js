import React from 'react';
import PropTypes from 'prop-types';
import MessageField from './MessageField.jsx';
import ChatList from './ChatList.jsx';
import Header from './Header.jsx';
import '../styles.css';

export default class Layout extends React.Component {

    static propTypes = {
        chatId: PropTypes.string,
    };


    static defaultProps = {
        chatId: '1',
    };

    render() {
        const {chatId} = this.props;

        return (
            [<Header key='1'/>,
                <div key='2' className="layout">
                    <div className="layout-left-side">
                        <ChatList chatId={chatId}/>
                    </div>
                    <div className="layout-right-side">
                        <MessageField
                            chatId={chatId}
                            isEmptyObject={this.isEmptyObject}
                            //handleScroll={this.handleScroll()}
                        />
                    </div>
                </div>
            ]
        )
    }
}