'use client';

import AdminLayout from '../AdminLayout';
import ProductTable from './ProductTable';

export default function ProductsPage() {
  return (
    <AdminLayout>
      <ProductTable />
    </AdminLayout>
  );
}