import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import SingleFileUploader from "../components/shared/SingleFileUploader";
import { ShopList } from "../components/shop/ShopList";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../app/shopSlice";
import { useState } from "react";
function Shop() {
  const [fileName, setFileName] = useState(null);
  const [view, setView] = useState("");
  const dispatch = useDispatch();

  const uploadToState = (file: any) => {
    dispatch(load(file));
  };
  const divStyle = {
    paddingLeft: "16rem",
    maxWidth: "500px",
  };
  const upload = () => {
    console.log("testing");
  };
  function Lists() {
    if (view === "items") {
      return <ShopList />;
    }
  }

  return (
    <div style={divStyle}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"upload"} disablePadding>
          <ListItemButton>
            <SingleFileUploader
              upload={uploadToState}
              setFileName={setFileName}
            />
          </ListItemButton>
        </ListItem>
        {fileName && (
          <ListItem>
            <ListItemButton>
              <ListItemText primary={fileName} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem onClick={() => setView("items")}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop Items"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Events"}
          disablePadding
          component={Link}
          to="/liveEvents"
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop Events"} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem>
          <ShopList />
        </ListItem> */}
      </List>
      <Divider />
      <Lists />
    </div>
  );
}

export default Shop;
