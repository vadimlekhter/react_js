import update from 'react-addons-update';
import {SEND_MESSAGE, REPLY_MESSAGE, ADD_CHAT} from '../actions/messageAction';

const initialStore = {
    curId: 1,
    messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
    messages: {},
    messageCount: 0,
    chats: {1: 'Chat 1', 2: 'Chat 2', 3: 'Chat 3', 4: 'Chat 4', 5: 'Chat 5'},
};


export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const {messageLists, messages, curId, messageCount} = store;
            const {chatId, input} = action;

            const messageList = [...messageLists[chatId], curId];
            messages[curId] = {sender: 'Me', message: input, chatId: chatId};

            return update(store, {
                messageLists: {$set: {...messageLists, ...{[chatId]: messageList}},},
                curId: {$set: curId + 1},
                messageCount: {$set: curId},
            })
        }

        case REPLY_MESSAGE: {
            const {messageLists, messages, curId} = store;
            const {chatId} = action;
            const messageList = [...messageLists[chatId], curId];
            return update(store, {
                messageLists: {$set: {...messageLists, ...{[chatId]: messageList}}},
                messages: {$set: {...messages, ...{[curId]: {sender: 'Bot', message: 'Я бот', chatId: chatId}}}},
                curId: {$set: curId + 1},
                messageCount: {$set: curId},
            })
        }

        case ADD_CHAT: {
            const newChatId = Object.keys(store.chats).length + 1;
            const newChats = {...store.chats, [newChatId]: `Chat ${newChatId}`};
            const newMessageLists = {...store.messageLists, [newChatId]: []};
            return update(store, {
                chats: {$set: newChats},
                messageLists: {$set: newMessageLists},
            });
        }

        default:
            return store;


    }
}