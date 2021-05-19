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
import Button from "@material-ui/core/Button";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function BasicTable() {
  const rows = useSelector((state) => state.individualStructure);
  console.log(rows);

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
                <TableCell>{rows.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  City:
                </TableCell>
                <TableCell>{rows.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Country:
                </TableCell>
                <TableCell>{rows.country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>{rows.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Timezone:
                </TableCell>
                <TableCell>{rows.timezone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
                {rows.machines.map((mach) => {
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
                  {rows.machines.length > 0
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

/*
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const value = useSelector((state) => state.individualStructure);
  console.log(value);

  return (
    <Card className={classes.root} style={{ marginTop: "12vh" }}>
      <CardContent>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h5"}
          gutterBottom
        >
          Structure Home View
        </Typography>
        <Typography variant="h6" align="left">
          Name: <b>{value.name}</b>
        </Typography>
        <Typography variant="h6" align="left">
          City: <b>{value.city}</b>
        </Typography>
        <Typography variant="h6" align="left">
          Country: <b>{value.country}</b>
        </Typography>
        <Typography variant="h6" align="left">
          Description: <b>{value.description}</b>
        </Typography>
        <Typography variant="h6" align="left">
          Timezone: <b>{value.timezone}</b>
        </Typography>
        <Typography variant="h6" align="left">
          Machines:
        </Typography>
        <Typography variant="h6" align="left">
          <div>
            {value.machines.map((mach) => {
              return (
                <p key={mach.id}>
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
                </p>
              );
            })}
            <b>
              {value.machines.length > 0 ? "" : "No Machines in the Structure"}
            </b>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">
          <Link to="/">Return to Structures</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
*/
