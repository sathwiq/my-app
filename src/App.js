import React from 'react';
import './App.css';
import Header from './Header';
// import List from './List';
import Order from './Order';
import Container from '@material-ui/core/Container';
function App() {
  return (
    <div className="App">
      <Header />
      <Container >
        {/* <List /> */}
        <Order />
      </Container>
    </div>
  );
}

export default App;
