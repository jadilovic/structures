import React from "react";

export default function (props) {
  console.log(props);
  return (
    <div>
      <h1 style={{ marginTop: "12vh" }}>Individual Structure</h1>
      <h3>{props.description}</h3>
    </div>
  );
}
