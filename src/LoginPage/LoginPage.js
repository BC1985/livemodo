import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import apiService from "../services/auth-api-service";

function LoginForm({ history, changeLoginState }) {
  const [checked, setChecked] = useState(Boolean);
  const [hasErrors, setHasErrors] = useState({});

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: 100,
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

  const handleCheckbox = () => {
    setChecked(checked => !checked);
  };
  // show any error message if field is populated
  const errorMessage = Object.values(hasErrors).filter(err => err.length !== 0);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ margin: "10% 0 15%" }}>
          Login to Livemodo
        </Typography>

        <Formik
          initialValues={{
            email: "john@smith.com",
            password: "JohnSmith1!",
          }}
          enableReinitialize
          validate={values => {
            const { email, password } = values;
            const errors = {};
            // validate email
            if (!email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              errors.email = "Invalid email address";
            }
            // validate password
            if (!password) {
              errors.password = "Password is required.";
            }

            return errors;
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const submitLogin = await apiService.logIn({
              password: values.password.trim(),
              email: values.email.trim(),
            });
            if (submitLogin.error) {
              setHasErrors(submitLogin.error);
              actions.setSubmitting(false);
            } else {
              changeLoginState();
              localStorage.setItem("jwt token", submitLogin);
              actions.setSubmitting(true);
              history.push("/");
            }
          }}
        >
          {({ submitForm, isSubmitting, isValid, dirty }) => (
            <Form>
              <div>
                {isSubmitting && (
                  <CircularProgress
                    size={60}
                    variant="indeterminate"
                    id="spinner"
                  />
                )}
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={checked ? "text" : "password"}
                    id="password"
                  />
                  <FormControlLabel
                    value="Show password"
                    control={<Checkbox color="primary" />}
                    label="Show password"
                    checked={checked}
                    onChange={handleCheckbox}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                onClick={submitForm}
                type="submit"
                fullWidth
                disabled={!isValid || isSubmitting || !dirty}
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Typography
                component="h5"
                align="center"
              >
                Don't have an account? <Link to="/register">Sign up</Link>
              </Typography>
            </Form>
          )}
        </Formik>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </Container>
  );
}
export default withRouter(LoginForm);
