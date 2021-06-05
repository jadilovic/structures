import React, { useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {
  deleteStructure,
  clearData,
  displayMachine,
  setAuthorized,
} from "../actions/creator";
import { setSnackbar } from "../reducers/snackbarReducer";
import ConfirmDialog from "./ConfirmDialog";
import authHeader from "../service/auth-header";
import Engineer from "./Engineer";

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
  let structure = useSelector((state) => state.main.individualStructure);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // SAVING AND GETTING STRUCTURE DATA ON REFRESH PAGE
  if (_.isEmpty(structure)) {
    const structureData = localStorage.getItem("structure-data");
    structure = JSON.parse(structureData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem("structure-data", JSON.stringify(structure));
  }

  const displayMachineRow = async (machineId) => {
    dispatch(clearData());
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

  // SNACK BAR DELETE NOTIFICATION
  const displayDeleteNotification = () => {
    dispatch(
      setSnackbar(
        true,
        "success",
        "Selected structure has been successfully deleted!"
      )
    );
    history.push("/");
  };

  function deleteIndividualStructure(structureId) {
    dispatch(clearData());
    dispatch(deleteStructure(structureId));
    displayDeleteNotification();
  }

  return (
    <Grid container spacing={3}>
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
              {structure.machines.map((machine) => (
                <TableRow key={machine.id} variant="contained" color="primary">
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
              ))}
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
