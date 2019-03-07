import {LOCATION_CHANGE} from 'react-router-redux'
import {SEND_MESSAGE, replyMessage, REPLY_MESSAGE} from '../actions/messageAction';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            setTimeout(() => store.dispatch(replyMessage(action.chatId)), 2000);
            break;
        case REPLY_MESSAGE:
            let chat = document.getElementById(action.chatId);
            chat.style.backgroundColor = 'lightgreen';
            setTimeout(() => chat.style.backgroundColor = '', 2000);
            break;
        case LOCATION_CHANGE:
            break;

        default:
            break;
    }
    return next(action);
}