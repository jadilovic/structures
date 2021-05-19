import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { SelectTimezone } from "react-select-timezone";

const App = () => {
  return (
    <div>
      <SelectTimezone />
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
