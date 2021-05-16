import React, { useEffect, useState } from "react"
import "../BrowseReviews/BrowseReviewsPage.css"
import { dateAndTime } from "../utils/parseDate"
import clsx from "clsx"
import Rating from "../Rating/Rating"
import { makeStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { arrayBufferToBase64 } from "../utils/imageUtil"
import config from "../config"

function Review({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState("")
  const [avatar, setAvatar] = useState("")
  const { content, tagline, venue, rating, createdAt, bandName, showDate } =
    review
  const getImage = async () => {
    try {
      const data = await fetch(`${config.API_BASE_URL}/images`)
      const img = await data.json()
      const base64Flag = "data:image/jpeg;base64,"
      const imageStr = arrayBufferToBase64(img.img.data.data)
      setImage(base64Flag + imageStr)
    } catch (e) {
      console.log(e)
    }
  };
  const getAvatar = async () => {
    try {
      const data = await fetch(`${config.API_BASE_URL}/images/avatars`)      
      const avatar = await data.json();
      const base64Flag = "data:image/jpeg;base64,";
      const imageStr = arrayBufferToBase64(avatar.img.data.data);
      setAvatar(base64Flag + imageStr);
      console.log('AVATAR',avatar)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAvatar()
    getImage()
  }, [])

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
  }))
  const classes = useStyles()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="avatar"
              variant="rounded"
              alt="user"
              src={avatar}
            >
            </Avatar>
          }
          title={tagline}
          subheader={dateAndTime(createdAt, "PPPPp")}
        />
        <CardMedia
          component="img"
          src={image}
          className={classes.media}
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
  )
}

export default Review
