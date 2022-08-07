import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    // get cart from local storage
    getCart: (state, action) => {
      state.cart = JSON.parse(localStorage.getItem('cart'));
    },
    // add product to cart
    addCart: (state, action) => {
      const currentCart = JSON.parse(localStorage.getItem('cart'));
      if (currentCart) {
        const duplicate = currentCart.find(
          product => product.id === action.payload.id,
        );
        if (duplicate) {
          duplicate.count += 1;
        } else {
          localStorage.setItem(
            'cart',
            JSON.stringify([...currentCart, action.payload]),
          );
        }
      } else {
        localStorage.setItem('cart', JSON.stringify([action.payload]));
      }
    },
    // delete product from cart
    deleteCart: (state, action) => {
      const data = JSON.parse(localStorage.getItem('cart'));
      state.cart = data.filter(product => product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {getCart, addCart, deleteCart} = cartSlice.actions;
export default cartSlice.reducer;
