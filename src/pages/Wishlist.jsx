import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import ProductItem from '../components/ProductItem';
import Wrapper from '../components/Wrapper';
import {XyzTransitionGroup} from '@animxyz/react';
import {useDispatch, useSelector} from 'react-redux';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import RatingComp from '../components/Rating';
import {
  addToWishlist,
  getProducts,
  removeFromWishlist,
} from '../redux/features/productSlice';
import {useNavigate} from 'react-router-dom';

const Wishlist = () => {
  const {products} = useSelector(state => state.products);
  const filterByWish = products?.filter(
    product => product.addedToWishlist === true,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleAddToWish = id => {
    dispatch(
      addToWishlist({
        id,
      }),
    );
    dispatch(getProducts());
  };
  const handleRemoveFromWish = id => {
    dispatch(
      removeFromWishlist({
        id,
      }),
    );
    dispatch(getProducts());
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
          {' '}
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            w="full"
            gap={6}
            py={4}>
            {filterByWish?.length > 0 ? (
              filterByWish?.map((item, index) => (
                <GridItem w="100%" key={index} className="fade">
                  <Box
                    bg="white"
                    rounded="lg"
                    shadow="lg"
                    borderTopLeftRadius="lg"
                    position="relative"
                    borderTopRightRadius="lg">
                    <Image
                      borderTopLeftRadius="lg"
                      borderTopRightRadius="lg"
                      w="100%"
                      h="200px"
                      objectFit="cover"
                      src={item.image}
                    />
                    {item.addedToWishlist ? (
                      <Icon
                        onClick={() => handleRemoveFromWish(item.id)}
                        bg="gray.600"
                        shadow="lg"
                        p={1}
                        rounded="full"
                        position="absolute"
                        top={1}
                        right={1}
                        as={AiFillHeart}
                        cursor="pointer"
                        color="white"
                        w={8}
                        h={8}
                      />
                    ) : (
                      <Icon
                        onClick={() => handleAddToWish(item.id)}
                        bg="gray.600"
                        shadow="lg"
                        p={1}
                        rounded="full"
                        position="absolute"
                        top={1}
                        right={1}
                        as={AiOutlineHeart}
                        cursor="pointer"
                        color="white"
                        w={8}
                        h={8}
                      />
                    )}
                    <Box p={4}>
                      <HStack w="full" justifyContent="space-between">
                        <Text
                          fontWeight={600}
                          fontSize={20}
                          color="messenger.600">
                          {item.name}
                        </Text>
                        <Text bg="orange" p={1} fontSize={12} color="white">
                          {item.category}
                        </Text>
                      </HStack>
                      <Text fontSize={16} fontWeight="500" color="gray.600">
                        {item.description.slice(0, 100)}
                      </Text>

                      <Box
                        w="full"
                        display="flex"
                        my={2}
                        justifyContent="space-between"
                        alignItems="center">
                        <Text color="red" fontSize={24} fontWeight="bold">
                          ₹{item.price}
                        </Text>
                        <HStack>
                          <EditIcon
                            w={5}
                            h={5}
                            color="blue"
                            cursor="pointer"
                            //   onClick={() => handleEditProduct(item.id)}
                          />
                          <DeleteIcon
                            w={5}
                            h={5}
                            color="red"
                            cursor="pointer"
                            //   onClick={() => handleDeleteProduct(item.id)}
                          />
                        </HStack>
                      </Box>
                      <HStack justifyContent="space-between">
                        <RatingComp value={item.rating} />
                        <Button colorScheme="orange">Add to Cart</Button>
                      </HStack>
                    </Box>
                  </Box>
                </GridItem>
              ))
            ) : (

              <VStack w="80vw" mx="auto">
                <Text fontSize={24} fontWeight="bold" textAlign="center">
                  No items in wishlist
                </Text>
                <Button
                  w={['xs', 'sm']}
                  onClick={() => navigate('/')}
                  colorScheme="orange"
                  mx="auto">
                  Add Products
                </Button>
              </VStack>
            )}
          </Grid>
        </XyzTransitionGroup>
      </Box>
    </Wrapper>
  );
};

export default Wishlist;
