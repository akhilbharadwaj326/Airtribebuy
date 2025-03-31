import { Routes, Route } from 'react-router-dom';
import { Container } from '@mantine/core';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Header />
      <Container size="xl" py="xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;