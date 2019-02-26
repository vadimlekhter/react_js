import update from 'react-addons-update';
import {SEND_MESSAGE, REPLY_MESSAGE} from '../actions/messageAction';

const initialStore = {
    curId: 1,
    messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
    messages: {},
    messageCount: 0,
};


export default function testReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const {messageLists, messages, curId, messageCount} = store;
            const {chatId, input} = action;

            const messageList = [...messageLists[chatId], curId];
            messages[curId] = {sender: 'Me', message: input, chatId: chatId};

            return update(store, {
                messageLists: {$set: {...messageLists, ...{[chatId]: messageList}},},
                curId: {$set: curId + 1},
                messageCount: {$set:curId},
            })
        }

        case REPLY_MESSAGE: {
            const {messageLists, messages, curId} = store;
            const {chatId} = action;

            const messageList = [...messageLists[chatId], curId];
            return update(store, {
                messageLists: {$set: {...messageLists, ...{[chatId]: messageList}}},
                messages: {$set:{...messages, ...{[curId]: {sender: 'Bot', message: 'Я бот', chatId: chatId}}}},
                curId: {$set:curId + 1},
                messageCount: {$set:curId},
            })
        }
        default:
            return store;
    }
}