export const loadCartFromLocalStorage = () => {
    try {
      const cartItems = localStorage.getItem('cartItems');
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  };
  
  export const saveCartToLocalStorage = (cartItems) => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };