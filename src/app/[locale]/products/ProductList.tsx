'use client';

import { useEffect, useState } from 'react';
import { Container, TextField, Grid, Card, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Product.module.css';

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  description?: string;
  createdAt: string;
  images?: { url: string }[];
}

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(initialProducts.map(product => product.category)));
    const uniqueManufacturers = Array.from(new Set(initialProducts.map(product => product.manufacturer)));
    setCategories(uniqueCategories);
    setManufacturers(uniqueManufacturers);
  }, [initialProducts]);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedManufacturer ? product.manufacturer === selectedManufacturer : true)
    );
  });

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleManufacturerChange = (event: SelectChangeEvent<string>) => {
    setSelectedManufacturer(event.target.value);
  };

  const apiUrl = process.env.API_URL || '';

  return (
    <Container className={styles.products}>
      <div className={styles.filterContainer}>
        <TextField
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
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
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel>Производитель</InputLabel>
          <Select
            value={selectedManufacturer}
            onChange={handleManufacturerChange}
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
      </div>

      <Grid container spacing={3} className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={styles.productCard}>
                <div className={styles.imageContainer}>
                  {product.images && product.images.length > 0 && (
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={`${apiUrl}/${product.images[0].url}`}
                        alt={product.name}
                        className={styles.productImage}
                        width={500}
                        height={400}
                      />
                    </Link>
                  )}
                </div>
                <CardContent className={styles.cardContent}>
                  <div>
                    <Typography className={styles.productName}>{product.name}</Typography>
                    <Typography className={styles.productInfo}>
                      <strong>Категория:</strong> {product.category}
                    </Typography>
                    <Typography className={styles.productInfo}>
                      <strong>Производитель:</strong> {product.manufacturer}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography className={styles.noProducts}>Нет товаров</Typography>
        )}
      </Grid>
    </Container>
  );
}