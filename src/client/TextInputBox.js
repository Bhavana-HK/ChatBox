import React from 'react'

var TextInputBox = (props) => {
    var keyUp = (event) => {
        if (event.key == 'Enter') {
            if (props.message.text.length) props.sendMessage('text');
        }
    }
    return (
        <div className="input-group" style={{bottom:"0px", position:"fixed"}}>
            <div className="input-group-prepend" >
                <button type="button" className="btn btn-outline-secondary" onClick={props.toggleGif} >
                    <i className="fa fa-image"> GIF </i>
                </button>
            </div>
            <input type="text"
                className="form-control"
                onChange={props.onMessageChange}
                value={props.message.text}
                placeholder={'Enter your message'}
                onKeyUp={keyUp} />
        </div>
    )
}

export default TextInputBox