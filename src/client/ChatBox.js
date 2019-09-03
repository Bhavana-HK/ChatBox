import React from 'react';
import { connect } from 'react-redux';
import EnterChat from './EnterChat';
import {joinChat, setUsername, initChat, checkIfJoined } from './actionCreator';
import Users from './Users';
import Messages from './Messages';

var mapStateToprops = (state) => {
    console.log(state);
    return state.chat;
}

var mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        joinChat : (event)=>{event.preventDefault();dispatch(joinChat()); dispatch(initChat())},
        setUsername : ({target})=>{dispatch(setUsername(target.value))},
        initChat: ()=>dispatch(initChat()),
        checkIfJoined : ()=>dispatch(checkIfJoined())
    }
}

class ChatBox extends React.Component {
    componentWillMount(){
        this.props.checkIfJoined();
    }
    render() {
        return (
            <div className="chat">
                {this.props.chatReady ? (
                    <React.Fragment>
                        <Users/>
                        <Messages/>
                    </React.Fragment>
                ) : (
                    <EnterChat username={this.props.username} joinChat={this.props.joinChat} setUsername={this.props.setUsername}/>
                )}
            </div>
        );
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(ChatBox);