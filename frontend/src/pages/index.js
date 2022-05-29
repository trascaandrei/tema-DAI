import Head from 'next/head';
import {useEffect, useState} from 'react'
import { Box, Container, Grid } from '@mui/material';
import { DocumentsListResults } from '../components/dashboard/documents-list-results';
import { DocumentsListToolbar } from '../components/dashboard/documents-list-toolbar';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalDocuments } from '../components/dashboard/total-documents';
import { DashboardLayout } from '../components/dashboard-layout';
import FormService from '../services/form.service'
import Router from 'next/router'

let initialized = false;

const Dashboard = () => {
  const user = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('user') : null);
  let [documents, setDocuments] = useState([])

  if (!initialized) {
    initialized = true;
    FormService.getForms().then(res => {
      setDocuments(res);
    })
  }

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  })


  
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
              <TotalDocuments documentsnumber={documents.length}/>
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
