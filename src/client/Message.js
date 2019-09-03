import React from 'react';

var Message = (props) => {
    return (
        <div className="message">
            <div className="username">
                {props.message.username}
            </div>
            <div className="data">
                {props.message.type == 'text' ?
                    <div className="text">{props.message.message.text}</div> : 
                    <div className="img"><img src={props.message.message.gif.originalUrl} alt=""/></div>
                }
            </div>
        </div>
    );
}

export default Message;