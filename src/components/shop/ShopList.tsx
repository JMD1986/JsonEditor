import { store } from "../../app/store";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../app/shopSlice";
export interface IShopListProps {}
// function testState()

// }

export function ShopList(props: IShopListProps) {
  const dispatch = useDispatch();
  const myState = useSelector((state) => {
    return state;
  });
  const testState = () => {
    dispatch(load({ test: "test" }));
  };
  return (
    <div>
      <button onClick={testState}>test</button>
      <button onClick={() => console.log(store.getState())}>return</button>
    </div>
  );
}
