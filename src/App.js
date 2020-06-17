import React from 'react';
import './App.css';
import Nav from './containers/Nav/Nav';
import Header from './containers/Header/Header'
import Content from './containers/Content/Content'

function App() {
  return (
    <div className="App">
      <div className="main">
        <Header />
        <Content />
      </div>
      <Nav />
    </div>
  );
}

export default App;
