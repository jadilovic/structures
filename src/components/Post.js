import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/creator";

export class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
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
  return {
    structures: state.remoteStructures.slice(0, 10),
  };
}

export default connect(mapStateToProps, { getData })(Post);
