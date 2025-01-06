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
  const { loading, item } = props;

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
              <ThumbUpIcon /> <span>{item.like.length}</span>
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
const BlogDetails = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const routerLocaiton = useLocation();
  const firestore = getFirestore();
  let path = routerLocaiton.pathname.slice(14);
  // console.log("path---------------", path);
  const [blog, setBlog] = useState({});
  const [uid, setUid] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
          if (doc.data()?.photoURL) {
            setPhotoURL(doc.data()?.photoURL);
          }
          setName(doc.data()?.name);
        });
      } else {
        setUid(null);
        setPhotoURL(null);
      }
    });
  }, []);
  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, "blogs", path), (blogRes) => {
      if (blogRes.data()) {
        console.log("blogRes", blogRes.data());
        onSnapshot(doc(firestore, "users", blogRes.data().uid), (userRes) => {
          // console.log("Current user: ", userRes.data());
          let userData = {
            name: userRes.data()?.name,
            photoURL: userRes.data()?.photoURL,
          };
          if (blogRes.data()?.comments.length !== 0) {
            blogRes.data()?.comments.forEach((commentRes) => {
              onSnapshot(
                doc(firestore, "users", commentRes.uid),
                (commetUserRes) => {
                  console.log("comment available", commetUserRes.data());
                }
              );
            });
          }
          setBlog({ ...blogRes.data(), ...userData });
          setLoading(false);
        });
      } else {
        navigate("/");
      }
      // console.log("Current data: ", doc.data());
    });
  }, []);

  // share
  const shareHandler = async () => {
    let share = blog.share;
    share = share + 1;

    let washingtonRef = doc(firestore, "blogs", path);
    await updateDoc(washingtonRef, {
      share: share,
    });
  };
  // comment handler
  const commentHanlder = async () => {
    let commets = blog.comments;
    if (uid) {
      let newComment = {
        commentText: comment,
        uid: uid,
        commentDate: moment().format(),
      };
      commets.push(newComment);
      let washingtonRef = doc(firestore, "blogs", path);
      await updateDoc(washingtonRef, {
        comments: commets,
      });
      setComment("");
      console.log("newComment", newComment);
    } else {
      setOpen(true);
    }
  };
  return (
    <Layout>
      <h1>Blog Details Page</h1>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
      <br />
      <br />
      <Media loading={loading} item={blog} />
      <br />
      <br />
      <FacebookShareButton
        url={`https://react-js-for-web-dev-batch-11.vercel.app/blog-details/${path}`}
        onClick={shareHandler}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <p>{`https://react-js-for-web-dev-batch-11.vercel.app/blog-details/${path}`}</p>
      <br />
      <br />
      <h1>{blog?.comments?.length} Comments</h1>
      <br />
      <br />
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex" }}>
          <Avatar alt={name} src={photoURL} />
          <TextField
            id="outlined-multiline-static"
            label="Add a comment..."
            multiline
            rows={4}
            style={{ marginLeft: "20px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            style={{ textTransform: "capitalize" }}
            onClick={commentHanlder}
            disabled={comment === ""}
          >
            Comment
          </Button>
        </div>
      </Box>
      <CommentCard />
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        loginHandler={() => {
          setOpen(false);
          navigate("/signin-signup");
        }}
      />
    </Layout>
  );
};
export default BlogDetails;
