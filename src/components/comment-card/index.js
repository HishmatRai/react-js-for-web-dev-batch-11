import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
export default function CommentCard({data}) {
  // console.log("comment data",data)
  return (

    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data?.map((item,index)=>{
        return(
          <div key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.name} src={item.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    {item.commentText}
                  </Typography>
                  <br />
                 {moment(item.commentDate).fromNow()}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          </div>
        )
      })}
   
    </List>

  );
}
