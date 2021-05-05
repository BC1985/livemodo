import React from "react";
import "./SignupForm.css";
import AuthApiService from "../services/auth-api-service";
import { withRouter } from "react-router-dom";
// import { inputIsEmpty, shouldBeError } from "../Validation/validation";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
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
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });
  const [passwordError, setPasswordError] = useState(false);
  const [hasError, setHasError] = useState(false);
  // const [errors, setErrors] = useState({});
  // state = {
  //   error: null,

  //   errorMessage: false,
  //   passwordError: false
  // };

  const onChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };

  const validatePassword = () => {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/;
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain at least one upper case, lower case, number and special character";
    }
    return null;
  };

  const renderError = e => {
    setPasswordError(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const passwordNotValid = validatePassword();

      if (passwordNotValid) {
        setHasError(true);
        renderError();
      } else {
        AuthApiService.postUser({
          first_name,
          last_name,
          username,
          password,
          email,
        });
        setInput(input => ({ ...(input === "") }));
        // props.history.push("thank-you");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleBlur = field => e => {
    setTouched({ ...touched, [field]: true });
  };

  const spanStyle = {
    color: "whiteSmoke",
    fontStyle: "italic",
    fontSize: "0.8em",
  };
  const ifPasswordError = {
    border: "2px solid red",
  };
  function inputIsEmpty(
    first_name,
    last_name,
    username,
    password,
    email,
    repeatPassword
  ) {
    return {
      first_name: first_name.length === 0,
      last_name: last_name.length === 0,
      username: username.length === 0,
      password: password.length === 0,
      repeatPassword: repeatPassword.length === 0,
      email: email.length === 0
    };
  }
  const validationErrors = inputIsEmpty(
    first_name,
    last_name,
    username,
    password,
    repeatPassword,
    email
  );
  
  const isEnabled = !Object.keys(validationErrors).some(
    x => validationErrors[x]
  );

  const errorMessage = validatePassword();
  // const useStyles = makeStyles({
  //   root: {
  //     minWidth: 275,
  //   },
  //   bullet: {
  //     display: 'inline-block',
  //     margin: '0 2px',
  //     transform: 'scale(0.8)',
  //   },
  //   title: {
  //     fontSize: 14,
  //   },
  //   pos: {
  //     marginBottom: 12,
  //   },
  // });
  // const classes = useStyles();
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
                name="first_name"
                variant="outlined"
                value={first_name}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={last_name}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={username}
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={password}
                fullWidth
                name="password"
                helperText="Must contain uppercase, lowercase, numbers and special characters"
                label="Password"
                type="text"
                id="password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
          </Grid>
          <Button
            disabled={!isEnabled && true}
            type="submit"
            value={first_name}
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
  // return (
  //   // <Container>
  //   <div className="signup-container">
  //     <div className="call-to-action">
  //       <h2>Join the Livemodo community</h2>
  //     </div>
  //     {/* <Container> */}
  //     <div className="signup-form">
  //       <Card>
  //         <CardContent>
  //           <FormGroup>
  //             <form className={classes.root}>
  //             {/* <div> */}
  //               {/* <label>*First Name </label> */}
  //               {/* <TextField
  //             className={
  //               shouldBeError("first_name", validationErrors, touched) ? "error" : null
  //             }
  //             type="text"
  //             name="first_name"
  //             placeholder="e.g Tommy"
  //             value={first_name}
  //             onBlur={handleBlur("first_name", validationErrors, touched)}
  //             onChange={onChange}
  //             required
  //           /> */}
  //               <TextField
  //                 id="outlined-basic"
  //                 label="First name"
  //                 variant="outlined"
  //                 name="first_name"
  //                 required
  //                 onChange={onChange}
  //                 value={first_name}
  //               />
  //             {/* </div> */}
  //             {/* <div> */}
  //               <TextField
  //                 id="outlined-basic"
  //                 variant="outlined"
  //                 label="Last name"
  //                 name="last_name"
  //                 required
  //                 onChange={onChange}
  //                 value={last_name}
  //               />
  //               {/* <label>*Last Name </label> */}
  //               {/* <TextField
  //             className={
  //               shouldBeError("last_name", validationErrors, touched) ? "error" : null
  //             }
  //             type="text"
  //             name="last_name"
  //             placeholder="e.g Wisseau"
  //             value={last_name}
  //             onBlur={handleBlur("last_name", validationErrors, touched)}
  //             onChange={onChange}
  //             required
  //           /> */}
  //             {/* </div> */}
  //             {/* <div> */}
  //               {/* <label>*Username </label> */}
  //               <TextField
  //                 id="outlined-basic"
  //                 label="username"
  //                 variant="outlined"
  //                 name="username"
  //                 required
  //                 onChange={onChange}
  //                 value={username}
  //               />
  //               {/* <TextField
  //             className={
  //               shouldBeError("username", validationErrors, touched) ? "error" : null
  //             }
  //             type="text"
  //             name="username"
  //             value={username}
  //             onBlur={handleBlur("username", validationErrors, touched)}
  //             onChange={onChange}
  //             required
  //           /> */}
  //             {/* </div> */}
  //             {/* <div> */}
  //               {/* <label>*Email </label> */}
  //               <TextField
  //                 id="outlined-basic"
  //                 variant="outlined"
  //                 label="email"
  //                 name="email"
  //                 required
  //                 onChange={onChange}
  //                 value={email}
  //               />
  //               {/* <TextField
  //             className={
  //               shouldBeError("email", validationErrors, touched) ? "error" : null
  //             }
  //             type="text"
  //             name="email"
  //             placeholder="e.g tommy@theroom.com"
  //             value={email}
  //             onBlur={handleBlur("email", validationErrors, touched)}
  //             onChange={onChange}
  //             required
  //           /> */}
  //             {/* </div> */}
  //             {/* <div> */}
  //               {/* <label>*Password </label> */}
  //               <TextField
  //                 id="outlined-basic"
  //                 variant="outlined"
  //                 label="Password"
  //                 name="password"
  //                 required
  //                 onChange={onChange}
  //                 value={password}
  //               />
  //               {/* <TextField
  //             className={
  //               shouldBeError("password", validationErrors, touched) ? "error" : null
  //             }
  //             type="text"
  //             name="password"
  //             value={password}
  //             onBlur={handleBlur("password", validationErrors, touched)}
  //             onChange={onChange}
  //             required
  //             style={passwordError ? ifPasswordError : null}
  //           /> */}
  //               <span className="errorMessage">
  //                 {error ? errorMessage : ""}
  //               </span>
  //             {/* </div> */}

  //             <p style={spanStyle}>* indicates required field</p>
  //             <Button
  //               variant="contained"
  //               // id="register-button"
  //               // type={!isEnabled ? "disabled" : "submit"}
  //               // disabled={!isEnabled}
  //             >
  //               Sign up
  //             </Button>
  //             {/* <button
  //           id="register-button"
  //           type={!isEnabled ? "disabled" : "submit"}
  //           disabled={!isEnabled}
  //         >
  //           Submit
  //         </button> */}
  //             </form>
  //           </FormGroup>
  //         </CardContent>
  //       </Card>
  //       <div className="register-push" />
  //     </div>

  {
    /* </Container> */
  }
  // </div>
  // );
}

export default withRouter(SignupForm);
