import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack,
  Divider,
  Card,
  Container
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import CartItem from '../components/CartItem';
import { clearCart } from '../redux/cartSlice';

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const handlePlaceOrder = () => {
    notifications.show({
      title: 'Success',
      message: 'Order successfully placed!',
      color: 'green',
    });
    
    
    dispatch(clearCart());
    
    // Redirect to home page
    navigate('/');
  };
  
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  if (cartItems.length === 0) {
    return (
      <Container size="md">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack align="center" spacing="md">
            <Title order={2}>Your Cart is Empty</Title>
            <Text>Add products to your cart to see them here.</Text>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Title order={1} mb="lg">My Cart</Title>
      
      <Stack spacing="md" mb="xl">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </Stack>
      
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group position="apart">
            <Text fw={500}>Subtotal:</Text>
            <Text fw={500}>${totalAmount.toFixed(2)}</Text>
          </Group>
          
          <Group position="apart">
            <Text fw={500}>Shipping:</Text>
            <Text fw={500}>Free</Text>
          </Group>
          
          <Divider my="sm" />
          
          <Group position="apart">
            <Title order={3}>Total:</Title>
            <Title order={3}>${totalAmount.toFixed(2)}</Title>
          </Group>
          
          <Button size="lg" color="green" onClick={handlePlaceOrder}>
            Buy Now
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default CartPage;