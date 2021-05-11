import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/creator";

export class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("GET DATA CALLED");
    this.props.getData();
  }

  render() {
    console.log("GET DATA TEST");

    return (
      <ul>
        {this.props.structures.map((el, index) => (
          <li key={index}>
            {el.description} = {index} = {el.name}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    structures: state.remoteStructures.slice(0, 10),
  };
}

export default connect(mapStateToProps, { getData })(Post);
