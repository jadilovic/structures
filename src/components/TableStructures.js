// src/js/components/TableStructures.js

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { structures: state.structures };
};

const ConnectedList = ({ structures }) => (
  <div>
    <h1 style={{ marginTop: "10vh" }}>Table Structures</h1>;
    <ul>
      {structures.map((el) => (
        <li key={el.id}>
          {el.title} = {el.id}
        </li>
      ))}
    </ul>
  </div>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

/*
import React from "react";

export default function () {
  return <h1 style={{ marginTop: "10vh" }}>Table Structures</h1>;
}
*/
