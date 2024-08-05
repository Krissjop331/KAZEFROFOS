'use client';

import { Container } from '@mui/material';
import AdminMenu from './AdminMenu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Container>
      <AdminMenu />
      {children}
    </Container>
  );
};

export default AdminLayout;