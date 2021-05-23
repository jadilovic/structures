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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export default function BasicTable() {
  const structure = useSelector((state) => state.individualStructure);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container spacing={3} style={{ marginTop: "12vh" }}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Item</b>
                </TableCell>
                <TableCell align="left">
                  <b>Value</b>
                </TableCell>
              </TableRow>
            </TableHead>
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
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(clearData());
            dispatch(deleteStructure(structure.id));
            history.push("/");
          }}
        >
          Delete Structure
        </Button>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Machines:</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <div>
                {structure.machines.map((mach) => {
                  return (
                    <TableRow key={mach.id}>
                      <TableCell>
                        <Button
                          fullWidth={true}
                          key={mach.id}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            alert(
                              "Once Machine Individual Display Created This Button Link Will Take It There"
                            );
                          }}
                        >
                          {mach.name}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <b>
                  {structure.machines.length > 0
                    ? ""
                    : "No Machines in the Structure"}
                </b>
              </div>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
