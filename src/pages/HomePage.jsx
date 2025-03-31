import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Title, Container, Select, Group, TextInput } from '@mantine/core';
import { fetchAllProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

function HomePage() {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      return await response.json();
    },
  });

  if (isLoading) return <Loading />;
  
  if (error) return <Title order={3}>Error loading products: {error.message}</Title>;

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryOptions = categories 
    ? [{ value: 'all', label: 'All Categories' }, 
       ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))]
    : [{ value: 'all', label: 'All Categories' }];

  return (
    <Container size="xl">
      <Title order={1} mb="lg">Our Products</Title>
      
      <Group mb="xl">
        <TextInput
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Filter by category"
          data={categoryOptions}
          value={category}
          onChange={setCategory}
          style={{ width: '200px' }}
        />
      </Group>
      
      <Grid>
        {filteredProducts.map(product => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
        {filteredProducts.length === 0 && (
          <Grid.Col span={12}>
            <Title order={3} ta="center" mt="xl">No products found</Title>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}

export default HomePage;