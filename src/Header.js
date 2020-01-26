import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../src/firebaseconfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('http://localhost:3000/');
provider.addScope('profile');
provider.addScope('email');

class Header extends Component{
  render(){
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            
            <Typography variant="h6" >
              Local Storage Order Management
            </Typography>
            {
              user 
                ? <p>Hello, {user.displayName}</p>
                : <p></p>
            }
            {
              user
                ? <button onClick={signOut}>Sign out</button>
                : <Button color="secondary" variant="contained" onClick={signInWithGoogle}>Sign in with Google</Button>
            }
          </Toolbar>
        </AppBar>
        <div className="App">
      
  </div>
      </div>
    );
  }
  
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Header);