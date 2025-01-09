import React, { useEffect, useState } from "react";
import { Layout, CommentCard, Modal } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {
  doc,
  onSnapshot,
  getFirestore,
  updateDoc,
  ref,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment/moment";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
} from "react-share";

function Media(props) {
  const { loading = false, item, alreadyLike } = props;

  return (
    <Card>
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
        <Skeleton sx={{ height: 590 }} animation="wave" variant="rectangular" />
      ) : item.fileType === "video/mp4" ? (
        <ReactPlayer
          url={item.fileURl}
          controls={true}
          height={590}
          width={"100%"}
          // style={{height:"190px",width:"100%"}}
        />
      ) : (
        <CardMedia
          component="img"
          height="590"
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
          <Typography
            variant="body2"
            component="p"
            style={{ fontWeight: "bold" }}
          >
            {item.title}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.secondary" }}
          >
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
              <ThumbUpIcon style={{ color: alreadyLike ? "blue" : "gray" }} />
              <span>{item.like.length}</span>
            </div>
            <div>
              <CommentIcon />
              <span>{item.comments.length}</span>
            </div>
            <div>
              <ShareIcon /> <span>{item.share}</span>
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
const EditBlog = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const routerLocaiton = useLocation();
  console.log("routerLocaiton", routerLocaiton);
  const firestore = getFirestore();
  const [blog, setBlog] = useState({});
  const [uid, setUid] = useState(null);
  const [comment, setComment] = useState("");
  const [alreadyLike, setAlradyLike] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (routerLocaiton.state) {
          console.log("user.uid", user.uid);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <Layout>
      <h1>Edit Page</h1>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
      <br />
      <br />
      {/* <Media item={blog} alreadyLike={alreadyLike} /> */}
      <br />
      <br />
      {/* <h1>{blog?.comments?.length} Comments</h1> */}
      <br />
      <br />
      {/* <CommentCard data={blog.comments} /> */}
    </Layout>
  );
};
export default EditBlog;
