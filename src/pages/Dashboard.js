// src/pages/Dashboard.js

import React from "react";
import List from "../components/List";
import Form from "../components/Form";
import Post from "../components/Post";

function Dashboard() {
  return (
    <div>
      <div>
        <h2>Structures</h2>
        <List />
      </div>
      <div>
        <h2>Add New Structures</h2>
        <Form />
      </div>
      <div>
        <h2>Existing Structures</h2>
        <Post />
      </div>
    </div>
  );
}

export default Dashboard;
