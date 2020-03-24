import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Chess from './components/Chess'


class App extends React.Component {

  render() {
    return (
      <div className="App">
      <div className="alert alert-primary" role="alert">
        五子棋
      </div>
        <Chess />
      </div>
    );
  }

}

export default App;
