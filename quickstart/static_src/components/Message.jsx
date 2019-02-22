import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

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

        const {message, sender} = this.props;

        return (
<div className='message-one'>
    {[
                <Chip key='first' className={sender === 'Bot' ? 'bot-message' : 'my-message'}>{message}</Chip>,
                <div className='sub-message' key="second">
                    {sender === 'Bot' && [<div key='1' className={'bot-message-sub'}>Бот</div>,
                        <div key='2' className={'bot-message-sub'}>{hour}:{minute} {day}-{month}-{year}</div>]}

                    {sender !== 'Bot' && [<div key='1' className={'my-message-sub'}>Я</div>,
                        <div key='2' className={'my-message-sub'}>{hour}:{minute} {day}-{month}-{year}</div>]}
                </div>
            ]}
</div>
        )
    }
}
