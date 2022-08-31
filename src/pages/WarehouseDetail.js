import { useState , useEffect } from 'react';
import { sentenceCase } from 'change-case';
// material
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import {  useNavigate, useParams } from 'react-router-dom';
import { fDateTime, fToNow } from "../utils/formatTime";
// components
import Page from '../components/Page';
import Label from '../components/Label';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function WarehouseDetail() {

  const { warehouseId } = useParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`https://api.belajartableau.com/api/WarehouseReps/${warehouseId}`);
        const result = await response.json();
        
        if(result?.status) navigate('/404');

        setRecord(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    fetchData();
  }, [warehouseId, navigate]);

  return (
    <Page title="Detail Warehouse">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Warehouse"
          links={[
            { name: 'Warehouse', href: '/warehouse' },
            { name: `Detail - ${warehouseId || ''}`, href: '/warehouse' },
          ]}
        />

        <Card sx={{padding: '20px', width: 1/3, minHeight: '330px'}}>

          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '330px'}}><CircularProgress /></Box>}
          
          {!isLoading && 
            <Stack spacing={2}>

              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ typography: 'subtitle2', opacity: 0.72 }}>Warehouse ID</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} style={{ marginTop: 0}}>
                    <Typography sx={{ typography: 'h3' }}>{record?.WarehouseID}</Typography>
                  </Stack>
                </Box>

                <Box sx={{ alignItems: 'start' }}>
                  <Label
                    variant={'ghost'}
                    color={record?.Active === true ? 'success' : 'error'}
                    sx={{ textTransform: 'uppercase'}}
                  >
                    { sentenceCase(record?.Active === true ? "Active" : "Not Active")}
                  </Label>
                </Box>
              </Box>

              <Stack direction="row">
                <Typography component={'span'} variant="body2" color="#757575">
                  Branch
                  <Typography variant="subtitle1" color="#000000">{record?.Branch || '-'}</Typography>
                </Typography>
              </Stack>

              <Stack direction="row">
                <Typography component={'span'} variant="body2" color="#757575">
                  Description
                  <Typography variant="subtitle1" color="#000000">{record?.Description || '-'}</Typography>
                </Typography>
              </Stack>

              <Stack direction="row">
                <Typography component={'span'} variant="body2" color="#757575">
                  Last Sync
                  <Typography variant="subtitle1" color="#000000">{fToNow(record?.LastSync || new Date())}</Typography>
                </Typography>
              </Stack>

              <Stack direction="row">
                <Typography component={'span'} variant="body2" color="#757575">
                  Last Modified
                  <Typography variant="subtitle1" color="#000000">{fDateTime(record?.LastModifiedDateTime || new Date())}</Typography>
                </Typography>
              </Stack>

            </Stack>
          }

        </Card>
      </Container>
    </Page>
  );
}
