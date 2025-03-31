import { Card, Image, Text, Button, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.image}
          height={220}
          alt={product.title}
          fit="contain"
          style={{ padding: '1rem', backgroundColor: 'white' }}
        />
      </Card.Section>

      <Group mt="md" mb="xs">
        <Title order={4} style={{ 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%'
        }}>
          {product.title}
        </Title>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={2}>
        {product.description}
      </Text>

      <Group justify="space-between" mt="md">
        <Text fw={700} size="lg">
          ${product.price.toFixed(2)}
        </Text>
        <Button variant="filled" onClick={handleViewDetails}>
          View Details
        </Button>
      </Group>
    </Card>
  );
}

export default ProductCard;