import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import moment from "moment/moment";
import ReactPlayer from "react-player";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import "./index.css";
function Media(props) {
  const { loading, item } = props;

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={item.name} src={item.photoURL} />
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            item.name
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            moment(item.createdDate).fromNow()
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : item.fileType === "video/mp4" ? (
        <ReactPlayer
          url={item.fileURl}
          controls={true}
          height={190}
          width={"100%"}
          // style={{height:"190px",width:"100%"}}
        />
      ) : (
        <CardMedia
          component="img"
          height="190"
          image={item.fileURl}
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" component="p" className="card-title">
            {item.title}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" component="p" className="card-details">
            {item.details}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        {loading ? (
          <div className="card-footer">
            <Skeleton animation="wave" height={50} width="30%" />
            <Skeleton animation="wave" height={50} width="30%" />
            <Skeleton animation="wave" height={50} width="30%" />
          </div>
        ) : (
          <div className="card-footer">
            <div>
              <ThumbUpIcon /> <span>{item.like ? item.like.length : 0}</span>
            </div>
            <div>
              <CommentIcon />
              <span>{item.comments ? item.comments.length : 0}</span>
            </div>
            <div>
              <ShareIcon /> <span>{item.share   }</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function CardComponent({ loading, data }) {
  return (
    <div>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(30)) : data)
          .map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                <Media loading={loading} item={item} />
              </Grid>
            );
          })
          .reverse()}
      </Grid>
    </div>
  );
}
