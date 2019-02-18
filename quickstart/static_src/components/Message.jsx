import React from 'react';
import PropTypes from 'prop-types';
import MessageField from './MessageField.jsx';
export default class Message extends React.Component {
static propTypes = {
    message: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
};


    render() {

        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();

        return ([<div key = 'first' className={this.props.message === 'Я бот' ? 'bot-message':'my-message'}>{this.props.message}</div>,
            <div key="second">
                {this.props.message === 'Я бот' && [<p key = '1' className={'bot-message-sub'}>Бот</p>,
                    <p key = '2' className={'bot-message-sub'}>{hour}:{minute} {day}-{month}-{year}</p>]}

                {this.props.message !== 'Я бот' && [<p key ='1' className={'my-message-sub'}>Я</p>,
                    <p key = '2' className={'my-message-sub'}>{hour}:{minute} {day}-{month}-{year}</p>]}
            </div>])
    }
}
