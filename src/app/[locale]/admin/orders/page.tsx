'use client';

import AdminLayout from '../AdminLayout';
import OrderTable from './OrderTable';

export default function OrdersPage() {
  return (
    <AdminLayout>
      <OrderTable />
    </AdminLayout>
  );
}