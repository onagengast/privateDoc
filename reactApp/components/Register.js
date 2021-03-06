import React from 'react';
import { Redirect } from 'react-router';
// Axios 
import axios from 'axios';

// Passport stuff. We're just going to use Facebook.
// import passport from 'passport';
// var FacebookStrategy = require('passport-facebook').Strategy;

// Material UI stuff 
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
// import * as colors from 'material-ui/styles/colors'

// Redux stuff 
import { connect } from 'react-redux';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '', 
      greeting: '',
      loggedIn: false, 
      haveAccount: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('http://localhost:3000/')
    .then((res) => {
      this.setState({greeting: res.data});
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  handleUsernameChange (event) {
    this.setState({username: event.target.value});
    console.log('username = ', this.state.username);
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

  registerUser () {
    axios.post('http://localhost:3000/register', {
      username: this.state.username, 
      password: this.state.password
    })
    .then((res) => {
      console.log(res.data);
      this.setState({loggedIn: true});
    })  
    .catch((err) => {
      console.log(err);
    });
  }

  goToLogin () {
    console.log('flag');
    this.setState({haveAccount: true});
  }

  render () {
    return (
      <div>
        <h3>Create an account </h3>
        <h3>{this.state.greeting}</h3>
        <TextField 
          onChange={(event) => this.handleUsernameChange(event)} 
          hintText="Enter a username" 
        />
        <TextField 
          onChange={(event) => this.handlePasswordChange(event)} 
          hintText="Enter a password" 
        />
        <RaisedButton label="Register" primary={true} onClick={() => this.registerUser()}/>
        {this.state.loggedIn ? <Redirect to="/Portal" /> : <div></div> }
        <h3> Already have an account? </h3>
        <RaisedButton label="Login" primary={true} onClick={() => this.goToLogin()} />
        {this.state.haveAccount ? <Redirect to="/Login" /> : <div></div>}  
      </div>
    );
  }  
}

export default Register;