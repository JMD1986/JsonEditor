import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ShopJson } from "../../models/schema";
import Checkbox from "@mui/material/Checkbox";
import { NewShop23 } from "../../models/classes";
import ShopItemInstanceList from "./ShopItemInstanceList";
function ShopItemView(shop: ShopJson) {
  const [shopItem, setShopItem] = useState(NewShop23.Default());
  useEffect(() => {
    //@ts-ignore
    setShopItem(shop.shop);
    //@ts-ignore
    console.log(shop.shop);
  }, [shop]);

  const check = () => {
    console.log(shopItem);
  };
  const handleDataChange = (event: any) => {
    //@ts-ignore
    setShopItem({ ...shopItem, Name: event });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {/* <TextField id="id" value={shopItem.Id} />
          <Checkbox id="isTimedOffer" checked={shopItem.IsTimedOffer} />
          <TextField id="name" value={shopItem.Name} /> */}
          <TextField id="id" value={shopItem.Id} />
          <Checkbox id="isTimedOffer" checked={shopItem.IsTimedOffer} />
          <TextField
            id="name"
            value={shopItem.Name}
            onChange={(e) => handleDataChange(e.target.value)}
          />
          'test'
          {/* @ts-ignore */}
          {/* {JSON.stringify(shopItem)} */}
        </div>
        <button onClick={check}>check</button>
        {/* @ts-ignore */}
        <ShopItemInstanceList instances={shopItem.ShopItems} />
      </Box>
    </div>
  );
}

export default ShopItemView;
