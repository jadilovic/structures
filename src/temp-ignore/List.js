// src/js/components/List.js

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { structures: state.structures };
};

console.log("First TESTING");
const ConnectedList = ({ structures }) => (
  <ul>
    {structures.map((el) => (
      <li key={el.id}>
        {el.title} = {el.id}
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
