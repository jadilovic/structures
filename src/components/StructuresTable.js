import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridRowIdGetter,
  GridRowsProp,
} from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import qs from 'qs';
import { createBrowserHistory } from 'history';
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
  const [page, setPage] = useState(0);
  const userScreenHeight = window.innerHeight;
  const history = createBrowserHistory();

  window.onpopstate = function (event) {
    window.location.reload();
  };

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    console.log('TEST');
    dispatch(clearData());
    fetchStructures('machines');
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.page) {
      setPage(Number(filtersFromParams.page));
    }
  }, []);

  useEffect(() => {
    history.push(`?page=${page}`);
  }, [page]);

  function savePageNumber(pageNumber) {
    console.log('SAVE PAGE TEST');
    setPage(pageNumber);
  }

  const structuresData = useSelector((state) => state.main.structures);
  const loading = useSelector((state) => state.main.loading);
  const paginationPageNumber = useSelector((state) => state.main.page);

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
    console.log(window.scrollY);
    fetchStructureById(data.id, 'structure machines structures');
  }

  const handleScroll = (e) => {
    console.log();
  };

  // console.log(Number(localStorage.getItem('page-number')));
  console.log(page);

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
            window.addEventListener('scroll', handleScroll);
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
          page={page}
          onPageChange={(params) => {
            console.log(params.page);
            savePageNumber(params.page);
          }}
          pageSize={5}
        />
      </div>
    </Container>
  );
}
