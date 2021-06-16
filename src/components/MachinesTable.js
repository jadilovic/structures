import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import CustomLoadingOverlay from './CustomLoadingOverlay';
import { clearData, displayMachine } from '../actions/creator';
import useMachine from '../hooks/useMachine';

export default function MachinesTable() {
  const dispatch = useDispatch();
  const { fetchMachinesWithSensors } = useMachine();

  const userScreenHeight = window.innerHeight;

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    dispatch(clearData());
    fetchMachinesWithSensors();
  }, []);

  const machinesData = useSelector((state) => state.main.machines);
  const loading = useSelector((state) => state.main.loading);
  const history = useHistory();

  const machinesColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'businessId',
      headerName: 'Business ID',
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
      field: 'manufacturer',
      headerName: 'Manufacturer',
      flex: 1,
    },
    {
      field: 'placeNumber',
      headerName: 'Place Number',
      flex: 1,
    },
    {
      field: 'timezone',
      headerName: 'Timezone',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Machine Type',
      valueGetter: (params) => params.row.type.name,
      flex: 1,
    },
    {
      field: 'structure',
      headerName: 'Structure',
      valueGetter: (params) => params.row.name,
      flex: 1,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      valueFormatter: (params) => (params.value ? 'Yes' : 'No'),
      flex: 1,
    },
  ];

  const machines = { columns: machinesColumns, rows: machinesData };

  function displayMachineRow(data) {
    dispatch(clearData());
    dispatch(displayMachine(data));
    history.push('/individual-machine');
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
          size="small"
          aria-label="a dense table"
          {...machines}
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
        />
      </div>
    </Container>
  );
}
