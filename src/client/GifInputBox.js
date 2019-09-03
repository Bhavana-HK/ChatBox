import React from 'react';
import { connect } from 'react-redux';
import { changeGifQuery, getGIFs, sendGif, addMoreGifs } from './actionCreator'
import $ from 'jquery'

var mapStateToProps = (state) => {
    console.log(state.chat.gif.GIFs)
    return {
        GIFs: state.chat.gif.GIFs,
        gifQuery: state.chat.gif.gifQuery,
        gifMessage: state.chat.gif.gifMessage,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onChange: ({ target }) => dispatch(changeGifQuery(target.value)),
        getGIFs: (gifQuery) => dispatch(getGIFs(gifQuery)),
        sendGif: (gif) => dispatch(sendGif(gif)),
        addMoreGifs: ()=>dispatch(addMoreGifs())
    }
}

class GifInputBox extends React.Component {
    componentWillUnmount = () => {
        $('.gifs').off('scroll');
    }
    registerScrollEvent = () =>{
        let $gifs = $('.gifs')[0];
        $($gifs).on('scroll', ()=>{
            if($($gifs).scrollTop() + $($gifs).innerHeight()>=$($gifs).prop('scrollHeight')){
                this.props.addMoreGifs();
            }
        })
    }
    onKeyUp = (event) => {
        if (event.key == 'Enter' && this.props.gifQuery.length) {
            this.props.getGIFs(this.props.gifQuery);
            this.registerScrollEvent();
        }
    }
    render() {
        return (
            <div className="gifbox col-xs-12 col-sm-12 col-md-8 col-lg-10">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button type="button" className="btn btn-outline-secondary" onClick={this.props.toggleGif}>
                            <i className="fas fa-quote-right"> TEXT </i>
                        </button>
                    </div>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter the search query here"
                        value={this.props.gifQuery}
                        onKeyUp={this.onKeyUp}
                        onChange={this.props.onChange} />
                </div>
                <div className="gifs">
                    {this.props.GIFs.length ?
                        this.props.GIFs.map((gif, i) => {
                            return (
                                <div className="gif" key={i}>
                                    <i className="fa fa-share-square share" onClick={() => { this.props.sendGif(gif); this.props.toggleGif() }} />
                                    <img src={gif.fixedHeight} alt="" />
                                </div>
                            )
                        })
                        : <div className="searching h-100 text-center py-5">
                            <span>
                                {this.props.gifMessage}
                            </span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GifInputBox);