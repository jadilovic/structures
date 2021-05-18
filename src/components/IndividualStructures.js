import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
