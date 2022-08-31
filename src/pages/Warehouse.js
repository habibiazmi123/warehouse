import { useState , useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Container,
  LinearProgress,
  Link,
} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { capitalizeFirstLetter } from '../utils/formatString';
import { fDate } from "../utils/formatTime";
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const COLUMNS = [
  { 
    field: 'WarehouseID',
    headerName: 'ID',
    width: 120,
    renderCell: (params) => (
      <Link variant="subtitle1" underline='none' component={RouterLink} to={`/warehouse/${params.row.WarehouseID}`}>{params.row.WarehouseID}</Link>
    )
  },
  {
    field: 'Branch',
    headerName: 'Branch',
    width: 150,
  },
  {
    field: 'Active',
    headerName: 'Active',
    width: 100,
    valueGetter: (params) =>
      `${capitalizeFirstLetter(params.row.Active.toString())}`,
  },
  {
    field: 'Description',
    headerName: 'Desc',
    width: 200,
  },
  {
    field: 'LastSync',
    headerName: 'Last Sync',
    width: 160,
    valueGetter: (params) =>
      `${fDate(params.row.LastSync)}`,
  },
];

// ----------------------------------------------------------------------

export default function Warehouse() {

  const [isLoading, setIsLoading] = useState(false);

  const [pageSize, setPageSize] = useState(10);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("https://api.belajartableau.com/api/WarehouseReps");
        const results = await response.json();

        setRecords(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Page title="Warehouse">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Warehouse"
          links={[
            { name: 'Warehouse' }
          ]}
        />

        <Card sx={{padding: '6px',}}>
          <div style={{ height: 630, width: '100%' }}>
            <DataGrid
              getRowId={(row) => row.WarehouseID}
              rows={records}
              columns={COLUMNS}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 25, 50, 100]}
              loading={isLoading}
              components={{
                LoadingOverlay: LinearProgress,
                Toolbar: () => (
                  <GridToolbarContainer sx={{justifyContent: 'flex-end'}}>
                    <GridToolbarExport />
                  </GridToolbarContainer>
                  )
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
