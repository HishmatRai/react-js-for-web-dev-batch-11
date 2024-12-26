import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import {
  getDatabase,
  onValue,
  update,
  ref as databaseRef,
} from "firebase/database";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

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
const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const database = getDatabase();
  const storage = getStorage();

  const [age, setAge] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [uid, setUid] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const [profileUploadStart, setProfileUploadStart] = useState(false);
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
          console.log("Current data: ", doc.data());
          const data = doc.data();
          setFullName(data.name);
          setEmail(data.email);
          setPhotoURL(data.photoURL);
        });
        const starCountRef = databaseRef(database, "users/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setFullName(data.name);
          setEmail(data.email);
          setPhotoURL(data.photoURL);
          console.log("data", data);
        });
      }
    });
  }, []);
  function handleClick() {
    setLoading(true);
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const uploadProfileImage = async (event) => {
    setProfileUploadStart(true);
    const profileStorageRef = storageRef(storage, `profile-images/${uid}`);
    const uploadTask = uploadBytesResumable(
      profileStorageRef,
      event.target.files[0]
    );
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
          setPhotoURL(downloadURL);
          const washingtonRef = doc(db, "users", uid);
          await updateDoc(washingtonRef, {
            photoURL: downloadURL,
          });
          update(databaseRef(database, "users/" + uid), {
            photoURL: downloadURL,
          });
          setProfileUploadStart(false);
        });
      }
    );
  };

  return (
    <Layout>
      <h1>Profile Page</h1>
      <Avatar
        alt={"name"}
        src={photoURL}
        style={{ width: "150px", height: "150px" }}
      />
      <img src={photoURL} style={{ width: "150px", height: "150px" }} />
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
          onChange={(event) => uploadProfileImage(event)}
          accept="image/png, image/gif, image/jpeg"
        />
      </Button>
      {profileUploadStart && (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      )}
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Full Name"
          value={fullName}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={email}
          disabled
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
        </FormGroup>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained">Update Profile</Button>
      </Box>
    </Layout>
  );
};
export default Profile;
