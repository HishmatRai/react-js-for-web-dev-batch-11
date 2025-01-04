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
import { toast } from "react-toastify";
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
  const [signUpProvider, setSignUpProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [courses, setCourses] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
          const data = doc.data();
          setFullName(data.name);
          setEmail(data.email);
          setPhotoURL(data.photoURL);
          setSignUpProvider(data.signUpProvider);
          setPhoneNumber(data.phoneNumber);
          setAge(data.age);
          setCourses(data.courses);
          setGender(data.gender);
        });
        const starCountRef = databaseRef(database, "users/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setFullName(data.name);
          setEmail(data.email);
          setPhotoURL(data.photoURL);
          setSignUpProvider(data.signUpProvider);
          setPhoneNumber(data.phoneNumber);
          setAge(data.age);
          setCourses(data.courses);
          setGender(data.gender);
        });
      }
    });
  }, []);
  function handleClick() {
    setLoading(true);
  }

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
        setProgress(uploadProgress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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

  const updateProfile = async () => {
    if (fullName === "") {
      toast("Full Name required!", { type: "error" });
    } else {
      const washingtonRef = doc(db, "users", uid);
      await updateDoc(washingtonRef, {
        name: fullName,
        phoneNumber: phoneNumber,
        age: age,
        courses: courses,
        gender: gender,
      });
      update(databaseRef(database, "users/" + uid), {
        name: fullName,
        phoneNumber: phoneNumber,
        age: age,
        courses: courses,
        gender: gender,
      });
    }
  };
  return (
    <Layout>
      <h1>Profile Page</h1>
      <Avatar
        alt={"name"}
        src={photoURL}
        style={{ width: "150px", height: "150px" }}
      />
      {signUpProvider === "email" && (
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
      )}
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
          onChange={(e) => setFullName(e.target.value)}
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
          value={phoneNumber}
          variant="outlined"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={(e) => setAge(e.target.value)}
          >
            <MenuItem value={"1-20"}>1-20</MenuItem>
            <MenuItem value={"21-50"}>21-50</MenuItem>
            <MenuItem value={"51-100"}>51-100</MenuItem>
          </Select>
        </FormControl>
        <FormGroup onChange={(e) => setCourses(e.target.value)} value={courses}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={courses !== "" ? true : false}
              />
            }
            label="Web Development"
            value="Web Development"
          />
        </FormGroup>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
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
        <Button variant="contained" onClick={updateProfile}>
          Update Profile
        </Button>
      </Box>
    </Layout>
  );
};
export default Profile;
