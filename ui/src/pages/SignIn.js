import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Loader from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
  error: {
    color: 'red',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState({
    usr_email: '',
    usr_password: ''
  })

  const [submitClick, setSubmitClick] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({});  

  const isInvalid = (name, value) => {
    switch (name) {
      case 'usr_email':
        return !value ? 'Email is required' : !/^[A-Za-z\d\.\_\-\+]{2,64}\@([A-Za-z\d\-\_]{1,256})\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/.test(value) ? 'Email is invalid': '';
      case 'usr_password':
        return !value ? 'Password is required' : value.length < 3 ? 'Minimum 8 characters are required' : '';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    setData({
        ...data,
        [event.target.name]:event.target.value
    });

    if (submitClick) {
      setError((prevError) => ({
        ...prevError,
        [event.target.name]: isInvalid(event.target.name, event.target.value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data);
    setSubmitClick(true)
    
    setError(()=> ({
      usr_email: isInvalid('usr_email', data.usr_email),
      usr_password: isInvalid('usr_password', data.usr_password)
    }));

    const hasErrors = isInvalid('usr_email', data.usr_email) || isInvalid('usr_password', data.usr_password);

    console.log(hasErrors);

    if (hasErrors) {
      return;
    }
    
    setLoading(true)
    axios.post('http://localhost:4000/api/login', data).then(({ data: { data } }) => {
        localStorage.setItem('firstName',data.firstname);
        localStorage.setItem('lastName',data.lastname);
        localStorage.setItem('token',data.token);
        localStorage.setItem('role',data.role);
        history.push("/dashboard");
    }).catch((error) => {
        alert(error)
    }).finally(() => {
      setLoading(false)
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="usr_email"
            onChange={handleChange}
            value={data.usr_email}
            autoComplete="email"
            autoFocus
            helperText={error.usr_email}
            FormHelperTextProps={{ className: classes.error }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="usr_password"
            onChange={handleChange}
            value={data.usr_password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={error.usr_password}
            FormHelperTextProps={{ className: classes.error }}
          />
          { /*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader size={24} /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">
                Forgot password?
              </Link>*/}
            </Grid>
            <Grid item>
              <NavLink to="/signup">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
