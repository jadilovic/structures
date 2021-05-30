import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteStructure, clearData } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuthorized } from "../actions/creator";
import ConfirmDialog from "../components/ConfirmDialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { displayMachine, loadIndividualMachine } from "../actions/creator";
import axios from "axios";
import authHeader from "../service/auth-header";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  row: {
    cursor: "pointer",
  },
}));

export default function IndividualStructureDisplay() {
  let structure = useSelector((state) => state.individualStructure);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const _ = require("lodash");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);

  const displayDeleteNotification = () => {
    setOpenDeleteNotification(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteNotification(false);
    history.push("/");
  };

  if (_.isEmpty(structure)) {
    const structureData = localStorage.getItem("structure-data");
    structure = JSON.parse(structureData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem("structure-data", JSON.stringify(structure));
  }

  const displayMachineRow = async (machineId) => {
    //dispatch(clearData());
    const response = await axios
      .get(`/api/machines/${machineId}?populate=sensors`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });

    if (response) {
      dispatch(displayMachine(response.data));
      history.push("/individual-machine");
    }
  };

  function deleteIndividualStructure(structureId) {
    // dispatch(clearData());
    dispatch(deleteStructure(structureId));
    displayDeleteNotification();
  }

  return (
    <Grid container spacing={3}>
      {openDeleteNotification && (
        <div className={classes.root}>
          <Snackbar
            open={openDeleteNotification}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              You have successfuly deleted selected structure! You will now be
              returned to the Structures page.
            </Alert>
          </Snackbar>
        </div>
      )}
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name:
                </TableCell>
                <TableCell>{structure.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  City:
                </TableCell>
                <TableCell>{structure.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Country:
                </TableCell>
                <TableCell>{structure.country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>{structure.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Timezone:
                </TableCell>
                <TableCell>{structure.timezone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            aria-label="delete"
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Delete Structure
          </Button>
          <ConfirmDialog
            title="Delete Structure?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => {
              deleteIndividualStructure(structure.id);
            }}
          >
            Are you sure you want to delete this structure?
          </ConfirmDialog>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Machines:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {structure.machines.map((machine) => {
                return (
                  <TableRow
                    key={machine.id}
                    variant="contained"
                    color="primary"
                  >
                    <TableCell
                      onClick={() => {
                        displayMachineRow(machine.id);
                      }}
                      align="justify"
                      className={classes.row}
                    >
                      {machine.name}
                    </TableCell>
                  </TableRow>
                );
              })}
              {structure.machines.length > 0
                ? null
                : "No Machines in the Structure"}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
