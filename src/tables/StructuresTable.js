import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { individualStructure } from "../actions/creator";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function BasicFilteringGrid(props) {
  const dataArray = props.props;
  const history = useHistory();
  const dispatch = useDispatch();

  const dataHeaders = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
    },
    {
      field: "city",
      headerName: "City",
      width: 110,
    },
    {
      field: "country",
      headerName: "Country",
      width: 110,
    },
    {
      field: "timezone",
      headerName: "Timezone",
      width: 110,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 110,
    },
  ];

  const structures = { columns: dataHeaders, rows: dataArray };
  console.log(structures);

  function displayStructure(data) {
    dispatch(individualStructure(data));
    history.push("/individualStr");
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...structures}
        onRowClick={(props) => {
          console.log(props.row);
          displayStructure(props.row);
        }}
        filterModel={{
          items: [
            {
              columnField: "description",
              operatorValue: "contains",
              value: "",
            },
          ],
        }}
      />
    </div>
  );
}
