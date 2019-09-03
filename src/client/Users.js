import React from 'react';
import {connect } from 'react-redux';

var mapStateToProps = (state) =>{
    return {users: state.chat.users};
}

var mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
    }
}

class Users extends React.Component{
    render(){
        return (
            <div className="users col-xs-12 col-sm-12 col-md-4 col-lg-2">
                {this.props.users.length ? 
                this.props.users.map((user, i)=>{
                    return (
                        <div className="user" key={i}>
                            <i className="fas fa-user"/>
                            {" "+user}
                        </div>
                    )
                }) : 'No active users'}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);