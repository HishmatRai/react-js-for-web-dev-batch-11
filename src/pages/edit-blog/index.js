import React, { useEffect, useState } from "react";
import { Layout, CommentCard } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
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
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress from "@mui/material/LinearProgress";
import {
  doc,
  onSnapshot,
  getFirestore,
  updateDoc,
  ref,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
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
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
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
  const stateData = routerLocaiton.state;
  console.log("routerLocaiton", routerLocaiton);
  const storage = getStorage();
  const firestore = getFirestore();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [alreadyLike, setAlradyLike] = useState(false);
  const [edit, setEdit] = useState(false);
  const [fileURl, setFileUrl] = useState(stateData.fileURl);
  const [title, setTitle] = useState(stateData.title);
  const [details, setDetails] = useState(stateData.details);
  const [uid, setUid] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const [profileUploadStart, setProfileUploadStart] = useState(false);
  const [fileType, setFileType] = useState(stateData.fileType);
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

  // update
  const UpdateBlogHandler = async () => {
    if (title === "") {
      toast("Title required!", { type: "error" });
    } else if (title.length < 100) {
      toast("Title minimum 100", { type: "error" });
    } else if (details === "") {
      toast("Details required!", { type: "error" });
    } else if (details.length < 250) {
      toast("Details minimum 250", { type: "error" });
    } else {
      let washingtonRef = doc(firestore, "blogs", stateData.key);
      await updateDoc(washingtonRef, {
        title: title,
        details: details,
      });
      blog.title = title;
      blog.details = details;
      toast("Successfully updated", { type: "success" });
      setEdit(false);
    }
  };

  // update file
  const fileUpdateHandler = (event) => {
    let file = event.target.files[0];
    setProfileUploadStart(true);
    const profileStorageRef = storageRef(
      storage,
      `blog-files/${stateData.fileUid}`
    );
    const uploadTask = uploadBytesResumable(profileStorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const washingtonRef = doc(firestore, "blogs", stateData.key);
          await updateDoc(washingtonRef, {
            fileType: file.type,
            fileURl: downloadURL,
          });
          blog.fileURl = downloadURL;
          blog.fileType = file.type;
          setFileUrl(downloadURL);
          setFileType(file.type);
          setProfileUploadStart(false);
        });
      }
    );
  };
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
          {fileType === "video/mp4" ? (
            <ReactPlayer
              url={fileURl}
              controls={true}
              height={190}
              width={"100%"}
            />
          ) : (
            <img src={fileURl} width={"100%"} style={{ maxHeight: "400px" }} />
          )}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              // onChange={(event) => console.log(event.target.files)}
              onChange={(event) => fileUpdateHandler(event)}
            />
          </Button>
          {profileUploadStart && (
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          )}
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Title"
            value={title}
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
          {title.length !== 0 && <p>{title.length}</p>}
          <textarea
            placeholder="Details"
            rows={15}
            style={{ width: "100%" }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          {details.length !== 0 && <p>{details.length}</p>}
          <button onClick={() => setEdit(false)}>Cancel</button>
          <button onClick={UpdateBlogHandler}>Update</button>
        </Box>
      </Modal>
    </Layout>
  );
};
export default EditBlog;
