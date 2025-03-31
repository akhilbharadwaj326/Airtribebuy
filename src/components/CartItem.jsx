import { Group, Image, Text, NumberInput, ActionIcon, Paper, Stack } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (value) => {
    dispatch(updateQuantity({ id: item.id, quantity: value }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Paper p="md" withBorder>
      <Group>
        <Image 
          src={item.image} 
          width={80} 
          height={80} 
          fit="contain" 
          style={{ backgroundColor: 'white' }}
        />
        
        <Stack style={{ flex: 1 }}>
          <Text fw={700}>{item.title}</Text>
          <Text size="sm" color="dimmed">Price: ${item.price.toFixed(2)}</Text>
          <Text size="sm" color="dimmed">Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
        </Stack>
        
        <Group>
          <NumberInput
            value={item.quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
            style={{ width: '80px' }}
          />
          <ActionIcon color="red" onClick={handleRemove}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}

export default CartItem;
