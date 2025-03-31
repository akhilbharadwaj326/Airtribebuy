import { Center, Loader, Text } from '@mantine/core';

function Loading() {
  return (
    <Center style={{ height: '50vh', flexDirection: 'column' }}>
      <Loader size="lg" />
      <Text mt="md">Loading...</Text>
    </Center>
  );
}

export default Loading;