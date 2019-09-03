import React from 'react';
import ChatBox from './ChatBox'
import NavBar from './NavBar';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <ChatBox/>
      </React.Fragment>
    );
  }
}

export default App;
