import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteStructure, clearData } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuthorized } from "../actions/creator";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export default function BasicTable() {
  let machine = useSelector((state) => state.individualMachine);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const _ = require("lodash");

  if (_.isEmpty(machine)) {
    const machineData = localStorage.getItem("machine-data");
    machine = JSON.parse(machineData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem("machine-data", JSON.stringify(machine));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name:
                </TableCell>
                <TableCell>{machine.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{`${machine.isActive ? "Yes" : "No"}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Business ID:
                </TableCell>
                <TableCell>{machine.businessId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>{machine.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Alias:
                </TableCell>
                <TableCell>{machine.alias}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(clearData());
            dispatch(deleteStructure(machine.id));
            history.push("/");
          }}
        >
          Delete Machine
        </Button>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sensors:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machine.sensors.map((sensor) => {
                return (
                  <TableRow key={sensor.id}>
                    <TableCell>
                      <Button
                        fullWidth={true}
                        key={sensor.id}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          alert(
                            "Once Sensor Individual Display Created This Button Link Will Take You There"
                          );
                        }}
                      >
                        {sensor.alias}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {machine.sensors.length > 0 ? null : "No Sensors in the Machine"}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
