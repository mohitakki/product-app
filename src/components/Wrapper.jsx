import {Box, Hide, HStack, Input, Text} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {Icon} from '@chakra-ui/react';
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, searchByName} from '../redux/features/productSlice';
import {useNavigate} from 'react-router-dom';
import {getCart} from '../redux/features/cartSlice';

const Wrapper = ({children}) => {
  const {products} = useSelector(state => state.products);
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  const wishList = products?.filter(
    product => product.addedToWishlist === true,
  );
  const handleSearch = e => {
    dispatch(
      searchByName({
        search: e.target.value,
      }),
    );
  };
  return (
    <Box w="100vw" minH="100vh" h="100%" bg="gray.100">
      <Box
        h={16}
        bg="messenger.400"
        display="flex"
        justifyContent="space-between"
        px={[4, 4, 12]}
        w="full"
        alignItems="center">
        <Hide below="lg">
          <Text
            color="white"
            cursor="pointer"
            fontSize={24}
            fontWeight="bold"
            onClick={() => navigate('/')}>
            Products
          </Text>
        </Hide>

        <HStack w={['md', 'lg']} spacing={4} alignItems="center">
          <Input
            placeholder="Search"
            color="white"
            _placeholder={{
              color: 'white',
            }}
            _focus={{
              borderColor: 'white',
            }}
            onChange={e => handleSearch(e)}
          />

          <Box
            position="relative"
            cursor="pointer"
            onClick={() => navigate('/wishlist')}>
            <Icon as={AiOutlineHeart} color="white" w={8} h={8} />

            <Box
              w={4}
              h={4}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              rounded="full"
              shadow="md"
              position="absolute"
              right={0}
              top={0}>
              <Text fontSize="xs" fontWeight={600}>
                {wishList?.length}
              </Text>
            </Box>
          </Box>

          <Box
            position="relative"
            cursor="pointer"
            onClick={() => navigate('/cart')}>
            <Icon as={AiOutlineShoppingCart} color="white" w={8} h={8} />
            <Box
              w={4}
              h={4}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              rounded="full"
              shadow="md"
              position="absolute"
              right={0}
              top={0}>
              <Text fontSize="xs" fontWeight={600}>
                {cart?.length}
              </Text>
            </Box>
          </Box>
        </HStack>
      </Box>
      {children}
    </Box>
  );
};

export default Wrapper;
