import React from 'react';

class NavBar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                <a className="navbar-brand text-light" link="#">Chat Box</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
 
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item float-right">
                            <a className="nav-link" link={'https://github.com/bhavana-hk'}>Github</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;