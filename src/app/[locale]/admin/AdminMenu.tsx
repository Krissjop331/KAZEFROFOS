'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Box, Tabs, Tab } from '@mui/material';
import styles from './Admin.module.css';

const AdminMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={pathname}
        onChange={handleChange}
        aria-label="admin tabs"
      >
        <Tab
          label="Заявки"
          value="/admin/orders"
          className={pathname === '/admin/orders' ? styles.activeTab : ''}
        />
        <Tab
          label="Товары"
          value="/admin/products"
          className={pathname === '/admin/products' ? styles.activeTab : ''}
        />
      </Tabs>
    </Box>
  );
};

export default AdminMenu;