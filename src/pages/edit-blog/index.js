import React, { useEffect, useState } from "react";
import { Layout, CommentCard } from "../../components";
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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Media(props) {
  const { loading = false, item, alreadyLike } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={item.name} src={item.photoURL} />}
        title={item.name}
        subheader={moment(item.createdDate).fromNow()}
      />
      {item.fileType === "video/mp4" ? (
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
        {
          <Typography
            variant="body2"
            component="p"
            style={{ fontWeight: "bold" }}
          >
            {item.title}
          </Typography>
        }
      </CardContent>
      <CardContent>
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "text.secondary" }}
        >
          {item.details}
        </Typography>
      </CardContent>
      <CardContent>
        <div className="card-footer">
          <div>
            <ThumbUpIcon style={{ color: alreadyLike ? "blue" : "gray" }} />
            <span>{item?.like?.length}</span>
          </div>
          <div>
            <CommentIcon />
            <span>{item?.comments?.length}</span>
          </div>
          <div>
            <ShareIcon /> <span>{item?.share}</span>
          </div>
        </div>
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
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (routerLocaiton.state) {
          setBlog(routerLocaiton.state);
          setAlradyLike(routerLocaiton.state.like.includes(user.uid));
          console.log("user.uid", user.uid);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    });
  }, []);
  console.log("blog", blog);
  return (
    <Layout>
      <h1>Edit Page</h1>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
      <br />
      <br />
      <Media item={blog} alreadyLike={alreadyLike} />
      <br />
      <br />
      <button onClick={() => setEdit(true)}>Edit</button>
      <br />
      <br />
      <h1>{blog?.comments?.length} Comments</h1>
      <br />
      <br />
      <CommentCard data={blog?.comments} />
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={blog.fileURl} width={"100%"} style={{maxHeight:"400px"}}/>
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Title"
            value={blog.title}
            variant="outlined"
            // onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
          {/* {title.length !== 0 && <p>{title.length}</p>} */}
          <br /> <br />
          <textarea
            placeholder="Details"
            rows={15}
            style={{ width: "100%" }}
            value={blog.details}
            // onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          {/* {details.length !== 0 && <p>{details.length}</p>} */}
          <br /> <br />
          <button onClick={()=> setEdit(false)}>Cancel</button>
          <button>Update</button>
        </Box>
      </Modal>
    </Layout>
  );
};
export default EditBlog;
