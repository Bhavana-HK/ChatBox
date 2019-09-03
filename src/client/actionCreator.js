export const SET_USERNAME = 'SET_USERNAME';
export const JOIN_CHAT = 'JOIN_CHAT';
export const INIT_CHAT = 'INIT_CHAT';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CHANGE_INPUT_TEXT = 'CHANGE_INPUT_TEXT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const ADD_SOCKET = 'ADD_SOCKET';
export const CHECK_IF_JOINED = 'CHECK_IF_JOINED';
export const CHAT_READY = 'CHAT_READY';
export const CHANGE_GIF_QUERY = 'CHANGE_GIF_QUERY';
export const GET_GIFS = 'GET_GIFS';
export const NEW_GIFS= 'NEW_GIFS';
export const NO_GIFS_FETCHED ='NO_GIFS_FETCHED';
export const SEND_GIF = 'SEND_GIF';
export const CHANGE_INPUT_GIF = 'CHANGE_INPUT_GIF';
export const ADD_MORE_GIFS = 'ADD_MORE_GIFS';
export const INCREMENT_OFFSET = 'INCREMENT_OFFSET';

export const joinChat = () => {
    return { type: JOIN_CHAT, }
}

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        username,
    }
}

export const initChat = () => {
    return { type: INIT_CHAT }
}

export const updateUsersList = (users) => {
    return {
        type: UPDATE_USERS_LIST,
        users,
    }
}

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message,
    }
}

export const changeInputText = (text) => {
    return {
        type: CHANGE_INPUT_TEXT,
        text,
    }
}

export const sendMessage = (messageType) => {
    return {
        type: SEND_MESSAGE,
        messageType,
    }
}

export const clearMessage = () => {
    return { type: CLEAR_MESSAGE, }
}

export const addSocket = (socket) => {
    return {
        type: ADD_SOCKET,
        socket,
    }
}

export const checkIfJoined = () => {
    return { type: CHECK_IF_JOINED, }
}

export const chatReady = () => {
    return { type: CHAT_READY, }
}

export const changeGifQuery = (gifQuery) => {
    return {
        type: CHANGE_GIF_QUERY,
        gifQuery,
    }
}

export const getGIFs = (gifQuery) => {
    return { type: GET_GIFS, gifQuery}
}

export const newGifs = (gifsFetched) =>{
    return {type: NEW_GIFS, gifsFetched}
}

export const noGifsFetched = () =>{
    return {type: NO_GIFS_FETCHED, }
}

export const sendGif = (gif) => {
    return {type:SEND_GIF, gif}
}

export const changeInputGif = (gif) => {
    return {type:CHANGE_INPUT_GIF, gif}
}

export const addMoreGifs=()=>{
    return {type:ADD_MORE_GIFS}
}

export const incrementOffset=()=>{
    return {type:INCREMENT_OFFSET}
}