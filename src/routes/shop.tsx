import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
function Shop() {
  const divStyle = {
    paddingLeft: "16rem",
    maxWidth: "500px",
  };
  return (
    <div style={divStyle}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"upload"} disablePadding>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[""]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Upload Json" />
            )}
          />
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/shop">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop Items"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/liveEvents">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop Events"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}

export default Shop;
