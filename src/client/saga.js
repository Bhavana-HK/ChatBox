import { all, fork, takeEvery, call, put, select, takeLatest, take } from 'redux-saga/effects'
import {
    INIT_CHAT, updateUsersList, addMessage, SEND_MESSAGE, clearMessage,
    addSocket, chatReady, CHECK_IF_JOINED, initChat, GET_GIFS, newGifs, 
    noGifsFetched, SEND_GIF, sendMessage, changeInputGif, ADD_MORE_GIFS,incrementOffset
} from './actionCreator';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { getGIFs } from './gifAPI'
import { isNullOrUndefined } from 'util';

var connect = (username, uid) => {
    //console.log("on connect: "+username, uid)
    let socket = io.connect('http://localhost:8900', {
        query: "username=" + username + "&uid=" + uid
    });
    return new Promise((resolve, reject) => {
        socket.on('connect', () => {
            //console.log('connected with the server');
            resolve(socket)
        })
    })
}

var createSocketChannel = (socket) => {
    return eventChannel(emitter => {
        socket.on("updateUsersList", (users) => {
            console.log(users)
            emitter(updateUsersList(users));
        });
        socket.on("message", (message) => {
            console.log(message)
            emitter(addMessage(message));
        })
        socket.on("testEvent", (payload) => {
            console.log(payload)
        })
        // provide an unsubscribe method
        return () => {
            socket.off("updateUsersList", (users) => {
                emitter(updateUsersList(users));
            });
            socket.off("message", (message) => {
                emitter(addMessage(message));
            })
        }
    })
}

function* initChatSaga() {
    let state = yield select()
    let socket = yield call(connect, state.chat.username, state.chat.uid)
    yield put(addSocket(socket))
    let socketChannel = yield call(createSocketChannel, socket)
    while (true) {
        const event = yield take(socketChannel);
        yield put(event);
    }

}

function* sendMessageSaga(action) {
    try {
        let state = yield select(state => state.chat);
        // console.log("from the saga:"+ JSON.stringify(state))
        // yield call(connect, state.username, state.uid )
        let message = {
            type: action.messageType,
            message: state.message,
            username: state.username,
            uid: state.uid,
        }
        yield put(clearMessage())
        yield put(addMessage(message))
        state.socket.emit('newMessage', message)
    }
    catch (error) {
        console.log("error occured", error)
    }
}

function* checkIfJoinedSaga() {
    let state = yield select(state => state.chat);
    if (state.username != '') {
        yield put(chatReady())
        yield put(initChat())
    }
}

function* getGIFsSaga() {
    try {
        let state = yield select(state => state.chat.gif)
        let gifsFetched = yield call(getGIFs, state.gifQuery, state.offset)
        if (!isNullOrUndefined(gifsFetched) && gifsFetched.length > 0)
            yield put(newGifs(gifsFetched))
        else
            yield put(noGifsFetched())
    }
    catch (err) {
        console.log(err.code +'\n'+ err.message);
        console.log(err.stack)
    }
}
function* sendGifSaga(action){
    yield put(changeInputGif(action.gif));
    yield put(sendMessage('gif'));
    yield put(clearMessage())
}

function* addMoreGifsSaga() {
yield put(incrementOffset())
yield call(getGIFsSaga)
}

function* chatWatcher() {
    yield takeEvery(INIT_CHAT, initChatSaga);
    yield takeEvery(SEND_MESSAGE, sendMessageSaga);
    yield takeEvery(CHECK_IF_JOINED, checkIfJoinedSaga);
    yield takeEvery(GET_GIFS, getGIFsSaga);
    yield takeEvery(SEND_GIF, sendGifSaga);
    yield takeEvery(ADD_MORE_GIFS, addMoreGifsSaga);
}

function* chatSaga() {
    yield all([
        chatWatcher(),
    ]);
}

export default chatSaga;

 // const socket = io.connect('http://localhost:8900', {
    //     query: "username:"+state.username+"&uid"+state.uid
    // });
    // socket.on("updateUsersList", (users)=>{
    //     yield put(updateUsersList(users));
    // });
    // socket.on("message", (message)=>{
    //     yield put(addMessage(message));
    // })
