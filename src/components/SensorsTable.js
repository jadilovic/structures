import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { clearData, displaySensor } from '../actions/creator';
import CustomLoadingOverlay from './CustomLoadingOverlay';
import useSensor from '../hooks/useSensor';

export default function SensorsTable() {
  const { fetchSensorsWithMachines } = useSensor();
  const dispatch = useDispatch();

  const userScreenHeight = window.innerHeight;

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    dispatch(clearData());
    fetchSensorsWithMachines();
  }, []);

  const sensorsData = useSelector((state) => state.main.sensors);
  const loading = useSelector((state) => state.main.loading);
  const history = useHistory();
  const sensorsColumns = [
    {
      field: 'sensorId',
      headerName: 'Sensor ID',
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
      headerName: 'Sensor Type',
      valueGetter: (params) =>
        params.row.type ? params.row.type.name : 'No Type',
      flex: 1,
    },
    {
      field: 'machine',
      headerName: 'Machine',
      valueGetter: (params) =>
        params.row.machine ? params.row.machine.name : 'No machine',
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

  const sensors = { columns: sensorsColumns, rows: sensorsData };

  function displaySensorRow(data) {
    dispatch(clearData());
    dispatch(displaySensor(data));
    history.push('/individual-sensor');
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
          {...sensors}
          onRowClick={(props) => {
            displaySensorRow(props.row);
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
