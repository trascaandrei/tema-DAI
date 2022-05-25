import Head from 'next/head';
import {useEffect} from 'react'
import { Box, Container } from '@mui/material';
import { UsersListResults } from '../components/dashboard/users-list-results';
import { DashboardLayout } from '../components/dashboard-layout';
import Router from 'next/router';
import AdminService from '../services/admin.service';
import { useState } from 'react';

const Admin = () => {
  const user = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('user') : null);
  let [users, setUsers] = useState([]);

  AdminService.getUsers().then((res) => {
    setUsers(res)
  })

  useEffect(() => {
    if (!user) {
      Router.push('/login');
    } else if (!user.roles.includes('ROLE_ADMIN')) {
        Router.push('/');
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
          <Box sx={{ mt: 3 }}>
            <UsersListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Admin.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Admin;
