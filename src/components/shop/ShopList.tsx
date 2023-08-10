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
import { ShopJson } from "../../models/schema";
export interface IShopListProps {}
// function testState()

// }

export function ShopList(props: IShopListProps) {
  const [shopItems, setShopItems] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  useEffect(() => {
    console.log(store.getState());
    //@ts-ignore
    setShopItems(store.getState().shop.shop.Shops);
  });
  const dispatch = useDispatch();
  const myState = useSelector((state) => {
    return state;
  });
  const testState = () => {
    dispatch(load({ test: "test" }));
  };
  const handleClick = (event: any) => {
    // console.log(event);
    setSelectedShop(event);
  };
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {shopItems.map((value: ShopJson) => (
          <ListItem
            key={value.Id}
            disableGutters
            onClick={() => handleClick(value)}
            secondaryAction={
              <IconButton aria-label="comment">
                <ListItemButton />
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${value.Name}`} />
          </ListItem>
        ))}
      </List>
      {/* @ts-ignore  */}
      {selectedShop && <ShopItemView shop={selectedShop} />}
    </div>
  );
}
