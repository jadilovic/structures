import React, { useState } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import {
  deleteStructure,
  clearData,
  setAuthorized,
  changeEdit,
  displayStructure,
  loadStructures,
} from '../actions/creator';
import { setSnackbar } from '../reducers/snackbarReducer';
import ConfirmDialog from './ConfirmDialog';
import { CustomMachinesRowsOverlay } from './NoRowsOverlay';
import useMachine from '../hooks/useMachine';
import useDate from '../hooks/useDate';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
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
  const { fetchMachineById } = useMachine();
  const { getStringDate } = useDate();
  let structure = useSelector((state) => state.main.individualStructure);
  let structures = useSelector((state) => state.main.structures);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // SAVING AND GETTING STRUCTURE DATA ON REFRESH PAGE
  if (_.isEmpty(structure)) {
    const structureData = localStorage.getItem('structure-data');
    structure = JSON.parse(structureData);
    dispatch(displayStructure(structure));
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structure-data', JSON.stringify(structure));
  }

  if (_.isEmpty(structures)) {
    const structuresData = localStorage.getItem('structures-data');
    structures = JSON.parse(structuresData);
    dispatch(loadStructures(structures));
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('structures-data', JSON.stringify(structures));
  }

  const displayMachineRow = (selectedMachine) => {
    fetchMachineById(selectedMachine.id);
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

  function editSelectedStructure() {
    dispatch(changeEdit(true));
    history.push('/form-structure');
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
      valueFormatter: (params) => params.value || '-',
      flex: 1,
    },
    {
      field: 'alias',
      headerName: 'Alias',
      valueFormatter: (params) => params.value || '-',
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
    rows: structure?.machines,
  };

  const dateString = getStringDate(structure.createdAt);

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
                <TableCell>{structure?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  City:
                </TableCell>
                <TableCell>{structure?.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Country:
                </TableCell>
                <TableCell>{structure?.country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>
                  {structure?.description ? structure.description : 'None'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Timezone:
                </TableCell>
                <TableCell>{structure?.timezone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Business ID:
                </TableCell>
                <TableCell>
                  {structure?.businessId ? structure.businessId : 'None'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Created at:
                </TableCell>
                <TableCell>{dateString}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{structure?.isActive ? 'Yes' : 'No'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Parent Structure:
                </TableCell>
                <TableCell>{structure?.structure?.name ?? 'None'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            aria-label="update"
            variant="contained"
            color="inherit"
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={() => editSelectedStructure()}
          >
            Edit Structure
          </Button>
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
