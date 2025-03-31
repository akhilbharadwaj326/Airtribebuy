import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { 
  Card, 
  Image, 
  Text, 
  Button, 
  Group, 
  Title, 
  Rating, 
  Badge, 
  NumberInput,
  Grid,
  Container,
  Divider
} from '@mantine/core';
import { fetchProductById } from '../api/api';
import { addToCart } from '../redux/cartSlice';
import Loading from '../components/Loading';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <Loading />;
  
  if (error) return <Title order={3}>Error loading product: {error.message}</Title>;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity
    }));
    
    navigate('/cart');
  };

  return (
    <Container size="xl">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Grid>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image
              src={product.image}
              height={400}
              fit="contain"
              style={{ backgroundColor: 'white', padding: '1rem' }}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Title order={2} mb="md">{product.title}</Title>
            
            <Group mb="md">
              <Badge color="blue">{product.category}</Badge>
              <Group>
                <Rating value={product.rating.rate} readOnly />
                <Text size="sm">({product.rating.count} reviews)</Text>
              </Group>
            </Group>
            
            <Title order={1} color="blue" mb="md">${product.price.toFixed(2)}</Title>
            
            <Text mb="lg">{product.description}</Text>
            
            <Divider my="md" />
            
            <Group mb="lg">
              <Text fw={500}>Quantity:</Text>
              <NumberInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
                style={{ width: '100px' }}
              />
            </Group>
            
            <Button size="lg" onClick={handleAddToCart} fullWidth>
              Add to Cart
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
}

export default ProductDetailsPage;
