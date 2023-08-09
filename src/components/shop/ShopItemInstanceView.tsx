import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ShopJson } from "../../models/schema";
import Checkbox from "@mui/material/Checkbox";
import { NewShop23 } from "../../models/classes";
import ShopItemInstanceList from "./ShopItemInstanceList";
import { ShopItemInstance } from "../../models/classes";
function ShopItemInstanceView(props: any) {
  const [shopItemInstance, setShopItemInstance] = useState(
    ShopItemInstance.Default()
  );
  useEffect(() => {
    setShopItemInstance(props.shop);
  }, [props]);

  const handleDataChange = (e: ShopItemInstance) => {
    //@ts-ignore
    setShopItemInstance({ ...shopItemInstance, Name: e });
  };

  // BonusMultiplier: 12;
  // MLMTicketAmount: 80;
  // Name: "commodo minim in et aliqua excepteur elit voluptate deserunt labore exercitation velit magna incididunt incididunt mollit";
  // PBWEnabled: false;
  // RevealWeight: 29;
  // ShopItemId: "tempor du";
  return (
    <div>
      {" "}
      <TextField id="id" value={shopItemInstance.BonusMultiplier} />
      <TextField id="isTimedOffer" value={shopItemInstance.MLMTicketAmount} />
      <TextField
        id="name"
        value={shopItemInstance.Name}
        //@ts-ignore
        onChange={(e) => handleDataChange(e.target.value)}
      />
      <TextField id="isTimedOffer" value={shopItemInstance.PBWEnabled} />
      <TextField id="isTimedOffer" value={shopItemInstance.RevealWeight} />
      <TextField id="isTimedOffer" value={shopItemInstance.ShopItemId} />
      {JSON.stringify(props.shop)}
    </div>
  );
}

export default ShopItemInstanceView;
