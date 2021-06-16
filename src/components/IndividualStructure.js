import React, { useState } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import {
  deleteStructure,
  clearData,
  displayMachine,
  setAuthorized,
} from '../actions/creator';
import { setSnackbar } from '../reducers/snackbarReducer';
import ConfirmDialog from './ConfirmDialog';
import authHeader from '../service/auth-header';
import { CustomMachinesRowsOverlay } from './NoRowsOverlay';
import WithHook from '../hooks/WithHook';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  row: {
    cursor: 'pointer',
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
    const structureData = localStorage.getItem('structure-data');
    structure = JSON.parse(structureData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structure-data', JSON.stringify(structure));
  }

  // OLD VERSION API LOGIC IN THE COMPONENT
  /*
  const displayMachineRow = async (selectedMachine) => {
    dispatch(clearData());
    const response = await axios
      .get(`/api/machines/${selectedMachine.id}?populate=sensors`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      dispatch(displayMachine(response.data));
      history.push('/individual-machine');
    }
  };
*/
  // NEW VERSION API LOGIC IN THE HOOK
  const displayMachineRow = (selectedMachine) => {
    WithHook(selectedMachine.id);
  };

  // SNACK BAR DELETE NOTIFICATION
  const displayDeleteNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'Selected structure has been successfully deleted!'
      )
    );
    history.push('/');
  };

  function deleteIndividualStructure(structureId) {
    dispatch(clearData());
    dispatch(deleteStructure(structureId));
    displayDeleteNotification();
  }

  const machinesColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'alias',
      headerName: 'Alias',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Machine Type',
      valueGetter: (params) => params.row.type.name,
      flex: 1,
    },
  ];

  const userScreenHeight = window.innerHeight;

  const machinesDataGrid = {
    columns: machinesColumns,
    rows: structure.machines,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head" component="th" scope="row">
                  Structure Name:
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
              <TableRow>
                <TableCell component="th" scope="row">
                  Business ID:
                </TableCell>
                <TableCell>{structure.businessId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Created at:
                </TableCell>
                <TableCell>{structure.createdAt}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{structure.isActive ? 'Yes' : 'No'}</TableCell>
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
          <div
            style={{
              height: userScreenHeight - 112,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <DataGrid
              components={{
                NoRowsOverlay: CustomMachinesRowsOverlay,
              }}
              size="small"
              aria-label="a dense table"
              {...machinesDataGrid}
              onRowClick={(props) => {
                console.log(props.row);
                displayMachineRow(props.row);
              }}
              filterModel={{
                items: [
                  {
                    columnField: 'description',
                    operatorValue: 'contains',
                    value: '',
                  },
                ],
              }}
              localeText
            />
          </div>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
