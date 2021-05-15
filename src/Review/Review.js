import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "../BrowseReviews/BrowseReviewsPage.css";
import { dateAndTime } from "../utils/parseDate";
import clsx from "clsx";
import Rating from "../Rating/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Review({ review }) {
  const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
  const { content, tagline, venue, rating, createdAt, bandName, showDate } =
    review;

  const [expanded, setExpanded] = React.useState(false);

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
      paddingBottom: 100,
    },
    media: {
      height: 200,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    card: {
      marginBottom: "10%",
    },
    icon: {
      marginRight: "10px",
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title={tagline}
          subheader={dateAndTime(createdAt, "PPPPp")}
        />
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1390&q=80"
        />

        <CardContent>
          <p className="user-name"></p>
          <Typography variant="h4" component="h5">
            {bandName}
          </Typography>
          <Typography variant="h5">
            <LocationOnOutlinedIcon className={classes.icon} />
            {venue}
          </Typography>
          <Typography variant="subtitle1">
            <TodayOutlinedIcon className={classes.icon} />
            {dateAndTime(showDate, "PPPP")}
          </Typography>
          <Rating value={rating} />
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1">{content}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default Review;
