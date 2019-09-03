import React from 'react';
import { connect } from 'react-redux';
import TextInputBox from './TextInputBox'
import GifInputBox from './GifInputBox'
import Message from './Message'
import {changeInputText, sendMessage} from './actionCreator'

var mapStateToProps = (state) => {
    return {
        messages: state.chat.messages,
        message: state.chat.message,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        sendMessage: (type)=>{dispatch(sendMessage(type)); scrollToBottom()},
        onMessageChange: ({target})=>{dispatch(changeInputText(target.value))},
    }
}

var scrollToBottom = () => {
    console.log('to bottom')
}

class Messages extends React.Component {
    constructor() {
        super()
        this.state = {
            height: 0,
            gif: false,
        }
    }
    componentDidMount=()=> {
        this.assignHeight()
        window.addEventListener('resize', () => this.assignHeight())
    }
    componentWillUnmount=()=> {
        window.removeEventListener('resize', () => this.assignHeight())
    }
    assignHeight = () => {
        let inputHeight = this.state.gif ? 200 : 35;
        let docHeight = document.height !== undefined ? document.height : document.body.offsetHeight;
        console.log("The document height : ", docHeight);
        this.setState({
            height: docHeight - inputHeight - 65
        });
    }
    toggleGif = () => {
        this.setState({
            gif: !this.state.gif
        }, () => this.assignHeight())
    }
    render() {
        return (
            <div className="messages col-xs-12 col-sm-12 col-md-8 col-lg-10" style={{ height: this.state.height + 'px' }}>
                {this.props.messages.length ?
                    this.props.messages.map((message, i) => <Message message={message} key={i} />)
                    : <div className="no-message">{'No messages in the chat room'}</div>
                }
                {this.state.gif ?
                    <GifInputBox sendMessage={this.props.sendMessage} toggleGif={this.toggleGif}  />
                    : <TextInputBox message= {this.props.message} sendMessage={this.props.sendMessage} toggleGif={this.toggleGif} onMessageChange={this.props.onMessageChange}/>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);