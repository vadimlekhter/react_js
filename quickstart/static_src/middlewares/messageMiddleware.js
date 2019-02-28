//import { LOCATION_CHANGE } from 'react-router-redux'
import { SEND_MESSAGE, replyMessage, REPLY_MESSAGE } from '../actions/messageAction';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            console.log('salkfnaskn');
            break;
        default:
            break;
    }
    return next (action);
}