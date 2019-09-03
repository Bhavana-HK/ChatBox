import React from 'react';

var EnterChat = (props) => {
    return (
        <div className="enter-chat d-flex justify-content-center align-items-center">
        <form className="col-xs-12 col-sm-12 col-md-6 col-lg-4" onSubmit={props.joinChat}>
            <div className="input-group">
                <input type="text" className="form-control" required minLength="3" value={props.username} onChange={props.setUsername} placeholder="Enter a username" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Join Chat</button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default EnterChat;