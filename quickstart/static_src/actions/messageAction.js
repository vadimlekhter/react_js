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