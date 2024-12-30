import React, { useState, useEffect } from "react";
import { Layout } from "../../components";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

const CreateNewBlog = () => {
  const auth = getAuth();
  const [fileURl, setFileUrl] = useState("ffd");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [uid, setUid] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      }
    });
  }, []);
  const createHandler = () => {
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
      };
      console.log("newBlog", newBlog);
      toast("Successfully created new post", { type: "success" });
    }
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
          // onChange={(event) => uploadProfileImage(event)}
        />
      </Button>
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
