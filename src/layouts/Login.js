import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route, Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://aykutyrdm.github.io/bikesharing-intro-web-site/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  function loginHandler(loginResponse) {
    //User return case
    setUser(loginResponse.user)
    setJwt(loginResponse.jwt)
    //Check admin or user
    if(loginResponse.user.role.type === "admin"){
      localStorage.setItem("jwt", loginResponse.jwt);
      localStorage.setItem("user", JSON.stringify(loginResponse.user));
      window.location.href="/admin/dashboard"
    }
    else{
      console.log("You are not a system admin!");
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  function validateForm() {
    return admin.length > 0 && password.length > 0;
  }
  function loginErrorHandler(loginResponse){
    //Invalid id password case
    console.log(loginResponse)
  }

   function sendLoginRequest(){
     fetch('http://35.189.94.121/auth/local/', {
      method : 'post',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({
        "identifier" : admin,
        "password" : password
      }),
    })
        .then((response) => {
            return response.json();
        })
        .then((loginResponse) => {
            loginResponse.user ? loginHandler(loginResponse) : loginErrorHandler(loginResponse)
        });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Dashboard
        </Typography>
        <form 
        onSubmit={handleSubmit}
        className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="admin"
            label="Admin username"
            name="admin"
            onChange={e => setAdmin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
            onClick ={()=> sendLoginRequest()}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}