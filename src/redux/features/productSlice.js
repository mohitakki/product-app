import {createSlice} from '@reduxjs/toolkit';

// create slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    // get products from local storage
    getProducts: (state, action) => {
      state.products = JSON.parse(localStorage.getItem('products'));
    },

    // add product to products
    addProduct: (state, action) => {
      const currentProducts = JSON.parse(localStorage.getItem('products'));
      if (currentProducts) {
        localStorage.setItem(
          'products',
          JSON.stringify([...currentProducts, action.payload]),
        );
      } else {
        localStorage.setItem('products', JSON.stringify([action.payload]));
      }
    },

    // delete product from products
    deleteProduct: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      state.products = data.filter(product => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },

    // update product from products
    updateProduct: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {id, name, image, price, category, description} = action.payload;
      let project = data.find(p => {
        return p.id === id;
      });
      project.name = name;
      project.price = price;
      project.description = description;
      project.image = image;
      project.category = category;
      localStorage.setItem('products', JSON.stringify(data));
    },

    // filter by ascending or descending
    sortProducts: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {sortBy} = action.payload;
      if (sortBy === 'asc') {
        state.products = data.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        state.products = data.sort((a, b) => {
          return b.price - a.price;
        });
      }
    },

    // filter by rating
    filterByRating: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {rating} = action.payload;
      if (rating === 'high') {
        state.products = data.sort((a, b) => {
          return b.rating - a.rating;
        });
      } else if (rating === 'low') {
        state.products = data.sort((a, b) => {
          return a.rating - b.rating;
        });
      }
    },

    // search by name or category
    searchByName: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {search} = action.payload;

      // find product by name or category
      state.products = data.filter(product => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });
    },

    // add to wishlist
    addToWishlist: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {id} = action.payload;
      let product = data.find(p => {
        return p.id === id;
      });
      product.addedToWishlist = true;
      localStorage.setItem('products', JSON.stringify(data));
    },

    // remove from wishlist
    removeFromWishlist: (state, action) => {
      const data = JSON.parse(localStorage.getItem('products'));
      const {id} = action.payload;
      let product = data.find(p => {
        return p.id === id;
      });
      product.addedToWishlist = false;
      localStorage.setItem('products', JSON.stringify(data));
    },
  },
});

export const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  sortProducts,
  filterByRating,
  searchByName,
  addToWishlist,
  removeFromWishlist,
} = productSlice.actions;
export default productSlice.reducer;
