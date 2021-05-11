// src/pages/Dashboard.js

import React from "react";
import List from "../components/List";
// import Form from "../temp-folder/Form";
import Post from "../components/Post";
import Structures from "./Structures";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div>
        <h2>Structures</h2>
        <List />
      </div>
      <div>
        <h2>Add New Structures</h2>
        {/*<Form />*/}
      </div>
      <div>
        <h2>Existing Structures</h2>
        <Post />
      </div>
      <Structures />
    </div>
  );
}

export default Dashboard;
