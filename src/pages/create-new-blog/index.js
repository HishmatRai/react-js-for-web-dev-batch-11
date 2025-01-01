import React, { useState, useEffect } from "react";
import { Layout } from "../../components";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import { getDatabase, push, ref as databaseRef } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
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
const CreateNewBlog = () => {
  const auth = getAuth();
  const storage = getStorage();
  const realTime = getDatabase();
  const firestore = getFirestore();
  const [fileURl, setFileUrl] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [uid, setUid] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const [profileUploadStart, setProfileUploadStart] = useState(false);
  const [fileType, setFileType] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      }
    });
  }, []);
  const createHandler = async () => {
    if (fileURl === "") {
      toast("File required!", { type: "error" });
    } else if (title === "") {
      toast("Title required!", { type: "error" });
    } else if (title.length < 100) {
      toast("Title minimum 100", { type: "error" });
    } else if (details === "") {
      toast("Details required!", { type: "error" });
    } else if (details.length < 250) {
      toast("Details minimum 250", { type: "error" });
    } else {
      const newBlog = {
        fileURl: fileURl,
        title: title,
        details: details,
        like: [],
        comments: [],
        share: 0,
        createdDate: moment().format(),
        uid: uid,
        fileType: fileType,
      };
      console.log("newBlog", newBlog);
      push(databaseRef(realTime, "blogs/"), newBlog);
      await addDoc(collection(firestore, "blogs"), newBlog);
      setFileType("");
      setFileUrl("");
      setTitle("");
      setDetails("")
      toast("Successfully created new post", { type: "success" });
    }
  };

  // file upload
  const fileUploadHandler = (event) => {
    let file = event.target.files[0];
    console.log(file);
    setProfileUploadStart(true);
    const profileStorageRef = storageRef(storage, `blog-files/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(profileStorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + uploadProgress + "% done");
        setProgress(uploadProgress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
          setFileType(file.type);
          setProfileUploadStart(false);
        });
      }
    );
  };
  return (
    <Layout>
      <h1>Create New Blog Page</h1>
      <br /> <br />
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
          onChange={(event) => fileUploadHandler(event)}
        />
      </Button>
      {profileUploadStart && (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      )}
      {fileURl !== "" && (
        <div>
          {fileType === "video/mp4" ? (
            <ReactPlayer
              url="https://firebasestorage.googleapis.com/v0/b/web-development-batch-11.firebasestorage.app/o/blog-files%2F1dccd5a3-be8b-4676-992d-3c50974441b0?alt=media&token=a8635534-268a-450f-bc8e-ca27822cf5d8"
              controls={true}
              width={250}
              height={250}
            />
          ) : (
            <img src={fileURl} width={250} height={250} />
          )}
        </div>
      )}
      <br /> <br />
      <TextField
        id="outlined-basic"
        label="Title"
        value={title}
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      {title.length !== 0 && <p>{title.length}</p>}
      <br /> <br />
      <textarea
        placeholder="Details"
        rows={15}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      {details.length !== 0 && <p>{details.length}</p>}
      <br /> <br />
      <Button variant="contained" onClick={createHandler}>
        Create
      </Button>
      <br /> <br />
    </Layout>
  );
};
export default CreateNewBlog;
