
import { Box, Container, Grid } from '@mui/material';
import { Budget } from './budget';
import { LatestOrders } from './latest-orders';
import { LatestProducts } from './latest-products';
import { TasksProgress } from './tasks-progress';
import { TotalCustomers } from './total-customers';
import { TotalProfit } from './total-profit';
import { DashboardLayout } from './dashboard-layout';

const Main = () => (
  <>
   
      <title>
        Dashboard | Material Kit
      </title>
   
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Main.getLayout = (main) => (
  <DashboardLayout>
    {main}
  </DashboardLayout>
);

export default Main;
