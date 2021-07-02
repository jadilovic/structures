import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { clearData } from '../actions/creator';
import useStructure from '../hooks/useStructure';
import CustomLoadingOverlay from './CustomLoadingOverlay';

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function StructuresTable() {
  const { fetchStructures, fetchStructureById } = useStructure();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userScreenHeight = window.innerHeight;

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    dispatch(clearData());
    fetchStructures('machines');
  }, []);

  const structuresData = useSelector((state) => state.main.structures);
  const loading = useSelector((state) => state.main.loading);

  const dataColumns = [
    {
      field: 'businessId',
      headerName: 'Business ID',
      valueFormatter: (params) => params.value || '-',
      flex: 1,
    },
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
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
    },
    {
      field: 'timezone',
      headerName: 'Timezone',
      flex: 1,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      // valueFormatter: (params) => (params.value ? 'Yes' : 'No'),
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {params.value ? (
            <CheckCircleIcon style={{ color: 'green' }} />
          ) : (
            <RemoveCircleIcon color="error" />
          )}
        </div>
      ),
      flex: 1,
    },
  ];

  const structures = { columns: dataColumns, rows: structuresData };

  function displayStructureRow(data) {
    fetchStructureById(data.id, 'structure machines structures');
  }

  return (
    <Container maxWidth="lg">
      <div
        style={{
          height: userScreenHeight - 112,
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <DataGrid
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          loading={loading}
          {...structures}
          className={classes.row}
          onRowClick={(props) => {
            displayStructureRow(props.row);
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
        />
      </div>
    </Container>
  );
}
