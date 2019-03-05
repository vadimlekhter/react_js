import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../utils/schemas';

export const SEND_MESSAGE = '@@message/SEND_MESSAGE';

export const sendMessage = (chatId, input) => ({
    type: SEND_MESSAGE,
    chatId,
    input,
});

export const REPLY_MESSAGE = '@@message/REPLY_MESSAGE';

export const replyMessage = (chatId) => ({
    type: REPLY_MESSAGE,
    chatId,
});

export const ADD_CHAT = '@@message/ADD_CHAT';

export const addChat = () => ({
    type: ADD_CHAT,
});

export const START_CHATS_LOADING = '@@message/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@message/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@message/ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: '/api/chats/',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [chats]),
                ),
            },
            ERROR_CHATS_LOADING,
        ],
    },
});