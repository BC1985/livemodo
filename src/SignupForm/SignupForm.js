import React, { useState } from "react";
import "./SignupForm.css";
import AuthApiService from "../services/auth-api-service";
import { withRouter } from "react-router-dom";
// import { inputIsEmpty, shouldBeError } from "../Validation/validation";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function SignupForm(props) {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const {
    email,
    password,
    first_name,
    last_name,
    username,
    repeatPassword,
  } = input;
  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });
  const [checked, setChecked] = useState(Boolean);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [hasErrors, setHasErrors] = useState(false);

  const onChange = e => {
    const { name, value } = e.target;

    setInput(input => ({ ...input, [name]: value }));
  };

  const validate = e => {
    const passwordValid = new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/
    ).test(password);

    if (password.length < 6) {
      setErrors({
        password: "Password must be at least six characters long",
      });
    } else {
      if (!passwordValid) {
        setErrors({
          password:
            "Password must contain at least one upper case, lower case, number and special character",
        });
      } else {
        setErrors({ password: "" });
      }
    }
    if (username.length < 3) {
      setErrors({
        username: "username must be at least three characters long",
      });
    } else {
    }
    if (repeatPassword !== password) {
      setErrors({ repeatPassword: "Passwords don't match" });
    }
  };

  const handleSubmit = async e => {
    const invalidInputMessage = validate();
    e.preventDefault();
    try {
      if (invalidInputMessage) {
        setHasErrors(true);
        console.log("error");
      } else {
        setHasErrors(false);
        console.log("ok");
        AuthApiService.postUser({
          first_name,
          last_name,
          username,
          password,
          email,
        });
        props.history.push("thank-you");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true });
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const handleCheckbox = e => {
    setChecked(checked => !checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Join the Livemodo community
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={touched.first_name && first_name.length === 0}
                name="first_name"
                onBlur={() => handleBlur("first_name")}
                variant="outlined"
                value={first_name}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.first_name}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={touched.last_name && last_name.length === 0}
                onBlur={() => handleBlur("last_name")}
                variant="outlined"
                value={last_name}
                required
                helperText={errors.last_name}
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.last_name}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onBlur={() => handleBlur("email")}
                error={touched.email && email.length === 0}
                variant="outlined"
                // type="email"
                value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.email}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onBlur={() => handleBlur("username")}
                error={touched.username && username.length === 0}
                variant="outlined"
                required
                value={username}
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.username}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onBlur={() => handleBlur("password")}
                error={touched.password && password.length === 0}
                variant="outlined"
                required
                value={password}
                fullWidth
                name="password"
                helperText="Must contain uppercase, lowercase, numbers and special characters"
                label="Password"
                type={checked ? "text" : "password"}
                id="password"
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.password}</p>
              {password}
              <FormControlLabel
                value="Show password"
                control={<Checkbox color="primary" />}
                label="Show password"
                checked={checked}
                onChange={handleCheckbox}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onBlur={() => handleBlur("repeatPassword")}
                variant="outlined"
                value={repeatPassword}
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="passwordRepeat"
                onChange={onChange}
              />
              <p style={{ color: "red" }}>{errors.repeatPassword}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignupForm);
