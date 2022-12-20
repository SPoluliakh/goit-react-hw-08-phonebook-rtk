import { Box } from '@mui/material';
import { AppBar } from 'components/AppBar/AppBar';
import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  return (
    <>
      <Box className="container">
        <AppBar />
        <Outlet />
      </Box>
      <ToastContainer autoClose={3000} />
    </>
  );
};
