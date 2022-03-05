import React, { useState } from 'react';
import './Login.css';
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Typography, Button, Container } from "@material-ui/core";
import PostApis from '../../actions/PostApis';
import AuthPostApis from '../../actions/AuthPostApis';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
async function loginUser(credentials) {

   PostApis('/login', { username: credentials.username, password: credentials.password }, (res, err) =>{
     localStorage.clear()
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user',  JSON.stringify(res.user));
    window.location.href = '/';
   });
    
   }

export default function Login(props) {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    if (username === "" || password === "") {
      setError("Fields are required");
      return;
    }
    e.preventDefault();
    await loginUser({
     username,
     password
   });
  
  }


  
  return(
    <Container maxWidth="sm">
      
    <form>
      <Typography variant="h5" style={{ marginBottom: 8, textAlign: 'center' }}>
        Login
      </Typography>
      <TextField
        label="username"
        variant="outlined"
        fullWidth
        className="form-input"
        value={username}
        onChange={e => setUserName(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        className="form-input"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="form-input"
        size="large"
        onClick={submitForm}
      >
        Login
      </Button>
    
      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {props.error || error}
        </Alert>
      )}
    </form>
    </Container>

  )
}

Login.propTypes = {
  // setToken: PropTypes.func.isRequired
};
