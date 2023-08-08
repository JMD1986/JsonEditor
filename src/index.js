import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Shop from "./routes/shop";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ShopList } from "./components/shop/ShopList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "shop/shopitems",
        element: <ShopList />,
      },
    ],
  },
  {
    path: "/shop",
    element: <Shop />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Header />
  //     <Sidebar />
  //     <Outlet />
  //   </BrowserRouter>
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
