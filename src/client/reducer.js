import {
    JOIN_CHAT, SET_USERNAME, UPDATE_USERS_LIST, ADD_MESSAGE,
    CHANGE_INPUT_TEXT, CLEAR_MESSAGE, ADD_SOCKET, CHAT_READY, CHANGE_GIF_QUERY,
    NEW_GIFS, NO_GIFS_FETCHED, CHANGE_INPUT_GIF, INCREMENT_OFFSET
} from './actionCreator'
import { combineReducers } from 'redux';
var generateUID = () => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('uid', text);
    return text;
}

var initialState = {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : generateUID(),
    chatReady: false,
    users: [],
    messages: [],
    message: { text: '', gif: undefined },
    socket: null,
    gif: {
        GIFs: [],
        gifQuery: '',
        gifMessage: 'Input a query to search related gif results',
        offset: 0,
    },
}

var chat = (state = initialState, action) => {
    switch (action.type) {
        case JOIN_CHAT: localStorage.setItem('username', state.username);
            return { ...state, chatReady: true };
        case CHAT_READY: return { ...state, chatReady: true };
        case SET_USERNAME: return { ...state, username: action.username };
        case UPDATE_USERS_LIST: return { ...state, users: action.users };
        case ADD_MESSAGE: return { ...state, messages: [...state.messages, action.message] };
        case CHANGE_INPUT_TEXT: return { ...state, message: { ...state.message, text: action.text } };
        case CLEAR_MESSAGE: return { ...state, message: initialState.message, gif: initialState.gif };
        case ADD_SOCKET: return { ...state, socket: action.socket };
        case CHANGE_GIF_QUERY: return { ...state, gif: { ...initialState.gif, gifQuery: action.gifQuery } };
        case NEW_GIFS: return {
            ...state,
            gif: { ...state.gif, GIFs: [...state.gif.GIFs, ...action.gifsFetched], gifMessage: '' }
            // GIFs: [...state.gif.GIFs, ...action.gifsFetched]
        };
        case NO_GIFS_FETCHED: return {
            ...state,
            gif: { ...state.gif, GIFs: [], gifMessage: 'No GIFs found. Retry with another keyword' }
        };
        case CHANGE_INPUT_GIF: return { ...state, message: { ...state.message, gif: action.gif } }
        case INCREMENT_OFFSET: return {...state, gif: {...state.gif, offset:state.gif.offset+10}}
        default: return state;
    }
}

var chatReducer = combineReducers({
    chat,
})

export default chatReducer;