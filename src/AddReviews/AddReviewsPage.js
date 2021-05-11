import React, { useState } from "react";
import {apiService} from "../services/auth-api-service";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Button, Container, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function AddreviewsPage() {
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
  // show any error message if field is populated
  const errorMessage = Object.values(hasErrors).filter(err => err.length !== 0);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ margin: "10% 0 15%" }}>
          Post your review
        </Typography>

        <Formik
          initialValues={{
            tagline: "",
            bandName: "",
            venue: "",
            content: "",
            showDate:"",
            rating: ""
          }}
          enableReinitialize
          validate={values => {
            const {
              email,
              tagline,
              bandName,
              content,
              rating,
              showDate
            } = values;
            const errors = {};
            // // validate email
            // if (!email) {
            //   errors.email = "Required";
            // } 
            // // // // validate username
            // if (!content) {
            //   errors.username = "Please type your review";
            // } else if (content.length < 2) {
            //   errors.username = "must be at least two characters.";
            // }
            // return errors;
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const submitReview = await apiService.postReview({
              tagline: values.tagline.trim(),
              bandName: values.bandName.trim(),
              venue: values.venue.trim(),
              content: values.content.trim(),
              showDate: values.showDate.trim(),
              rating: values.rating.trim(),
            });
            // if (submitReview.errors) {
            //   setHasErrors(apiCall.errors);
            //   actions.setSubmitting(false);
            // } else {
            //   actions.setSubmitting(true);
            //   history.push("/");
            // }
          }}
        >
          {({ submitForm, isSubmitting, isValid, dirty, setFieldValue }) => (
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
                <Grid item>
                  <Field
                    component={TextField}
                    name="tagline"
                    variant="outlined"
                    placeholder="optional"
                    fullWidth
                    id="tagline"
                    label="tagline"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="bandName"
                    label="Name of artist or band"
                    name="bandName"
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="content"
                    required
                    fullWidth
                    id="content"
                    label="What did you think?"
                    name="content"
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={KeyboardDatePicker}
                    label="Show date"
                    name="showDate"
                    disableFuture={true}
                    onChange={val => {
                      console.log(val);
                      setFieldValue("dob", val);
                    }}
                  />
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

export default AddreviewsPage;
