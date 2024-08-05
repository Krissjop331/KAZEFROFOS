'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Select, MenuItem, FormControl } from '@mui/material';
import styles from './Order.module.css';

interface Product {
  name: string;
  category: string;
  manufacturer: string;
}

interface Order {
  id: number;
  productId: number;
  product: Product;
  date: string;
  telephone: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (): Promise<void> => {
    try {
      const response = await axios.get<Order[]>('http://195.49.212.124:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://195.49.212.124:5000/orders/${id}`);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders
    .filter(order => order.product.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return sortOrder === 'newest' ? bDate - aDate : aDate - bDate;
    });

  return (
    <Container>
      <h1 className={styles.title}>Заявки</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <FormControl style={{ marginLeft: '20px', minWidth: 180 }}>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          >
            <MenuItem value="newest">Новые заявки</MenuItem>
            <MenuItem value="oldest">Старые заявки</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableTitle}>Товар</TableCell>
            <TableCell className={styles.tableTitle}>Категория</TableCell>
            <TableCell className={styles.tableTitle}>Производитель</TableCell>
            <TableCell className={styles.tableTitle}>Дата подачи</TableCell>
            <TableCell className={styles.tableTitle}>Телефон</TableCell>
            <TableCell className={styles.tableTitle}>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell className={styles.tableBody}>{order.product.name}</TableCell>
              <TableCell className={styles.tableBody}>{order.product.category}</TableCell>
              <TableCell className={styles.tableBody}>{order.product.manufacturer}</TableCell>
              <TableCell className={styles.tableBody}>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell className={styles.tableBody}>{order.telephone}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default OrdersPage;