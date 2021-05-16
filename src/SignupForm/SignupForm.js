import React, { useState } from "react";
import "./SignupForm.css";
import { apiService } from "../services/auth-api-service";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import axios from "axios";
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Grid,
  Typography,
  Fab,
} from "@material-ui/core";

function SignupForm({ history, changeLoginState }) {
  const [checked, setChecked] = useState(Boolean);
  const [hasErrors, setHasErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

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
    uploadDiv: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();

  const handleCheckbox = () => {
    setChecked(checked => !checked);
  };
  const handleUploadClick = e => {
    setSelectedFile(e.target.files[0]);
  };
  // show any error message if field is populated
  const errorMessage = Object.values(hasErrors).filter(err => err.length !== 0);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ margin: "10% 0 15%" }}>
          Join the Livemodo community
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            selectedFile: null,
          }}
          enableReinitialize
          validate={values => {
            const {
              email,
              firstName,
              lastName,
              username,
              password,
              repeatPassword,
            } = values;
            const errors = {};
            // // validate email
            if (!email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
              errors.email = "Invalid email address";
            }
            // // // validate username
            if (!username) {
              errors.username = "Username is required";
            } else if (username.length < 2) {
              errors.username = "Username must be at least two characters.";
            }
            // // validate password
            if (!password) {
              errors.password = "Password is required.";
            } else if (
              !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/.test(
                password
              )
            ) {
              errors.password =
                "Password must contain at least one upper case, lower case, number and special character.";
            } else if (password.length < 6) {
              errors.password = "Password must be at least six characters.";
            }
            // validate repeat password
            if (repeatPassword.trim() === "") {
              errors.repeatPassword = "Please type in password again.";
            }
            if (password !== repeatPassword) {
              errors.repeatPassword = "Passwords don't match";
            }
            // validate first name
            if (firstName.trim() === "") {
              errors.firstName = `First name is required`;
            } else if (/[^a-zA-Z -]/.test(firstName)) {
              errors.firstName = "Invalid characters";
            } else if (firstName.trim().length < 3) {
              errors.firstName = `First name needs to be at least three characters`;
            }
            // validate last name
            if (lastName.trim() === "") {
              errors.lastName = `First name is required`;
            } else if (/[^a-zA-Z -]/.test(lastName)) {
              errors.lastName = "Invalid characters";
            } else if (lastName.trim().length < 3) {
              errors.lastName = `First name needs to be at least three characters`;
            }

            return errors;
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const postUser = await apiService.postUser({
              firstName: values.firstName.trim(),
              lastName: values.lastName.trim(),
              username: values.username.trim(),
              password: values.password.trim(),
              email: values.email.trim(),
            });
            if (postUser.errors) {
              setHasErrors(postUser.errors);
              actions.setSubmitting(false);
            } else {
              changeLoginState();
              localStorage.setItem("jwt token", postUser);
              actions.setSubmitting(true);
              history.push("/");
            }
            // upload avatar
            const formData = new FormData();
            formData.append(
              "avatar",
              values.selectedFile,
              values.selectedFile.name
            );

            const res = await axios.post(
              "http://localhost:5000/images/avatars",
              formData
            );
            const data = await res;
            return data;
          }}
        >
          {({ submitForm, isSubmitting, isValid, setFieldValue }) => (
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
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
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
                    id="username"
                    label="Username"
                    name="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    helperText="Must contain uppercase, lowercase, numbers and special characters"
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
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="repeatPassword"
                    label="Repeat Password"
                    type="password"
                    id="passwordRepeat"
                  />
                </Grid>
              </Grid>
              <Grid item className={classes.uploadDiv}>
                <input
                  accept="image/*"
                  id="file-upload"
                  encType="multipart/form-data"
                  className={classes.input}
                  type="file"
                  onChange={e => {
                    setFieldValue("selectedFile", e.target.files[0]);
                    handleUploadClick(e);
                  }}
                />
                <label htmlFor="file-upload">
                  <Fab component="span" className={classes.icon}>
                    <PublishOutlinedIcon />
                  </Fab>
                </label>
                <Typography variant="body2" component="span">
                  Upload avatar
                </Typography>
                <Grid>
                  <Typography variant="body2" component="span">
                    {selectedFile && selectedFile.name}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                onClick={submitForm}
                type="submit"
                fullWidth
                disabled={!isValid || isSubmitting }
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </Container>
  );
}

export default SignupForm;
