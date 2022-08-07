import {Box, Button, Hide, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import Wrapper from '../components/Wrapper';
import {XyzTransitionGroup} from '@animxyz/react';
import {useDispatch, useSelector} from 'react-redux';

import {deleteCart, getCart} from '../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleDeleteCart = id => {
    dispatch(deleteCart(id));
    dispatch(getCart());
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
        <XyzTransitionGroup
          appear
          className="example-grid"
          xyz="fade small out-down out-rotate-right appear-stagger">
          {cart?.length > 0 ? (
            cart?.map((item, index) => (
              <HStack
                my={4}
                spacing={6}
                alignItems="center"
                bg="gray.100"
                justifyContent={'space-between'}
                shadow="md"
                p={2}
                rounded="md">
                <HStack spacing={4}>
                  <Text fontWeight={600}>{index + 1}.</Text>
                  <Image
                    rounded="md"
                    w={[10, 12, 16]}
                    h={[10, 12, 16]}
                    objectFit="cover"
                    src={item.image}
                  />
                  <Stack
                    flexDirection="column"
                    spacing={0}
                    justifyContent="flex-start">
                    <Text fontWeight={600} fontSize={[14, 16, 20]}>
                      {item.name}
                    </Text>
                    <Text fontWeight={400} fontSize={[10, 12, 16]}>
                      {item.description}
                    </Text>
                  </Stack>
                </HStack>
                <HStack
                  spacing={8}
                  justifyItems="center"
                  justifyContent="space-between">
                  <Hide below="sm">
                    <Text fontWeight={600}>Qty: {5}</Text>
                    <Text fontWeight={600}>Category: {item.category}</Text>
                    <Text fontWeight={600}>M.R.P ₹{item.price}</Text>
                  </Hide>
                  <Button
                    size={['xs', 'sm', 'md', 'lg']}
                    colorScheme="red"
                    onClick={() => handleDeleteCart(item.id)}>
                    Delete Item
                  </Button>
                </HStack>
              </HStack>
            ))
          ) : (
           <VStack>
             <Text fontSize={24} fontWeight="bold" textAlign="center">
              No items in cart
            </Text>
            <Button w={['xs', 'sm']} onClick={() => navigate('/')} colorScheme="orange" mx="auto">Add Products</Button>
           </VStack>
          )}
        </XyzTransitionGroup>
      </Box>
    </Wrapper>
  );
};

export default Cart;
