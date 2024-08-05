'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import styles from './Product.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://195.49.212.124:5000/products');
      const products = response.data;
      setProducts(products);

      const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
      const uniqueManufacturers = Array.from(new Set(products.map(product => product.manufacturer)));
      setCategories(uniqueCategories);
      setManufacturers(uniqueManufacturers);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://195.49.212.124:5000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedManufacturer ? product.manufacturer === selectedManufacturer : true)
    );
  });

  return (
    <Container>
      <h1 className={styles.title}>Товары</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <FormControl sx={{ ml: 2, minWidth: 120 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 2, minWidth: 120 }}>
          <InputLabel>Производитель</InputLabel>
          <Select
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value as string)}
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            {manufacturers.map(manufacturer => (
              <MenuItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/admin/products/create')}
          sx={{ ml: 2 }}
          className={styles.button}
        >
          Добавить товар
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableTitle}>Название</TableCell>
            <TableCell className={styles.tableTitle}>Категория</TableCell>
            <TableCell className={styles.tableTitle}>Производитель</TableCell>
            <TableCell className={styles.tableTitle}>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell className={styles.tableBody}>{product.name}</TableCell>
              <TableCell className={styles.tableBody}>{product.category}</TableCell>
              <TableCell className={styles.tableBody}>{product.manufacturer}</TableCell>
              <TableCell className={styles.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                  sx={{ mr: 1 }}
                >
                  Изменить
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteProduct(product.id)}
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

export default ProductTable;