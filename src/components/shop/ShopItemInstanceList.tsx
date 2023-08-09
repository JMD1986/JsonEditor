import { store } from "../../app/store";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../app/shopSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import ShopItemView from "./ShopItemView";
// @ts-ignore
function ShopItemInstanceList(props) {
  const handleClick = (event: any) => {
    console.log(event);
  };
  useEffect(() => {
    console.log(props.instances);
  });
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {props.instances.map((value: any) => (
          <ListItem
            // @ts-ignore
            key={value.Id}
            disableGutters
            // @ts-ignore
            onClick={() => handleClick(value)}
            secondaryAction={
              <IconButton aria-label="comment">
                <ListItemButton />
              </IconButton>
            }
          >
            {/* @ts-ignore  */}
            <ListItemText primary={`Line item ${value.Name}`} />
          </ListItem>
        ))}
      </List>
      {/* @ts-ignore  */}
      {/* {selectedShop && <ShopItemView shop={selectedShop} />} */}
    </div>
  );
}

export default ShopItemInstanceList;
