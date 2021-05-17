import React, { useState } from "react";
import { apiService } from "../services/auth-api-service";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, CircularProgress } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import InputLabel from "@material-ui/core/InputLabel";

function AddreviewsPage({ history }) {
  const [hasErrors, setHasErrors] = useState({});
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    }
  }));
  const options = [1, 2, 3, 4, 5];
  const optionsMap = options.map(opt => {
    return (
      <MenuItem key={opt} value={opt}>
        {opt}
      </MenuItem>
    );
  });
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
            showDate: new Date(),
            rating: ""
          }}
          enableReinitialize
          validate={values => {
            const { bandName, content, venue } = values;
            const errors = {};
            // validate email
            if (!bandName) {
              errors.bandName = "Artist name is required";
            }
            // // // validate username
            if (!content) {
              errors.content = "Please type your review";
            } else if (content.length < 2) {
              errors.content = "mMst be at least two characters.";
            }
            // validate venue
            if (!venue) {
              errors.venue = "Venue is required";
            } else if (venue.length < 2) {
              errors.venue = "Must be at least two characters.";
            }
            return errors;
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const submitReview = await apiService.postReview({
              tagline: values.tagline.trim(),
              bandName: values.bandName.trim(),
              venue: values.venue.trim(),
              content: values.content.trim(),
              showDate: values.showDate,
              rating: values.rating,
            });
            if (submitReview.errors) {
              setHasErrors(submitReview.errors);
              actions.setSubmitting(false);
            } else {
              actions.setSubmitting(true);
              history.push("/");
            }
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
                <Grid item xs={12}>
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
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="venue"
                    label="Venue"
                    name="venue"
                  />
                </Grid>
                      <Grid item sm={8}>
                      <FormControl variant="outlined" className={classes.formControl}>
                      {/* <InputLabel variant="filled" htmlFor="showDate">Show Date</InputLabel> */}
                        <Field            
                        label="Show date"            
                          component={KeyboardDatePicker}
                          invalidDateMessage="Invalid date"
                          name="showDate"
                        />
                        </FormControl>
                      </Grid>
                  <Grid item sm={4}>
                  <FormControl  className={classes.formControl}>
                    <InputLabel htmlFor="rating">Rating</InputLabel>
                    <Field
                      component={Select}
                      name="rating"
                      onChange={e => {
                        setFieldValue("rating", e.target.value);
                      }}
                      inputProps={{
                        id: "rating",
                      }}
                    >
                      {optionsMap}
                    </Field>
                    </FormControl>
                  </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="content"
                    multiline
                    required
                    fullWidth
                    id="content"
                    label="What did you think?"
                    name="content"
                  />
                </Grid>
              </Grid>
              <Button
                onClick={submitForm}
                type="submit"
                fullWidth
                disabled={!isValid || isSubmitting}
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Submit review
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
