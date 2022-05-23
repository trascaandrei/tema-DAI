import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DocumentsListResults } from '../components/dashboard/documents-list-results';
import { DocumentsListToolbar } from '../components/dashboard/documents-list-toolbar';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalDocuments } from '../components/dashboard/total-documents';
import { DashboardLayout } from '../components/dashboard-layout';
import { documents } from '../__mocks__/documents';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Provider } from 'react-redux'
import store from '../store';

console.log(store.getState())

const Dashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  
  return (
    <>
      <Head>
        <title>
          Dashboard | DAI
        </title>
      </Head>
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
              xl={6}
              lg={6}
              sm={6}
              xs={12}
            >
              <TotalDocuments />
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              sm={6}
              xs={12}
            >
              <TasksProgress />
            </Grid>
          </Grid>
          <DocumentsListToolbar sx={{ mt: 3 }} />
          <Box sx={{ mt: 3 }}>
            <DocumentsListResults documents={documents} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Dashboard.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Dashboard;
