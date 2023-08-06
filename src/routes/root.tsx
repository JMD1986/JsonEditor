import React from "react";
import Header from "../components/Header";
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>test</h1>
        <nav>
          <ul>
            <li>
              <a href={`/shop`}>Shop</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Live Events</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
