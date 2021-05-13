import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const value = useSelector((state) => state.individualStru);
  console.log(value);
  return (
    <div>
      <h1 style={{ marginTop: "12vh" }}>Individual Structure</h1>
      <h3>{value.description}</h3>
    </div>
  );
}
