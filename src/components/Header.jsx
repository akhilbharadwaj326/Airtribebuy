import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppShell as MantineHeader, Group, Button, Title, Text, Container, Badge } from '@mantine/core';

function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <MantineHeader height={60} px="xl" py="md">
      <Container size="xl">
        <Group justify="space-between">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={2}>AirtribeBuy</Title>
          </Link>
          <Group>
            <Button 
              variant="outline" 
              onClick={() => navigate('/cart')}
              rightSection={
                cartItemsCount > 0 && (
                  <Badge variant="filled" color="red">
                    {cartItemsCount}
                  </Badge>
                )
              }
            >
              My Cart
            </Button>
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
}

export default Header;