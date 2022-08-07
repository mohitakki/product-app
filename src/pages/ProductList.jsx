import {Box, Button, HStack, Select, Text} from '@chakra-ui/react';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import Wrapper from '../components/Wrapper';
import {sortProducts, filterByRating} from '../redux/features/productSlice';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFilterByPrice = e => {
    dispatch(
      sortProducts({
        sortBy: e.target.value,
      }),
    );
  };
  
  const handleFilterByRating = e => {
    dispatch(
      filterByRating({
        rating: e.target.value,
      }),
    );
  };
  return (
    <Wrapper>
        <Box
          w={['95%', '90%']}
          p={4}
          mx="auto"
          my={4}
          h="auto"
          bg="white"
          shadow="lg"
          rounded="lg">
          <HStack justifyContent="space-between">
            <Button
              alignSelf="end"
              onClick={() => navigate('/add')}
              colorScheme="messenger">
              Add Product
            </Button>
            <HStack>
              <Select
                placeholder="Filter by Price"
                onChange={e => handleFilterByPrice(e)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
              <Select placeholder="Filter by Rating"  onChange={e => handleFilterByRating(e)}>
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </Select>
            </HStack>
          </HStack>
          <ProductItem />
      </Box>
    </Wrapper>
  );
};

export default ProductList;
