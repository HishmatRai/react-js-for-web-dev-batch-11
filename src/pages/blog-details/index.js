import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
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
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment/moment";
import ReactPlayer from "react-player";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
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
  console.log("path---------------", path);
  const [blog, setBlog] = useState({});
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const unsub = onSnapshot(doc(firestore, "blogs", path), (blogRes) => {
          if (blogRes.data()) {
            console.log("blogRes", blogRes.data());
            onSnapshot(
              doc(firestore, "users", blogRes.data().uid),
              (userRes) => {
                console.log("Current user: ", userRes.data());
                let userData = {
                  name: userRes.data()?.name,
                  photoURL: userRes.data()?.photoURL,
                };
                setBlog({ ...blogRes.data(), ...userData });
                setLoading(false);
              }
            );
          } else {
            navigate("/");
          }
          // console.log("Current data: ", doc.data());
        });
      }
    });
  }, []);
  console.log("blog-----------------", blog);
  return (
    <Layout>
      <h1>Blog Details Page</h1>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
      <br />
      <br />
      <Media loading={loading} item={blog} />
      <FacebookShareButton url={"shareUrl"}>
        <EmailIcon />
      </FacebookShareButton>
      <p>abc.com</p>
      <br />
      <br />
    </Layout>
  );
};
export default BlogDetails;
