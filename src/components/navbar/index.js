// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = (props) => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <hr />
//       <hr />
//       {props.show && (
//         <img
//           src="https://media.licdn.com/dms/image/v2/C4E0BAQHmHI3WxeTzyg/company-logo_200_200/company-logo_200_200/0/1630641231718?e=2147483647&v=beta&t=euRQMqbys4WgMfE7o76lm85kewVne8B3fUBT0xeid3I"
//           height={50}
//         />
//       )}
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//         <li>
//           <Link to="/news">News</Link>
//         </li>
//       </ul>
//       <hr />
//       <hr />

//       <button onClick={() => navigate("/")}>Home</button>
//       <button onClick={() => navigate("/about")}>About</button>
//       <button onClick={() => navigate("/contact")}>Contact</button>
//       <button onClick={() => navigate("/news")}>News</button>
//     </div>
//   );
// };
// export default Navbar;

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
const pages = ["Dashboard", "Create New Blog"];
const settings = ["Profile", "Dashboard", "Create New Blog", "Logout"];
function ResponsiveAppBar() {
  const database = getDatabase();
  const firestore = getFirestore();
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [photoURL, setPhotoURL] = useState("dfd");
  const [name, setName] = useState("");
  console.log("photoURL", photoURL);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          const starCountRef = ref(database, "users/" + user.uid);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log("data", data);
            if (data.photoURL) {
              setPhotoURL(data.photoURL);
            }
            setName(data.name);
          });
          const unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
            console.log("Current data: ", doc.data());
            if (doc.data().photoURL) {
              setPhotoURL(doc.data().photoURL);
            }
            setName(doc.data().name);
          });
          setIsLogin(true);
          setLoading(false);
        } else {
          navigate("/email-verification");
        }
      } else {
        setLoading(false);
        navigate("/");
      }
    });
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === "Create New Blog") {
      navigate("/create-new-blog");
    }
  };
  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      signOut(auth)
        .then(() => {
          toast("Sign-out successful.", { type: "success" });
          setIsLogin(false);
        })
        .catch((error) => {
          // An error happened.
        });
    } else if (setting === "Profile") {
      navigate("/profile");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {loading ? (
              <CircularProgress color="white" size={20} />
            ) : isLogin ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={name} src={photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/signin-signup")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
