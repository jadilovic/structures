import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import authHeader from "../service/auth-header";

class TableMachines extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    let data = await axios
      .get("/api/structures", {
        headers: authHeader(),
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ todos: data.data });
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h3 style={{ marginTop: "10vh" }}>
          Using componentDidMount for initial data render
        </h3>
        <hr />
        {todos &&
          todos.map((todo) => {
            return (
              <table>
                <tr>
                  <td>{todo.id}</td>
                  <td>
                    <p key={todo.id}>{todo.description}</p>
                  </td>
                </tr>
              </table>
            );
          })}
      </div>
    );
  }
}

export default TableMachines;
