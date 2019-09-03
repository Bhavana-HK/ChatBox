import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import chatBoxSaga from './saga'
import reducer from './reducer'


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(chatBoxSaga);

export default store;