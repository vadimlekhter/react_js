import update from 'react-addons-update';
import {
    SEND_MESSAGE,
    REPLY_MESSAGE,
    ADD_CHAT,
    SUCCESS_CHATS_LOADING,
    START_CHATS_LOADING, ERROR_CHATS_LOADING
} from '../actions/messageAction';

const initialStore = {
    curId: 1,
    //chats: {1: 'Chat 1', 2: 'Chat 2', 3: 'Chat 3', 4: 'Chat 4', 5: 'Chat 5'},
    chats: {},
    messageLists: {1: [], 2: [], 3: [], 4: [], 5: []},
    //messageLists: {},
    messages: {},
    messageCount: 0,
    isLoading: true,
};


export default function messageReducer(store = initialStore, action) {

    switch (action.type) {
        case START_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                chats: {$set: action.payload.entities.chats},
                messages: {$set: action.payload.entities.messages},
                curId: {$set: Object.keys(action.payload.entities.messages).length + 1},
                isLoading: {$set: false},
            });
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }


        case SEND_MESSAGE: {
            const {messageLists, messages, curId, messageCount} = store;
            const {chatId, input} = action;
            const chat = store.chats[chatId];
            chat.messages.push(curId);
            messages[curId] = {'id': curId, message: input, sender: 'Me'};

            return update(store, {
                curId: {$set: curId + 1},
                messageCount: {$set: curId},
                chats: {$merge: {[chatId]: chat}}
            })
        }

        case REPLY_MESSAGE: {
            const {messageLists, messages, curId} = store;
            const {chatId} = action;

            const chat = store.chats[chatId];
            chat.messages.push(curId);

            return update(store, {
                messages: {$set: {...messages, ...{[curId]: {'id': curId, message: 'Я бот', sender: 'Bot'}}}},
                curId: {$set: curId + 1},
                messageCount: {$set: curId},
                chats: {$merge: {[chatId]: chat}}
            })
        }

        case ADD_CHAT: {
            const newChatId = Object.keys(store.chats).length + 1;
            const newChats = {
                ...store.chats,
                [newChatId]: {'id': [newChatId], 'name': `Chat ${newChatId}`, 'messages': []}
            };
            return update(store, {
                chats: {$set: newChats},
            });
        }

        default:
            return store;


    }
}