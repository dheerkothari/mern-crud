
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'; 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
import { FormControl, InputLabel } from '@material-ui/core';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [data,setData] = useState({
    firstName : '',
    lastName : '',
      email : '',
      phone : '',
      state : '',
      pincode : '',
      password : '',
      role: "USER"
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData({
        ...data,
        [event.target.name]:event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('http://localhost:4000/api/addUser', data).then(() => {
        history.push("/login");
    }).catch((error) => {
        alert(error)
    }).finally(() => {
      setLoading(false);
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={data.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                onChange={handleChange}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={data.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                autoComplete="email"
                value={data.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                onChange={handleChange}
                label="Phone"
                maxLength="10"
                type="number"
                id="phone"
                value={data.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select label="State" 
                    fullWidth value={data.state} 
                    name="state"
                    onChange={handleChange}
                >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                        <MenuItem value={"Goa"}>Goa</MenuItem>
                        <MenuItem value={"Delhi"}>Delhi</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pincode"
                onChange={handleChange}
                maxLength="6"
                label="Pincode"
                type="number"
                id="pincode"
                value={data.pincode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader size={24} /> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
